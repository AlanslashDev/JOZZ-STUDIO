<?php
declare(strict_types=1);

namespace Joozz\App;

final class ContentRepository
{
    /** @return array<string, mixed> */
    public function publicBootstrap(): array
    {
        $settings = [];
        $publicSettingKeys = [
            'studio_info', 'stats', 'creative_process', 'production_team',
            'marquee_keywords', 'testimonial', 'client_reviews',
            'home_content', 'about_content', 'contact_content',
        ];
        $placeholders = implode(',', array_fill(0, count($publicSettingKeys), '?'));
        $statement = \db()->prepare("SELECT setting_key, setting_value FROM site_settings WHERE setting_key IN ($placeholders)");
        $statement->execute($publicSettingKeys);
        foreach ($statement->fetchAll() as $row) {
            $settings[$row['setting_key']] = json_decode($row['setting_value'], true) ?? $row['setting_value'];
        }

        $services = \db()->query("SELECT id, slug, number, title, tagline, hero_headline_top, hero_headline_main, description, image_url AS image, image_alt AS imageAlt, ideal_for AS idealFor, icon_name AS iconName FROM services WHERE status = 'published' ORDER BY sort_order, id")->fetchAll();
        foreach ($services as &$service) {
            $service['deliverables'] = $this->listValues('service_deliverables', 'service_id', (int) $service['id']);
            $service['whatWeOffer'] = $this->offers((int) $service['id']);
            $service['id'] = $service['slug'];
            unset($service['slug']);
        }

        $portfolio = \db()->query("SELECT p.id, p.slug, p.title, c.name AS category, p.media_type AS type, p.thumbnail_url AS thumbnail, p.media_url AS mediaUrl, p.is_embed AS isEmbed, p.client, p.project_year AS year, p.aspect_ratio AS aspectRatio, p.description, p.placeholder_label AS placeholderLabel, p.placeholder_color AS imagePlaceholderColor FROM portfolio_items p INNER JOIN portfolio_categories c ON c.id = p.category_id WHERE p.status = 'published' ORDER BY p.featured DESC, p.sort_order, p.id")->fetchAll();
        foreach ($portfolio as &$item) {
            $item['deliverables'] = $this->listValues('portfolio_deliverables', 'portfolio_id', (int) $item['id']);
            $item['isEmbed'] = (bool) $item['isEmbed'];
            $item['id'] = $item['slug'];
        }

        $payload = [
            'settings' => $settings,
            'services' => $services,
            'portfolio' => $portfolio,
            'categories' => \db()->query("SELECT name FROM portfolio_categories WHERE is_active = 1 ORDER BY sort_order, name")->fetchAll(\PDO::FETCH_COLUMN),
            'faqs' => \db()->query("SELECT question AS q, answer AS a FROM faqs WHERE is_visible = 1 ORDER BY sort_order, id")->fetchAll(),
            'navigation' => \db()->query("SELECT location,label,url,is_visible AS visible FROM navigation_items WHERE is_visible = 1 ORDER BY location,sort_order,id")->fetchAll(),
            'seo' => [],
            'updatedAt' => gmdate(DATE_ATOM),
        ];
        foreach (\db()->query('SELECT page_key,title,meta_title AS metaTitle,meta_description AS metaDescription,is_indexable AS indexable FROM pages')->fetchAll() as $page) {
            $key = $page['page_key'];
            unset($page['page_key']);
            $page['indexable'] = (bool) $page['indexable'];
            $payload['seo'][$key] = $page;
        }

        // Published CMS documents override the legacy tables incrementally.
        // Until a document is first published, the existing database content
        // remains the source of truth, so this upgrade cannot blank the site.
        try {
            $documents = \db()->query('SELECT document_key, published_content FROM cms_documents')->fetchAll();
            $sharedCollections = [];
            foreach ($documents as $row) {
                if ($row['document_key'] !== 'global') continue;
                $globalDocument = json_decode($row['published_content'], true);
                if (is_array($globalDocument) && isset($globalDocument['collections']) && is_array($globalDocument['collections'])) $sharedCollections = $globalDocument['collections'];
            }
            foreach ($documents as $row) {
                $document = json_decode($row['published_content'], true);
                if (!is_array($document)) continue;
                switch ($row['document_key']) {
                    case 'global':
                        if (isset($document['studioInfo'])) $payload['settings']['studio_info'] = $document['studioInfo'];
                        if (isset($document['content'])) $payload['settings']['global_content'] = $document['content'];
                        if (isset($document['navigation']) && is_array($document['navigation'])) $payload['navigation'] = $document['navigation'];
                        // Shared collections have one canonical home in Global Content.
                        // Page documents may still contain legacy copies, but these are
                        // deliberately ignored once a shared collection is published.
                        if (isset($document['collections']) && is_array($document['collections'])) {
                            $collections = $document['collections'];
                            if (isset($collections['services']) && is_array($collections['services'])) $payload['services'] = $collections['services'];
                            if (isset($collections['testimonials']) && is_array($collections['testimonials'])) $payload['settings']['client_reviews'] = $collections['testimonials'];
                            if (isset($collections['faqs']) && is_array($collections['faqs'])) $payload['faqs'] = $collections['faqs'];
                            if (isset($collections['team']) && is_array($collections['team'])) $payload['settings']['production_team'] = $collections['team'];
                            if (isset($collections['stats']) && is_array($collections['stats'])) $payload['settings']['stats'] = $collections['stats'];
                            if (isset($collections['categories']) && is_array($collections['categories'])) $payload['categories'] = array_values(array_filter(array_map('strval', $collections['categories'])));
                        }
                        break;
                    case 'home':
                        if (isset($document['content'])) $payload['settings']['home_content'] = $document['content'];
                        if (!$sharedCollections && isset($document['stats'])) $payload['settings']['stats'] = $document['stats'];
                        if (!$sharedCollections && isset($document['reviews'])) $payload['settings']['client_reviews'] = $document['reviews'];
                        if (isset($document['testimonial'])) $payload['settings']['testimonial'] = $document['testimonial'];
                        if (isset($document['seo'])) $payload['seo']['home'] = $document['seo'];
                        break;
                    case 'about':
                        if (isset($document['content'])) $payload['settings']['about_content'] = $document['content'];
                        if (isset($document['studioInfo'])) $payload['settings']['studio_info'] = $document['studioInfo'];
                        if (isset($document['process'])) $payload['settings']['creative_process'] = $document['process'];
                        if (isset($document['team'])) $payload['settings']['production_team'] = $document['team'];
                        if (isset($document['seo'])) $payload['seo']['about'] = $document['seo'];
                        break;
                    case 'services':
                        if (isset($document['content'])) $payload['settings']['services_content'] = $document['content'];
                        if (isset($document['items']) && is_array($document['items'])) $payload['services'] = $document['items'];
                        if (isset($document['seo'])) $payload['seo']['services'] = $document['seo'];
                        break;
                    case 'portfolio':
                        if (isset($document['content'])) $payload['settings']['portfolio_content'] = $document['content'];
                        if (isset($document['items']) && is_array($document['items'])) $payload['portfolio'] = $document['items'];
                        if (isset($document['categories']) && is_array($document['categories'])) $payload['categories'] = $document['categories'];
                        if (isset($document['seo'])) $payload['seo']['portfolio'] = $document['seo'];
                        break;
                    case 'contact':
                        if (isset($document['content'])) $payload['settings']['contact_content'] = $document['content'];
                        if (isset($document['faqs']) && is_array($document['faqs'])) $payload['faqs'] = $document['faqs'];
                        if (isset($document['seo'])) $payload['seo']['contact'] = $document['seo'];
                        break;
                }
            }
        } catch (\PDOException) {
            // The additive CMS migration may not be installed yet. Legacy
            // published content remains fully operational in that situation.
        }

        return $payload;
    }

    /** @return list<string> */
    private function listValues(string $table, string $foreignKey, int $id): array
    {
        $statement = \db()->prepare("SELECT value FROM {$table} WHERE {$foreignKey} = :id ORDER BY sort_order, id");
        $statement->execute(['id' => $id]);
        return $statement->fetchAll(\PDO::FETCH_COLUMN);
    }

    /** @return list<array<string, mixed>> */
    private function offers(int $serviceId): array
    {
        $statement = \db()->prepare('SELECT number, title, description FROM service_offers WHERE service_id = :id ORDER BY sort_order, id');
        $statement->execute(['id' => $serviceId]);
        return $statement->fetchAll();
    }
}
