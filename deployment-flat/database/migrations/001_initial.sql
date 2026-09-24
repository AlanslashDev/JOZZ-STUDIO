-- Joozz Studio: initial MySQL 8 / MariaDB 10.5+ schema
-- Import this file into the already-created `jooz_db` database via phpMyAdmin.
SET NAMES utf8mb4;
SET time_zone = '+00:00';

CREATE TABLE IF NOT EXISTS admins (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(60) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('owner','admin') NOT NULL DEFAULT 'admin',
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS site_settings (
  setting_key VARCHAR(100) PRIMARY KEY,
  setting_value JSON NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS services (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(120) NOT NULL UNIQUE,
  number VARCHAR(10) NOT NULL,
  title VARCHAR(180) NOT NULL,
  tagline VARCHAR(255) NOT NULL DEFAULT '',
  hero_headline_top VARCHAR(180) NULL,
  hero_headline_main VARCHAR(255) NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(2048) NULL,
  image_alt VARCHAR(255) NULL,
  ideal_for TEXT NOT NULL,
  icon_name VARCHAR(80) NOT NULL,
  status ENUM('published','hidden') NOT NULL DEFAULT 'published',
  sort_order INT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX services_public_order (status, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS service_offers (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  service_id BIGINT UNSIGNED NOT NULL,
  number VARCHAR(10) NOT NULL,
  title VARCHAR(180) NOT NULL,
  description TEXT NOT NULL,
  sort_order INT UNSIGNED NOT NULL DEFAULT 0,
  CONSTRAINT fk_offer_service FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
  INDEX service_offer_order (service_id, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS service_deliverables (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  service_id BIGINT UNSIGNED NOT NULL,
  value VARCHAR(500) NOT NULL,
  sort_order INT UNSIGNED NOT NULL DEFAULT 0,
  CONSTRAINT fk_deliverable_service FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
  INDEX service_deliverable_order (service_id, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS portfolio_categories (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(120) NOT NULL UNIQUE,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  sort_order INT UNSIGNED NOT NULL DEFAULT 0,
  INDEX category_order (is_active, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS portfolio_items (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_id BIGINT UNSIGNED NOT NULL,
  slug VARCHAR(160) NOT NULL UNIQUE,
  title VARCHAR(200) NOT NULL,
  media_type ENUM('image','video') NOT NULL DEFAULT 'image',
  thumbnail_url VARCHAR(2048) NULL,
  media_url VARCHAR(2048) NULL,
  is_embed TINYINT(1) NOT NULL DEFAULT 0,
  client VARCHAR(180) NULL,
  project_year VARCHAR(20) NOT NULL,
  aspect_ratio ENUM('square','portrait','landscape','vertical') NULL,
  description TEXT NOT NULL,
  placeholder_label VARCHAR(255) NULL,
  placeholder_color VARCHAR(120) NULL,
  status ENUM('published','hidden') NOT NULL DEFAULT 'published',
  featured TINYINT(1) NOT NULL DEFAULT 0,
  sort_order INT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_portfolio_category FOREIGN KEY (category_id) REFERENCES portfolio_categories(id),
  INDEX portfolio_public_order (status, featured, sort_order),
  INDEX portfolio_category_order (category_id, status, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS portfolio_deliverables (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  portfolio_id BIGINT UNSIGNED NOT NULL,
  value VARCHAR(500) NOT NULL,
  sort_order INT UNSIGNED NOT NULL DEFAULT 0,
  CONSTRAINT fk_deliverable_portfolio FOREIGN KEY (portfolio_id) REFERENCES portfolio_items(id) ON DELETE CASCADE,
  INDEX portfolio_deliverable_order (portfolio_id, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS media (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  path VARCHAR(1024) NOT NULL UNIQUE,
  original_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  size_bytes BIGINT UNSIGNED NOT NULL,
  alt_text VARCHAR(255) NOT NULL DEFAULT '',
  created_by BIGINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_media_admin FOREIGN KEY (created_by) REFERENCES admins(id) ON DELETE SET NULL,
  INDEX media_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS enquiries (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  email VARCHAR(254) NOT NULL,
  phone VARCHAR(60) NULL,
  service VARCHAR(180) NOT NULL,
  budget VARCHAR(80) NULL,
  timeline VARCHAR(80) NULL,
  message TEXT NOT NULL,
  status ENUM('new','read','replied','archived') NOT NULL DEFAULT 'new',
  admin_notes TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX enquiry_status_date (status, created_at),
  INDEX enquiry_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS activity_log (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  admin_id BIGINT UNSIGNED NULL,
  action VARCHAR(120) NOT NULL,
  entity_type VARCHAR(80) NOT NULL,
  entity_id VARCHAR(80) NULL,
  metadata JSON NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_activity_admin FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE SET NULL,
  INDEX activity_entity (entity_type, entity_id),
  INDEX activity_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
