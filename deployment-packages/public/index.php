<?php
declare(strict_types=1);

use Joozz\App\Auth;
use Joozz\App\ContentRepository;
use Joozz\App\Http;

require_once __DIR__ . '/../config/bootstrap.php';
Http::securityHeaders();
Http::allowConfiguredOrigin();

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
if ($_SERVER['REQUEST_METHOD'] === 'GET' && preg_match('#^/uploads/(?:(?<section>[a-z0-9-]+)/)?(?<filename>[a-f0-9]{32}\.(?:jpg|png|webp|gif|mp4|webm))$#', $path, $mediaMatch)) {
    $relativeDirectory = !empty($mediaMatch['section']) ? $mediaMatch['section'] . '/' : '';
    $file = BASE_PATH . '/storage/uploads/' . $relativeDirectory . $mediaMatch['filename'];
    if (!is_file($file)) { http_response_code(404); exit; }
    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($file) ?: 'application/octet-stream';
    header('Content-Type: ' . $mime);
    header('Content-Length: ' . filesize($file));
    header('Content-Disposition: inline; filename="' . $mediaMatch[1] . '"');
    header('Cross-Origin-Resource-Policy: same-origin');
    header('Cache-Control: public, max-age=31536000, immutable');
    readfile($file);
    exit;
}
$apiPosition = strpos($path, '/api/v1/');
if ($apiPosition === false) {
    Http::error('Not found.', 404);
}
$route = substr($path, $apiPosition + strlen('/api/v1'));
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET' && $route === '/public/bootstrap') {
    $cacheKey = 'public-bootstrap-v1';
    $payload = cache()->get($cacheKey);
    if ($payload === null) {
        $payload = (new ContentRepository())->publicBootstrap();
        cache()->put($cacheKey, $payload);
    }
    $etag = '"' . hash('sha256', json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)) . '"';
    if (($_SERVER['HTTP_IF_NONE_MATCH'] ?? '') === $etag) {
        http_response_code(304);
        header('ETag: ' . $etag);
        header('Cache-Control: no-store, max-age=0');
        exit;
    }
    Http::ok($payload, 200, [
        'ETag' => $etag,
        'Cache-Control' => 'no-store, max-age=0',
    ]);
}

if ($method === 'POST' && $route === '/public/enquiries') {
    $body = Http::jsonBody();
    $name = trim((string) ($body['name'] ?? ''));
    $email = trim((string) ($body['email'] ?? ''));
    $message = trim((string) ($body['message'] ?? ''));
    $service = trim((string) ($body['service'] ?? ''));
    if (($body['website'] ?? '') !== '') { // Honeypot field: silently accept bots.
        Http::ok(['received' => true], 202);
    }
    $errors = [];
    if (mb_strlen($name) < 2 || mb_strlen($name) > 160) $errors['name'] = 'Enter a name between 2 and 160 characters.';
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Enter a valid email address.';
    if (mb_strlen($message) < 10 || mb_strlen($message) > 10000) $errors['message'] = 'Enter project details between 10 and 10,000 characters.';
    if ($service === '' || mb_strlen($service) > 180) $errors['service'] = 'Choose a project type.';
    if ($errors) Http::error('Please correct the highlighted fields.', 422, $errors);

    $rateKey = 'enquiry-' . hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown');
    $rate = cache()->get($rateKey) ?? ['count' => 0, 'window' => time()];
    if (($rate['window'] ?? 0) > time() - 3600 && ($rate['count'] ?? 0) >= 5) {
        Http::error('Too many enquiries from this connection. Please try again later.', 429);
    }
    cache()->put($rateKey, ['count' => ($rate['count'] ?? 0) + 1, 'window' => $rate['window'] ?? time()]);

    $statement = db()->prepare('INSERT INTO enquiries (name, email, phone, service, budget, timeline, message) VALUES (:name, :email, :phone, :service, :budget, :timeline, :message)');
    $statement->execute([
        'name' => $name,
        'email' => $email,
        'phone' => mb_substr(trim((string) ($body['phone'] ?? '')), 0, 60) ?: null,
        'service' => $service,
        'budget' => mb_substr(trim((string) ($body['budget'] ?? '')), 0, 80) ?: null,
        'timeline' => mb_substr(trim((string) ($body['timeline'] ?? '')), 0, 80) ?: null,
        'message' => $message,
    ]);
    Http::ok(['received' => true], 201);
}

if ($method === 'POST' && $route === '/admin/auth/login') {
    $body = Http::jsonBody();
    $username = trim((string) ($body['username'] ?? ''));
    $password = (string) ($body['password'] ?? '');
    $admin = Auth::login($username, $password);
    if ($admin === null) Http::error('Invalid username or password.', 401);
    Auth::startSession();
    Http::ok(['admin' => $admin, 'csrfToken' => $_SESSION['csrf']]);
}

if ($method === 'POST' && $route === '/admin/auth/logout') {
    Auth::requireAdmin();
    Auth::logout();
    Http::ok(['loggedOut' => true]);
}

