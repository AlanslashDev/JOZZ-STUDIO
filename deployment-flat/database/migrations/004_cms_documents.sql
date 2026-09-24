CREATE TABLE IF NOT EXISTS cms_documents (
    document_key VARCHAR(80) PRIMARY KEY,
    title VARCHAR(180) NOT NULL,
    route VARCHAR(255) NOT NULL,
    draft_content LONGTEXT NOT NULL,
    published_content LONGTEXT NOT NULL,
    status ENUM('published', 'draft') NOT NULL DEFAULT 'published',
    updated_by BIGINT UNSIGNED NULL,
    draft_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    published_at TIMESTAMP NULL DEFAULT NULL,
    CONSTRAINT fk_cms_documents_admin FOREIGN KEY (updated_by) REFERENCES admins(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cms_revisions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    document_key VARCHAR(80) NOT NULL,
    snapshot LONGTEXT NOT NULL,
    action ENUM('published', 'restored') NOT NULL DEFAULT 'published',
    created_by BIGINT UNSIGNED NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_cms_revisions_document (document_key, created_at),
    CONSTRAINT fk_cms_revisions_document FOREIGN KEY (document_key) REFERENCES cms_documents(document_key) ON DELETE CASCADE,
    CONSTRAINT fk_cms_revisions_admin FOREIGN KEY (created_by) REFERENCES admins(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
