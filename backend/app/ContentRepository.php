<?php
declare(strict_types=1);

namespace Joozz\App;

final class ContentRepository
{
    /** @return array<string, mixed> */
    public function publicBootstrap(): array
    {
        $settings = [];
        foreach (\db()->query('SELECT setting_key, setting_value FROM site_settings')->fetchAll() as $row) {
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

        return [
            'settings' => $settings,
            'services' => $services,
            'portfolio' => $portfolio,
            'categories' => \db()->query("SELECT name FROM portfolio_categories WHERE is_active = 1 ORDER BY sort_order, name")->fetchAll(\PDO::FETCH_COLUMN),
            'faqs' => \db()->query("SELECT question AS q, answer AS a FROM faqs WHERE is_visible = 1 ORDER BY sort_order, id")->fetchAll(),
            'navigation' => \db()->query("SELECT location,label,url,is_visible AS visible FROM navigation_items WHERE is_visible = 1 ORDER BY location,sort_order,id")->fetchAll(),
            'updatedAt' => gmdate(DATE_ATOM),
        ];
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