if ($method === 'GET' && $route === '/admin/auth/me') {
    $admin = Auth::requireAdmin();
    Http::ok(['admin' => $admin, 'csrfToken' => $_SESSION['csrf']]);
}

if ($method === 'GET' && $route === '/admin/dashboard') {
    Auth::requireAdmin();
    $counts = [
        'newEnquiries' => (int) db()->query("SELECT COUNT(*) FROM enquiries WHERE status = 'new'")->fetchColumn(),
        'publishedServices' => (int) db()->query("SELECT COUNT(*) FROM services WHERE status = 'published'")->fetchColumn(),
        'publishedPortfolioItems' => (int) db()->query("SELECT COUNT(*) FROM portfolio_items WHERE status = 'published'")->fetchColumn(),
    ];
    Http::ok($counts);
}

if ($method === 'GET' && $route === '/admin/enquiries') {
    Auth::requireAdmin();
    $page = max(1, (int) ($_GET['page'] ?? 1));
    $perPage = min(100, max(10, (int) ($_GET['perPage'] ?? 25)));
    $status = (string) ($_GET['status'] ?? '');
    $where = $status === '' ? '' : ' WHERE status = :status';
    if ($status !== '' && !in_array($status, ['new', 'read', 'replied', 'archived'], true)) Http::error('Invalid enquiry status.', 422);
    $totalStatement = db()->prepare('SELECT COUNT(*) FROM enquiries' . $where);
    $totalStatement->execute($status === '' ? [] : ['status' => $status]);
    $statement = db()->prepare('SELECT id, name, email, phone, service, budget, timeline, message, status, admin_notes AS adminNotes, created_at AS createdAt FROM enquiries' . $where . ' ORDER BY created_at DESC LIMIT :limit OFFSET :offset');
    if ($status !== '') $statement->bindValue(':status', $status);
    $statement->bindValue(':limit', $perPage, PDO::PARAM_INT);
    $statement->bindValue(':offset', ($page - 1) * $perPage, PDO::PARAM_INT);
    $statement->execute();
    Http::ok(['items' => $statement->fetchAll(), 'pagination' => ['page' => $page, 'perPage' => $perPage, 'total' => (int) $totalStatement->fetchColumn()]]);
}

if ($method === 'PATCH' && preg_match('#^/admin/enquiries/(\d+)$#', $route, $matches)) {
    Auth::requireAdmin();
    $body = Http::jsonBody();
    $status = (string) ($body['status'] ?? '');
    if (!in_array($status, ['new', 'read', 'replied', 'archived'], true)) Http::error('Invalid enquiry status.', 422);
    $notes = mb_substr(trim((string) ($body['adminNotes'] ?? '')), 0, 10000);
    $statement = db()->prepare('UPDATE enquiries SET status = :status, admin_notes = :notes WHERE id = :id');
    $statement->execute(['status' => $status, 'notes' => $notes ?: null, 'id' => (int) $matches[1]]);
    if ($statement->rowCount() === 0) Http::error('Enquiry not found.', 404);
    Http::ok(['updated' => true]);
}

if ($method === 'GET' && $route === '/admin/settings') {
    Auth::requireAdmin();
    $rows = db()->query('SELECT setting_key, setting_value, updated_at FROM site_settings ORDER BY setting_key')->fetchAll();
    $settings = [];
    foreach ($rows as $row) $settings[$row['setting_key']] = ['value' => json_decode($row['setting_value'], true), 'updatedAt' => $row['updated_at']];
    Http::ok(['settings' => $settings]);
}

