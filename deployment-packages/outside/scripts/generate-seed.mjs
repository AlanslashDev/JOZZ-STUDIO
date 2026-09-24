import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const sourcePath = new URL('../../src/data/content.ts', import.meta.url);
const outputPath = new URL('../database/migrations/003_seed_existing_content.sql', import.meta.url);
const source = fs.readFileSync(sourcePath, 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const sandbox = { exports: {}, module: { exports: {} } };
sandbox.module.exports = sandbox.exports;
vm.runInNewContext(compiled, sandbox, { filename: 'content.js' });
const data = sandbox.exports;

const quote = (value) => `'${String(value ?? '').replaceAll('\\', '\\\\').replaceAll("'", "''")}'`;
const json = (value) => quote(JSON.stringify(value));
const statements = [
  '-- Generated from src/data/content.ts. Re-run: node backend/scripts/generate-seed.mjs',
  '-- Safe to import repeatedly; existing editorial records are updated by stable keys.',
  'SET NAMES utf8mb4;',
  'START TRANSACTION;',
];

const settings = {
  studio_info: data.STUDIO_INFO,
  stats: data.STATS,
  creative_process: data.CREATIVE_PROCESS,
  production_team: data.PRODUCTION_TEAM,
  marquee_keywords: data.MARQUEE_KEYWORDS,
  testimonial: data.TESTIMONIAL,
  client_reviews: data.CLIENT_REVIEWS,
  home_content: data.HOME_CONTENT,
  about_content: data.ABOUT_CONTENT,
  contact_content: data.CONTACT_CONTENT,
};
for (const [key, value] of Object.entries(settings)) {
  statements.push(`INSERT INTO site_settings (setting_key, setting_value) VALUES (${quote(key)}, ${json(value)}) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value);`);
}

for (const [index, service] of data.CORE_SERVICES.entries()) {
  statements.push(`INSERT INTO services (slug,number,title,tagline,hero_headline_top,hero_headline_main,description,image_url,image_alt,ideal_for,icon_name,status,sort_order) VALUES (${quote(service.id)},${quote(service.number)},${quote(service.title)},${quote(service.tagline)},${quote(service.heroHeadlineTop)},${quote(service.heroHeadlineMain)},${quote(service.description)},${quote(service.image)},${quote(service.imageAlt)},${quote(service.idealFor)},${quote(service.iconName)},'published',${index}) ON DUPLICATE KEY UPDATE number=VALUES(number),title=VALUES(title),tagline=VALUES(tagline),hero_headline_top=VALUES(hero_headline_top),hero_headline_main=VALUES(hero_headline_main),description=VALUES(description),image_url=VALUES(image_url),image_alt=VALUES(image_alt),ideal_for=VALUES(ideal_for),icon_name=VALUES(icon_name),sort_order=VALUES(sort_order);`);
  statements.push(`SET @service_id=(SELECT id FROM services WHERE slug=${quote(service.id)});`);
  statements.push('DELETE FROM service_deliverables WHERE service_id=@service_id;');
  service.deliverables.forEach((value, order) => statements.push(`INSERT INTO service_deliverables (service_id,value,sort_order) VALUES (@service_id,${quote(value)},${order});`));
  statements.push('DELETE FROM service_offers WHERE service_id=@service_id;');
  (service.whatWeOffer || []).forEach((offer, order) => statements.push(`INSERT INTO service_offers (service_id,number,title,description,sort_order) VALUES (@service_id,${quote(offer.number)},${quote(offer.title)},${quote(offer.description)},${order});`));
}

const categories = [...new Set(data.PORTFOLIO_ITEMS.map((item) => item.category))];
const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
categories.forEach((name, order) => statements.push(`INSERT INTO portfolio_categories (name,slug,is_active,sort_order) VALUES (${quote(name)},${quote(slugify(name))},1,${order}) ON DUPLICATE KEY UPDATE name=VALUES(name),is_active=1,sort_order=VALUES(sort_order);`));
for (const [index, item] of data.PORTFOLIO_ITEMS.entries()) {
  const mediaType = item.type === 'video' ? 'video' : 'image';
  statements.push(`SET @category_id=(SELECT id FROM portfolio_categories WHERE slug=${quote(slugify(item.category))});`);
  statements.push(`INSERT INTO portfolio_items (category_id,slug,title,media_type,thumbnail_url,media_url,is_embed,client,project_year,aspect_ratio,description,placeholder_label,placeholder_color,status,featured,sort_order) VALUES (@category_id,${quote(item.id)},${quote(item.title)},${quote(mediaType)},${quote(item.thumbnail || item.imageUrl)},${quote(item.mediaUrl || item.imageUrl)},${item.isEmbed ? 1 : 0},${quote(item.client)},${quote(item.year)},${quote(item.aspectRatio || 'landscape')},${quote(item.description)},${quote(item.placeholderLabel)},${quote(item.imagePlaceholderColor)},'published',${index < 6 ? 1 : 0},${index}) ON DUPLICATE KEY UPDATE category_id=VALUES(category_id),title=VALUES(title),media_type=VALUES(media_type),thumbnail_url=VALUES(thumbnail_url),media_url=VALUES(media_url),is_embed=VALUES(is_embed),client=VALUES(client),project_year=VALUES(project_year),aspect_ratio=VALUES(aspect_ratio),description=VALUES(description),placeholder_label=VALUES(placeholder_label),placeholder_color=VALUES(placeholder_color),featured=VALUES(featured),sort_order=VALUES(sort_order);`);
  statements.push(`SET @portfolio_id=(SELECT id FROM portfolio_items WHERE slug=${quote(item.id)});`);
  statements.push('DELETE FROM portfolio_deliverables WHERE portfolio_id=@portfolio_id;');
  item.deliverables.forEach((value, order) => statements.push(`INSERT INTO portfolio_deliverables (portfolio_id,value,sort_order) VALUES (@portfolio_id,${quote(value)},${order});`));
}
for (const [index, faq] of data.FAQS.entries()) {
  statements.push(`INSERT INTO faqs (question,answer,is_visible,sort_order) SELECT ${quote(faq.q)},${quote(faq.a)},1,${index} WHERE NOT EXISTS (SELECT 1 FROM faqs WHERE question=${quote(faq.q)});`);
}
for (const [index, item] of data.NAVIGATION_ITEMS.entries()) {
  statements.push(`INSERT INTO navigation_items (location,label,url,is_visible,sort_order) SELECT ${quote(item.location)},${quote(item.label)},${quote(item.url)},1,${index} WHERE NOT EXISTS (SELECT 1 FROM navigation_items WHERE location=${quote(item.location)} AND label=${quote(item.label)});`);
}
statements.push('COMMIT;', '');
fs.writeFileSync(outputPath, statements.join('\n'), 'utf8');
console.log(`Generated ${outputPath.pathname}`);
