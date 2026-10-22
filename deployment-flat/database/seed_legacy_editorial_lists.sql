-- Populate the legacy CMS Reviews and Team lists without duplicating matching records.
-- Select this database in phpMyAdmin before importing.
INSERT INTO testimonials (quote, attribution, role, company, rating, is_visible, sort_order)
SELECT seed.quote, seed.attribution, seed.role, seed.company, seed.rating, seed.is_visible, seed.sort_order
FROM (
  SELECT 'We hired Joozz Designing for our complete luxury real estate rebranding. The visual identity, letterpress stationery, and signage mockups they delivered exceeded all our expectations. Exceptional craft and delivery.' AS quote, 'Marcus Sterling' AS attribution, 'Client • Managing Director' AS role, 'Apex Architectural & Real Estate (London)' AS company, 5 AS rating, 1 AS is_visible, 0 AS sort_order
  UNION ALL SELECT 'Our publication needed high-finish editorial layouts and press-ready packaging files on a tight deadline. Joozz handled prepress checks flawlessly. The final printed magazines look world-class.', 'Elena Rostova', 'Client • Editor-in-Chief', 'Luxe Living Magazine', 5, 1, 1
  UNION ALL SELECT 'From our initial brief to final brand guidelines handover, working with Joozz was seamless. Their custom logo mark and typography system gave our tech startup an immediate edge in investor pitches.', 'David Chen', 'Client • Co-Founder & CEO', 'Kinetix Digital Labs', 5, 1, 2
  UNION ALL SELECT 'The bespoke menu engineering and gold-foil packaging designs elevated our boutique hotel brand across the UK. Their dedication to tactile paper finishes and color calibration is truly unmatched.', 'Sophia Montgomery', 'Client • Creative Partner', 'The Grand Savoy Hospitality', 5, 1, 3
  UNION ALL SELECT 'Joozz crafted our complete haute couture campaign lookbook and visual identity. The balance of negative space, bold editorial typography, and print clarity captured our aesthetic vision effortlessly.', 'Julian Vance', 'Client • Brand Director', 'Vance & Co. Luxury Apparel', 5, 1, 4
  UNION ALL SELECT 'Exceptional speed, direct senior communication, and flawless vector assets. They re-architected our corporate identity and event signage across 3 European summits with zero friction.', 'Amara Ndiaye', 'Client • Head of Global Brand', 'Novus Energy Group', 5, 1, 5
) AS seed
WHERE NOT EXISTS (
  SELECT 1 FROM testimonials existing
  WHERE existing.quote = seed.quote AND existing.attribution = seed.attribution
);

INSERT INTO team_members (name, role, image_id, bio, is_visible, sort_order)
SELECT seed.name, NULL, NULL, NULL, 1, seed.sort_order
FROM (
  SELECT 'JUSTINE' AS name, 0 AS sort_order UNION ALL
  SELECT 'LORAINE', 1 UNION ALL
  SELECT 'JAIBIN', 2 UNION ALL
  SELECT 'PRASANTH', 3 UNION ALL
  SELECT 'LAJEESH', 4
) AS seed
WHERE NOT EXISTS (
  SELECT 1 FROM team_members existing WHERE existing.name = seed.name
);