if ($method === 'PUT' && preg_match('#^/admin/settings/([a-z0-9_]{1,100})$#', $route, $matches)) {
    $admin = Auth::requireAdmin();
    if (!Auth::isOwner($admin)) Http::error('Owner permissions required.', 403);
    $body = Http::jsonBody();
    if (!array_key_exists('value', $body)) Http::error('A setting value is required.', 422);
    $statement = db()->prepare('INSERT INTO site_settings (setting_key, setting_value) VALUES (:key, :value) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)');
    $statement->execute(['key' => $matches[1], 'value' => json_encode($body['value'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR)]);
    cache()->forget('public-bootstrap-v1');
    Http::ok(['updated' => true]);
}

/* Admin CMS resources. These routes intentionally expose editorial language only;
   the browser never needs to handle table names or serialized content. */
function adminAudit(array $admin, string $action, string $type, ?string $id = null): void {
    $log = db()->prepare('INSERT INTO activity_log (admin_id, action, entity_type, entity_id) VALUES (:admin, :action, :type, :entity)');
    $log->execute(['admin' => $admin['id'], 'action' => $action, 'type' => $type, 'entity' => $id]);
}
function clearPublicContent(): void { cache()->forget('public-bootstrap-v1'); }
function editorialList(string $resource): array {
    $queries = [
        'services' => "SELECT id,title,slug,number,tagline,hero_headline_top AS heroHeadlineTop,hero_headline_main AS heroHeadlineMain,description,image_url AS image,image_alt AS imageAlt,ideal_for AS idealFor,icon_name AS iconName,status,sort_order AS sortOrder FROM services ORDER BY sort_order,id",
        'portfolio' => "SELECT p.id,p.title,p.slug,p.thumbnail_url AS thumbnail,p.media_url AS mediaUrl,p.media_type AS mediaType,p.is_embed AS isEmbed,p.client,p.project_year AS year,p.aspect_ratio AS aspectRatio,p.description,p.status,p.featured,p.sort_order AS sortOrder,c.id AS categoryId,c.name AS category FROM portfolio_items p JOIN portfolio_categories c ON c.id=p.category_id ORDER BY p.sort_order,p.id",
        'faqs' => "SELECT id,question,answer,is_visible AS visible,sort_order AS sortOrder FROM faqs ORDER BY sort_order,id",
        'team' => "SELECT id,name,role,bio,is_visible AS visible,sort_order AS sortOrder FROM team_members ORDER BY sort_order,id",
        'reviews' => "SELECT id,quote,attribution,company,rating,is_visible AS visible,sort_order AS sortOrder FROM testimonials ORDER BY sort_order,id",
        'navigation' => "SELECT id,location,label,url,is_visible AS visible,sort_order AS sortOrder FROM navigation_items ORDER BY location,sort_order,id",
        'redirects' => "SELECT id,source_path AS source,destination_path AS destination,http_status AS statusCode,is_active AS active FROM redirects ORDER BY id DESC",
        'pages' => "SELECT id,page_key AS pageKey,title,meta_title AS metaTitle,meta_description AS metaDescription,is_indexable AS indexable FROM pages ORDER BY id",
        'categories' => "SELECT id,name,slug,is_active AS active,sort_order AS sortOrder FROM portfolio_categories ORDER BY sort_order,name",
    ];
    if (!isset($queries[$resource])) Http::error('That area is not available.', 404);
    $items = db()->query($queries[$resource])->fetchAll();
    if ($resource === 'services' || $resource === 'portfolio') {
        $table = $resource === 'services' ? 'service_deliverables' : 'portfolio_deliverables';
        $foreignKey = $resource === 'services' ? 'service_id' : 'portfolio_id';
        $statement = db()->prepare("SELECT value FROM {$table} WHERE {$foreignKey}=:id ORDER BY sort_order,id");
        foreach ($items as &$item) { $statement->execute(['id'=>$item['id']]); $item['deliverables']=$statement->fetchAll(PDO::FETCH_COLUMN); }
    }
    if ($resource === 'services') {
        $statement = db()->prepare('SELECT number,title,description FROM service_offers WHERE service_id=:id ORDER BY sort_order,id');
        foreach ($items as &$item) { $statement->execute(['id'=>$item['id']]); $item['whatWeOffer']=$statement->fetchAll(); }
    }
    return $items;
}
function isSafePublicUrl(string $url): bool {
    $url = trim($url);
    if ($url === '' || preg_match('/[\x00-\x1f\x7f]/', $url)) return false;
    if (preg_match('/^\s*(?:\/\/|javascript:|vbscript:|data:|file:|blob:)/i', $url)) return false;
    if (str_starts_with($url, '/') || str_starts_with($url, '#') || str_starts_with($url, 'mailto:') || str_starts_with($url, 'tel:')) return true;
    $scheme = parse_url($url, PHP_URL_SCHEME);
    return in_array(strtolower((string) $scheme), ['http', 'https'], true);
}
function editorialSave(string $resource, array $body, ?int $id, array $admin): int {
    $text = static fn(string $key, int $limit = 10000): string => mb_substr(trim((string)($body[$key] ?? '')), 0, $limit);
    $bool = static fn(string $key): int => !empty($body[$key]) ? 1 : 0;
    if ($resource === 'services') {
        $title=$text('title',180); if ($title==='') Http::error('Please enter a service title.',422);
        $slug=$text('slug',120) ?: strtolower(trim(preg_replace('/[^a-z0-9]+/i','-',$title),'-'));
        if (!preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $slug)) Http::error('Use a simple lowercase service URL.',422);
        $data=['slug'=>$slug,'number'=>$text('number',10) ?: '01','title'=>$title,'tagline'=>$text('tagline',255),'top'=>$text('heroHeadlineTop',180)?:null,'main'=>$text('heroHeadlineMain',255)?:null,'description'=>$text('description'),'image'=>$text('image',2048) ?: null,'alt'=>$text('imageAlt',255) ?: null,'ideal'=>$text('idealFor'),'icon'=>$text('iconName',80) ?: 'sparkles','status'=>($body['status']??'published')==='hidden'?'hidden':'published','order'=>(int)($body['sortOrder']??0)];
        $sql='slug=:slug,number=:number,title=:title,tagline=:tagline,hero_headline_top=:top,hero_headline_main=:main,description=:description,image_url=:image,image_alt=:alt,ideal_for=:ideal,icon_name=:icon,status=:status,sort_order=:order';
        if($id){$data['id']=$id;db()->prepare("UPDATE services SET $sql WHERE id=:id")->execute($data);}else{db()->prepare("INSERT INTO services SET $sql")->execute($data);$id=(int)db()->lastInsertId();}
        $values=is_array($body['deliverables']??null)?$body['deliverables']:preg_split('/\R/',(string)($body['deliverables']??''));db()->prepare('DELETE FROM service_deliverables WHERE service_id=:id')->execute(['id'=>$id]);$insert=db()->prepare('INSERT INTO service_deliverables(service_id,value,sort_order) VALUES(:id,:value,:position)');foreach(array_values(array_filter(array_map('trim',$values))) as $position=>$value)$insert->execute(['id'=>$id,'value'=>mb_substr($value,0,500),'position'=>$position]);
        if (array_key_exists('offers', $body)) { $offers=is_array($body['offers'])?$body['offers']:preg_split('/\R/',(string)$body['offers']);db()->prepare('DELETE FROM service_offers WHERE service_id=:id')->execute(['id'=>$id]);$insert=db()->prepare('INSERT INTO service_offers(service_id,number,title,description,sort_order) VALUES(:id,:number,:title,:description,:position)');foreach(array_values(array_filter(array_map('trim',$offers))) as $position=>$offer){[$offerTitle,$offerDescription]=array_pad(array_map('trim',explode('|',$offer,2)),2,'');if($offerTitle==='')continue;$insert->execute(['id'=>$id,'number'=>str_pad((string)($position+1),2,'0',STR_PAD_LEFT),'title'=>mb_substr($offerTitle,0,180),'description'=>mb_substr($offerDescription,0,10000),'position'=>$position]);} }
    } elseif ($resource === 'portfolio') {
        $title=$text('title',200); if($title==='') Http::error('Please enter a project title.',422);
        $category=(int)($body['categoryId']??0);
        if (!$category) { db()->exec("INSERT IGNORE INTO portfolio_categories (name,slug,is_active,sort_order) VALUES ('General','general',1,0)"); $category=(int)db()->query("SELECT id FROM portfolio_categories WHERE slug='general'")->fetchColumn(); }
        $slug=$text('slug',160) ?: strtolower(trim(preg_replace('/[^a-z0-9]+/i','-',$title),'-'));
        $data=['category'=>$category,'slug'=>$slug,'title'=>$title,'type'=>($body['mediaType']??'image')==='video'?'video':'image','thumb'=>$text('thumbnail',2048)?:null,'media'=>$text('mediaUrl',2048)?:null,'embed'=>$bool('isEmbed'),'client'=>$text('client',180)?:null,'year'=>$text('year',20) ?: date('Y'),'description'=>$text('description'),'status'=>($body['status']??'published')==='hidden'?'hidden':'published','featured'=>$bool('featured'),'order'=>(int)($body['sortOrder']??0)];
        $sql='category_id=:category,slug=:slug,title=:title,media_type=:type,thumbnail_url=:thumb,media_url=:media,is_embed=:embed,client=:client,project_year=:year,description=:description,status=:status,featured=:featured,sort_order=:order';
        if($id){$data['id']=$id;db()->prepare("UPDATE portfolio_items SET $sql WHERE id=:id")->execute($data);}else{db()->prepare("INSERT INTO portfolio_items SET $sql")->execute($data);$id=(int)db()->lastInsertId();}
        $values=is_array($body['deliverables']??null)?$body['deliverables']:preg_split('/\R/',(string)($body['deliverables']??''));db()->prepare('DELETE FROM portfolio_deliverables WHERE portfolio_id=:id')->execute(['id'=>$id]);$insert=db()->prepare('INSERT INTO portfolio_deliverables(portfolio_id,value,sort_order) VALUES(:id,:value,:position)');foreach(array_values(array_filter(array_map('trim',$values))) as $position=>$value)$insert->execute(['id'=>$id,'value'=>mb_substr($value,0,500),'position'=>$position]);
    } elseif ($resource === 'faqs') {
        $q=$text('question',500);$a=$text('answer');if($q===''||$a==='')Http::error('Please add both a question and an answer.',422);$d=['q'=>$q,'a'=>$a,'v'=>$bool('visible'),'o'=>(int)($body['sortOrder']??0)];$sql='question=:q,answer=:a,is_visible=:v,sort_order=:o';if($id){$d['id']=$id;db()->prepare("UPDATE faqs SET $sql WHERE id=:id")->execute($d);}else{db()->prepare("INSERT INTO faqs SET $sql")->execute($d);$id=(int)db()->lastInsertId();}
    } elseif ($resource === 'categories') {
        $name=$text('name',100);if($name==='')Http::error('Please enter a category name.',422);$d=['n'=>$name,'s'=>$text('slug',120)?:strtolower(trim(preg_replace('/[^a-z0-9]+/i','-',$name),'-')),'a'=>$bool('active'),'o'=>(int)($body['sortOrder']??0)];$sql='name=:n,slug=:s,is_active=:a,sort_order=:o';if($id){$d['id']=$id;db()->prepare("UPDATE portfolio_categories SET $sql WHERE id=:id")->execute($d);}else{db()->prepare("INSERT INTO portfolio_categories SET $sql")->execute($d);$id=(int)db()->lastInsertId();}
    } elseif ($resource === 'redirects') {
        $source=$text('source',500);$dest=$text('destination',500);if(!str_starts_with($source,'/')||!str_starts_with($dest,'/')||str_contains($source,'//'))Http::error('Use website paths beginning with a single /.',422);$d=['s'=>$source,'d'=>$dest,'c'=>(int)($body['statusCode']??301),'a'=>$bool('active')];if(!in_array($d['c'],[301,302],true))Http::error('Choose a valid redirect type.',422);$sql='source_path=:s,destination_path=:d,http_status=:c,is_active=:a';if($id){$d['id']=$id;db()->prepare("UPDATE redirects SET $sql WHERE id=:id")->execute($d);}else{db()->prepare("INSERT INTO redirects SET $sql")->execute($d);$id=(int)db()->lastInsertId();}
    } elseif ($resource === 'navigation') {
        $label=$text('label',100);$url=$text('url',500);$location=$text('location',30);if($label===''||$url==='')Http::error('Enter a menu label and link.',422);if(!isSafePublicUrl($url))Http::error('Enter a safe website link.',422);if(!in_array($location,['header','footer_studio','footer_disciplines'],true))Http::error('Choose a valid menu area.',422);$d=['l'=>$location,'n'=>$label,'u'=>$url,'v'=>$bool('visible'),'o'=>(int)($body['sortOrder']??0)];$sql='location=:l,label=:n,url=:u,is_visible=:v,sort_order=:o';if($id){$d['id']=$id;db()->prepare("UPDATE navigation_items SET $sql WHERE id=:id")->execute($d);}else{db()->prepare("INSERT INTO navigation_items SET $sql")->execute($d);$id=(int)db()->lastInsertId();}
    } elseif ($resource === 'pages') {
        if(!$id)Http::error('Choose a page to update.',422);$title=$text('title',180);if($title==='')Http::error('Enter a page name.',422);$d=['title'=>$title,'meta'=>$text('metaTitle',180)?:null,'description'=>$text('metaDescription',320)?:null,'indexable'=>$bool('indexable'),'id'=>$id];db()->prepare('UPDATE pages SET title=:title,meta_title=:meta,meta_description=:description,is_indexable=:indexable WHERE id=:id')->execute($d);
    } else { Http::error('This editor is not available yet.',404); }
    adminAudit($admin, $id ? 'saved' : 'created', $resource, (string)$id); clearPublicContent(); return $id;
}

