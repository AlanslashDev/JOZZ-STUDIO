-- Additional CMS modules. Import after 001_initial.sql.
SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS pages (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  page_key VARCHAR(80) NOT NULL UNIQUE,
  title VARCHAR(180) NOT NULL,
  meta_title VARCHAR(180) NULL,
  meta_description VARCHAR(320) NULL,
  social_image_id BIGINT UNSIGNED NULL,
  is_indexable TINYINT(1) NOT NULL DEFAULT 1,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_page_social_image FOREIGN KEY (social_image_id) REFERENCES media(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS page_sections (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  page_id BIGINT UNSIGNED NOT NULL,
  section_key VARCHAR(100) NOT NULL,
  content JSON NOT NULL,
  is_visible TINYINT(1) NOT NULL DEFAULT 1,
  sort_order INT UNSIGNED NOT NULL DEFAULT 0,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_section_page FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE,
  UNIQUE KEY page_section_key (page_id, section_key),
  INDEX page_section_order (page_id, is_visible, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS team_members (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  role VARCHAR(160) NULL,
  image_id BIGINT UNSIGNED NULL,
  bio TEXT NULL,
  is_visible TINYINT(1) NOT NULL DEFAULT 1,
  sort_order INT UNSIGNED NOT NULL DEFAULT 0,
  CONSTRAINT fk_team_image FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE SET NULL,
  INDEX team_public_order (is_visible, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS testimonials (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  quote TEXT NOT NULL,
  attribution VARCHAR(160) NOT NULL,
  role VARCHAR(180) NULL,
  company VARCHAR(180) NULL,
  rating TINYINT UNSIGNED NULL,
  avatar_id BIGINT UNSIGNED NULL,
  is_visible TINYINT(1) NOT NULL DEFAULT 1,
  sort_order INT UNSIGNED NOT NULL DEFAULT 0,
  CONSTRAINT fk_testimonial_avatar FOREIGN KEY (avatar_id) REFERENCES media(id) ON DELETE SET NULL,
  INDEX testimonial_public_order (is_visible, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS faqs (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  question VARCHAR(500) NOT NULL,
  answer TEXT NOT NULL,
  is_visible TINYINT(1) NOT NULL DEFAULT 1,
  sort_order INT UNSIGNED NOT NULL DEFAULT 0,
  UNIQUE KEY faq_question (question(191)),
  INDEX faq_public_order (is_visible, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS navigation_items (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  location ENUM('header','footer_studio','footer_disciplines') NOT NULL,
  label VARCHAR(100) NOT NULL,
  url VARCHAR(500) NOT NULL,
  is_visible TINYINT(1) NOT NULL DEFAULT 1,
  sort_order INT UNSIGNED NOT NULL DEFAULT 0,
  INDEX navigation_order (location, is_visible, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS redirects (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  source_path VARCHAR(500) NOT NULL UNIQUE,
  destination_path VARCHAR(500) NOT NULL,
  http_status SMALLINT UNSIGNED NOT NULL DEFAULT 301,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK (http_status IN (301, 302)),
  INDEX redirect_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO pages (page_key, title) VALUES
 ('home','Home'),('about','About'),('services','Services'),('portfolio','Portfolio'),('contact','Contact')
ON DUPLICATE KEY UPDATE title=VALUES(title);