/** @return array<string, array{title:string,route:string,description:string}> */
function cmsDefinitions(): array {
    return [
        'home'=>['title'=>'Home Page','route'=>'/','description'=>'Hero, featured work, trust points, statistics, reviews and calls to action.'],
        'about'=>['title'=>'About Page','route'=>'/about','description'=>'Studio story, principles, tools, process, locations and production team.'],
        'services'=>['title'=>'Services','route'=>'/services','description'=>'Services page introduction, service cards and service-detail content.'],
        'portfolio'=>['title'=>'Portfolio','route'=>'/portfolio','description'=>'Portfolio introduction, filters and project gallery.'],
        'contact'=>['title'=>'Contact Page','route'=>'/contact','description'=>'Contact introduction, enquiry form language, response promise and FAQs.'],
        'global'=>['title'=>'Header & Footer','route'=>'/','description'=>'Site identity, navigation, contact details, social links and footer content.'],
    ];
}

function cmsPageSeo(string $key): array {
    if ($key === 'global') return [];
    $statement=db()->prepare('SELECT title,meta_title AS metaTitle,meta_description AS metaDescription,is_indexable AS indexable FROM pages WHERE page_key=:key LIMIT 1');
    $statement->execute(['key'=>$key]);
    return $statement->fetch() ?: [];
}

function cmsCurrentSnapshot(string $key): array {
    $payload=(new ContentRepository())->publicBootstrap();
    $settings=$payload['settings']??[];
    $snapshot=match($key){
        'home'=>['content'=>$settings['home_content']??[],'stats'=>$settings['stats']??[],'reviews'=>$settings['client_reviews']??[],'testimonial'=>$settings['testimonial']??[]],
        'about'=>['content'=>$settings['about_content']??[],'process'=>$settings['creative_process']??[],'team'=>$settings['production_team']??[]],
        'services'=>['content'=>$settings['services_content']??[],'items'=>$payload['services']??[]],
        'portfolio'=>['content'=>$settings['portfolio_content']??[],'items'=>$payload['portfolio']??[],'categories'=>$payload['categories']??[]],
        'contact'=>['content'=>$settings['contact_content']??[],'faqs'=>$payload['faqs']??[]],
        'global'=>[
            'studioInfo'=>$settings['studio_info']??[],
            'content'=>$settings['global_content']??[],
            'navigation'=>$payload['navigation']??[],
            'collections'=>[
                'services'=>$payload['services']??[],
                'testimonials'=>$settings['client_reviews']??[],
                'faqs'=>$payload['faqs']??[],
                'team'=>$settings['production_team']??[],
                'stats'=>$settings['stats']??[],
                'categories'=>$payload['categories']??[],
            ],
        ],
        default=>[],
    };
    if($key!=='global')$snapshot['seo']=cmsPageSeo($key);
    return $snapshot;
}

function ensureCmsDocument(string $key): array {
    $definition=cmsDefinitions()[$key]??null;
    if(!$definition)Http::error('That website page is not available.',404);
    $statement=db()->prepare('SELECT * FROM cms_documents WHERE document_key=:key LIMIT 1');
    $statement->execute(['key'=>$key]);
    $document=$statement->fetch();
    if($document)return $document;
    $snapshot=json_encode(cmsCurrentSnapshot($key),JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR);
    $insert=db()->prepare('INSERT INTO cms_documents(document_key,title,route,draft_content,published_content,status,published_at) VALUES(:key,:title,:route,:draft,:published,\'published\',NOW())');
    $insert->execute(['key'=>$key,'title'=>$definition['title'],'route'=>$definition['route'],'draft'=>$snapshot,'published'=>$snapshot]);
    $statement->execute(['key'=>$key]);
    return $statement->fetch();
}

function validateCmsContent(mixed $value, string $path='content', int $depth=0): void {
    if($depth>12)Http::error('This content is nested too deeply.',422);
    if(is_string($value)){
        if(strlen($value)>200000)Http::error('One of the content fields is too long.',422,['field'=>$path]);
        if(str_contains($value,"\0"))Http::error('Content contains an invalid character.',422,['field'=>$path]);
        if(preg_match('/[\x00-\x1f\x7f]/',$value))Http::error('Content contains an invalid character.',422,['field'=>$path]);
        if(preg_match('/^\s*(?:(?:javascript|vbscript|data|file|blob)\s*:|\/\/)/i',$value))Http::error('Unsafe links are not allowed.',422,['field'=>$path]);
        return;
    }
    if(is_array($value))foreach($value as $key=>$item)validateCmsContent($item,$path.'.'.$key,$depth+1);
    elseif(!is_null($value)&&!is_bool($value)&&!is_int($value)&&!is_float($value))Http::error('Content contains an unsupported value.',422,['field'=>$path]);
}

if ($method==='GET' && $route==='/admin/cms/documents') {
    Auth::requireAdmin();
    $rows=[];try{$rows=db()->query('SELECT document_key,status,draft_updated_at,published_at FROM cms_documents')->fetchAll();}catch(PDOException){}
    $status=[];foreach($rows as $row)$status[$row['document_key']]=$row;
    $items=[];foreach(cmsDefinitions() as $key=>$definition)$items[]=['key'=>$key,...$definition,'status'=>$status[$key]['status']??'published','draftUpdatedAt'=>$status[$key]['draft_updated_at']??null,'publishedAt'=>$status[$key]['published_at']??null];
    Http::ok(['items'=>$items]);
}
if ($method==='GET' && preg_match('#^/admin/cms/documents/([a-z0-9_-]+)$#',$route,$m)) {
    Auth::requireAdmin();$row=ensureCmsDocument($m[1]);
    $revisions=db()->prepare('SELECT r.id,r.action,r.created_at AS createdAt,a.username AS author FROM cms_revisions r LEFT JOIN admins a ON a.id=r.created_by WHERE r.document_key=:key ORDER BY r.id DESC LIMIT 20');$revisions->execute(['key'=>$m[1]]);
    Http::ok(['key'=>$m[1],'title'=>$row['title'],'route'=>$row['route'],'status'=>$row['status'],'draft'=>json_decode($row['draft_content'],true)??[],'published'=>json_decode($row['published_content'],true)??[],'draftUpdatedAt'=>$row['draft_updated_at'],'publishedAt'=>$row['published_at'],'revisions'=>$revisions->fetchAll()]);
}
if ($method==='PUT' && preg_match('#^/admin/cms/documents/([a-z0-9_-]+)/draft$#',$route,$m)) {
    $admin=Auth::requireAdmin();ensureCmsDocument($m[1]);$body=Http::jsonBody();$content=$body['content']??null;if(!is_array($content))Http::error('Page content is required.',422);validateCmsContent($content);
    $json=json_encode($content,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR);$statement=db()->prepare("UPDATE cms_documents SET draft_content=:content,status='draft',updated_by=:admin WHERE document_key=:key");$statement->execute(['content'=>$json,'admin'=>$admin['id'],'key'=>$m[1]]);adminAudit($admin,'draft_saved','cms_document',$m[1]);Http::ok(['saved'=>true,'savedAt'=>gmdate(DATE_ATOM)]);
}
if ($method==='POST' && preg_match('#^/admin/cms/documents/([a-z0-9_-]+)/publish$#',$route,$m)) {
    $admin=Auth::requireAdmin();$row=ensureCmsDocument($m[1]);db()->beginTransaction();try{$revision=db()->prepare("INSERT INTO cms_revisions(document_key,snapshot,action,created_by) VALUES(:key,:snapshot,'published',:admin)");$revision->execute(['key'=>$m[1],'snapshot'=>$row['published_content'],'admin'=>$admin['id']]);$statement=db()->prepare("UPDATE cms_documents SET published_content=draft_content,status='published',published_at=NOW(),updated_by=:admin WHERE document_key=:key");$statement->execute(['admin'=>$admin['id'],'key'=>$m[1]]);db()->commit();}catch(Throwable $error){db()->rollBack();throw $error;}clearPublicContent();adminAudit($admin,'published','cms_document',$m[1]);Http::ok(['published'=>true,'publishedAt'=>gmdate(DATE_ATOM)]);
}
if ($method==='POST' && preg_match('#^/admin/cms/documents/([a-z0-9_-]+)/revisions/(\d+)/restore$#',$route,$m)) {
    $admin=Auth::requireAdmin();ensureCmsDocument($m[1]);$revision=db()->prepare('SELECT snapshot FROM cms_revisions WHERE id=:id AND document_key=:key LIMIT 1');$revision->execute(['id'=>(int)$m[2],'key'=>$m[1]]);$snapshot=$revision->fetchColumn();if(!is_string($snapshot))Http::error('Revision not found.',404);$statement=db()->prepare("UPDATE cms_documents SET draft_content=:snapshot,status='draft',updated_by=:admin WHERE document_key=:key");$statement->execute(['snapshot'=>$snapshot,'admin'=>$admin['id'],'key'=>$m[1]]);adminAudit($admin,'restored','cms_document',$m[1]);Http::ok(['restored'=>true,'draft'=>json_decode($snapshot,true)??[]]);
}

if ($method === 'GET' && preg_match('#^/admin/content/(services|portfolio|faqs|team|reviews|navigation|redirects|pages|categories)$#',$route,$m)) { Auth::requireAdmin(); Http::ok(['items'=>editorialList($m[1])]); }
if (($method === 'POST' || $method === 'PUT') && preg_match('#^/admin/content/(services|portfolio|faqs|categories|redirects|navigation|pages)(?:/(\d+))?$#',$route,$m)) { $admin=Auth::requireAdmin(); if($method==='PUT'&&!isset($m[2]))Http::error('Choose an item to update.',422); $id=isset($m[2])?(int)$m[2]:null; Http::ok(['id'=>editorialSave($m[1],Http::jsonBody(),$id,$admin)],$id?200:201); }
if ($method === 'DELETE' && preg_match('#^/admin/content/(services|portfolio|faqs|categories|redirects|navigation)/(\d+)$#',$route,$m)) { $admin=Auth::requireAdmin(); Auth::requireOwner($admin); $tables=['services'=>'services','portfolio'=>'portfolio_items','faqs'=>'faqs','categories'=>'portfolio_categories','redirects'=>'redirects','navigation'=>'navigation_items'];$s=db()->prepare('DELETE FROM '.$tables[$m[1]].' WHERE id=:id');$s->execute(['id'=>(int)$m[2]]);if(!$s->rowCount())Http::error('Item not found.',404);adminAudit($admin,'deleted',$m[1],$m[2]);clearPublicContent();Http::ok(['deleted'=>true]); }
if ($method === 'POST' && $route === '/admin/media') { $admin=Auth::requireAdmin(); if(empty($_FILES['file'])||$_FILES['file']['error']!==UPLOAD_ERR_OK)Http::error('Choose a file to upload.',422);$f=$_FILES['file'];$maxUpload=max(1,(int)(env_value('UPLOAD_MAX_BYTES','26214400')??'26214400'));if($f['size']>$maxUpload)Http::error('The selected file is too large.',422);$mime=(new finfo(FILEINFO_MIME_TYPE))->file($f['tmp_name']);$allowed=['image/jpeg','image/png','image/webp','image/gif','video/mp4','video/webm'];if(!in_array($mime,$allowed,true))Http::error('Upload a JPG, PNG, WebP, GIF, MP4, or WebM file.',422);$ext=['image/jpeg'=>'jpg','image/png'=>'png','image/webp'=>'webp','image/gif'=>'gif','video/mp4'=>'mp4','video/webm'=>'webm'][$mime];$name=bin2hex(random_bytes(16)).'.'.$ext;$requestedSection=strtolower(trim((string)($_POST['section']??'general')));$section=preg_replace('/[^a-z0-9-]+/','-', $requestedSection) ?: 'general';$section=trim($section,'-');if($section===''||strlen($section)>40)$section='general';$dir=BASE_PATH.'/storage/uploads/'.$section;if(!is_dir($dir)&&!mkdir($dir,0775,true)&&!is_dir($dir))Http::error('Upload folder could not be created.',500);if(!move_uploaded_file($f['tmp_name'],$dir.'/'.$name))Http::error('Upload could not be stored.',500);$path='/uploads/'.$section.'/'.$name;$s=db()->prepare('INSERT INTO media(path,original_name,mime_type,size_bytes,alt_text,created_by) VALUES(:p,:n,:m,:z,:a,:u)');$s->execute(['p'=>$path,'n'=>mb_substr(basename((string)$f['name']),0,255),'m'=>$mime,'z'=>$f['size'],'a'=>mb_substr(trim((string)($_POST['altText']??'')),0,255),'u'=>$admin['id']]);$mediaId=(int)db()->lastInsertId();adminAudit($admin,'uploaded','media',(string)$mediaId);Http::ok(['id'=>$mediaId,'url'=>$path],201); }
if ($method === 'GET' && $route === '/admin/media') {
    Auth::requireAdmin();
    $query=mb_substr(trim((string)($_GET['q']??'')),0,100);
    if($query!==''){$statement=db()->prepare('SELECT id,path AS url,original_name AS name,mime_type AS type,size_bytes AS size,alt_text AS altText,created_at AS createdAt FROM media WHERE original_name LIKE :query OR alt_text LIKE :query ORDER BY id DESC LIMIT 250');$statement->execute(['query'=>'%'.$query.'%']);$items=$statement->fetchAll();}
    else{$items=db()->query('SELECT id,path AS url,original_name AS name,mime_type AS type,size_bytes AS size,alt_text AS altText,created_at AS createdAt FROM media ORDER BY id DESC LIMIT 250')->fetchAll();}
    Http::ok(['items'=>$items]);
}
if ($method === 'PATCH' && preg_match('#^/admin/media/(\d+)$#',$route,$m)) {
    $admin=Auth::requireAdmin();$body=Http::jsonBody();$alt=mb_substr(trim((string)($body['altText']??'')),0,255);$statement=db()->prepare('UPDATE media SET alt_text=:alt WHERE id=:id');$statement->execute(['alt'=>$alt,'id'=>(int)$m[1]]);if(!$statement->rowCount()){ $check=db()->prepare('SELECT id FROM media WHERE id=:id');$check->execute(['id'=>(int)$m[1]]);if(!$check->fetchColumn())Http::error('Media item not found.',404); }adminAudit($admin,'updated','media',$m[1]);Http::ok(['updated'=>true]);
}
if ($method === 'DELETE' && preg_match('#^/admin/media/(\d+)$#',$route,$m)) {
    $admin=Auth::requireAdmin();Auth::requireOwner($admin);$statement=db()->prepare('SELECT path FROM media WHERE id=:id LIMIT 1');$statement->execute(['id'=>(int)$m[1]]);$path=$statement->fetchColumn();if(!is_string($path))Http::error('Media item not found.',404);
    $needle='%'.addcslashes($path,'%_\\').'%';$references=0;
    foreach(['SELECT COUNT(*) FROM cms_documents WHERE draft_content LIKE :path OR published_content LIKE :path','SELECT COUNT(*) FROM site_settings WHERE setting_value LIKE :path','SELECT COUNT(*) FROM services WHERE image_url LIKE :path','SELECT COUNT(*) FROM portfolio_items WHERE thumbnail_url LIKE :path OR media_url LIKE :path','SELECT COUNT(*) FROM team_members WHERE image_url LIKE :path','SELECT COUNT(*) FROM testimonials WHERE avatar_url LIKE :path'] as $sql){try{$check=db()->prepare($sql);$check->execute(['path'=>$needle]);$references+=(int)$check->fetchColumn();}catch(PDOException){}}
    if($references>0)Http::error('This file is currently used by website content. Replace it there before deleting it.',409);
    db()->prepare('DELETE FROM media WHERE id=:id')->execute(['id'=>(int)$m[1]]);$relativePath=ltrim((string)parse_url($path,PHP_URL_PATH),'/');if(str_starts_with($relativePath,'uploads/')){$diskPath=BASE_PATH.'/storage/'.$relativePath;if(is_file($diskPath))unlink($diskPath);}adminAudit($admin,'deleted','media',$m[1]);Http::ok(['deleted'=>true]);
}
if ($method === 'GET' && $route === '/admin/enquiries/export') { Auth::requireAdmin(); header('Content-Type: text/csv; charset=utf-8');header('Content-Disposition: attachment; filename="joozz-enquiries.csv"');$safeCsv=static function(mixed $value):string{$value=(string)$value;return preg_match('/^[\x00-\x20]*[=+\-@]/u',$value)?"'".$value:$value;};$o=fopen('php://output','w');fputcsv($o,['Name','Email','Phone','Service','Status','Received']);foreach(db()->query('SELECT name,email,phone,service,status,created_at FROM enquiries ORDER BY created_at DESC') as $r)fputcsv($o,array_map($safeCsv,$r));fclose($o);exit; }

Http::error('Not found.', 404);
