import { ServiceItem, StatItem, PortfolioItem, TestimonialItem, ProcessStep, StudioInfo, TeamMember } from '../types';

/**
 * JOOZZ DESIGNING — SITE CONTENT & DATA STORE
 * Single source of truth for all site copy, services, portfolio, and contact details.
 */

export const STUDIO_INFO: StudioInfo = {
  brandName: "Joozz Designing",
  tagline: "Where creativity meets purpose.",
  founder: "Prince Srileenj Lopez",
  experience: "14+ Years",
  founderBio:
    "Joozz Designing is a creative graphic design studio dedicated to building strong and memorable visual identities. With over 14 years of professional experience, we specialise in logo design, branding, and high-quality print and digital design solutions.\n\nWe create thoughtful, original designs that help businesses stand out and communicate their message clearly. Our services include logo design, brand identity, magazines, brochures, business cards, posters, and other marketing materials—crafted with creativity, precision, and attention to detail.\n\nAt Joozz Designing, we believe great design is more than just visuals; it's about telling your story, connecting with your audience, and leaving a lasting impression.",
  email: "joozzdesigning@gmail.com",
  phoneUK: "+44 7777 794577",
  phoneIndia: "+91 90202 01034",
  registeredOffice: "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom",
  locationUK: "Chelmsford, Essex, United Kingdom",
  locationIndia: "Kerala / India Hub",
  socials: {
    instagram: "https://instagram.com/#",
    linkedin: "https://linkedin.com/in/#",
    behance: "https://behance.net/#",
    dribbble: "https://dribbble.com/#",
  }
};

export const PRODUCTION_TEAM: TeamMember[] = [
  {
    name: "JUSTINE",
    image: "/media/team/team-justine.jpg",
  },
  {
    name: "LORAINE",
    image: "/media/team/team-loraine.jpg",
  },
  {
    name: "JAIBIN",
    image: "/media/team/team-jaibin.jpg",
  },
  {
    name: "PRASANTH",
    image: "/media/team/team-prasanth.jpg",
  },
  {
    name: "LAJEESH",
    image: "/media/team/team-lajeesh.jpg",
  }
];

export const MARQUEE_KEYWORDS: string[] = [
  "LOGO DESIGN",
  "BRAND IDENTITY",
  "BROCHURE DESIGN",
  "POSTER DESIGN",
  "BUSINESS CARDS",
  "MAGAZINE LAYOUT",
  "PRINT MEDIA",
  "FASHION PHOTOGRAPHY"
];

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: "corporate-design",
    number: "01",
    title: "Corporate Design Solutions",
    heroHeadlineTop: "BUSINESS & ENTERPRISE",
    heroHeadlineMain: "CORPORATE DESIGN SOLUTIONS",
    tagline: "Professional designs for businesses & organisations",
    description:
      "Comprehensive corporate branding materials, internal communication designs, event branding, signage, menus, price lists, and promotional display systems.",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Corporate business architecture, identity systems, and workspace documentation",
    deliverables: [
      "Corporate Branding Materials & Identity",
      "Internal Communication Designs & Documents",
      "Event Branding, Signage & Backdrops",
      "Menus, Price Lists & Promotional Displays"
    ],
    whatWeOffer: [
      {
        number: "01",
        title: "Corporate Branding Materials",
        description: "Executive presentation decks, annual reports, company profiles, and authoritative letterhead systems."
      },
      {
        number: "02",
        title: "Internal Communication",
        description: "Staff handbooks, training guidelines, operational documents, and corporate newsletters crafted for clarity."
      },
      {
        number: "03",
        title: "Event Branding & Signage",
        description: "Conference backdrops, exhibition banners, registration booths, and high-impact stage branding."
      },
      {
        number: "04",
        title: "Menus & Price Lists",
        description: "Elegant, tactile dining menus, salon price boards, and luxury catalog layout systems."
      },
      {
        number: "05",
        title: "Promotional Display Systems",
        description: "Point-of-sale displays, pop-up trade show banners, acrylic standees, and retail architectural graphics."
      },
      {
        number: "06",
        title: "Brand Asset Maintenance",
        description: "Long-term template libraries and vector asset stewardship for consistent organizational communication."
      }
    ],
    idealFor: "Corporations, SMEs, event organizers, hospitality, and growing organizations.",
    iconName: "FileText"
  },
  {
    id: "logo-brand-identity",
    number: "02",
    title: "Logo Design & Brand Identity",
    heroHeadlineTop: "MEMORABLE & ICONIC",
    heroHeadlineMain: "LOGO DESIGN & BRAND IDENTITY",
    tagline: "Unique & memorable marks representing your brand's essence",
    description:
      "Custom logo concepts in minimal, modern, or classic styles. Full brand identity development, color palette & typography selection, brand guidelines for consistent usage, and complete logo redesign & brand refresh.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Precision vector logo sketches and brand identity systems",
    deliverables: [
      "Custom Logo Concepts (Minimal, Modern, or Classic)",
      "Brand Identity Development & Asset Kits",
      "Colour Palette & Typography Selection",
      "Brand Guidelines for Consistent Usage",
      "Logo Redesign & Brand Refresh"
    ],
    whatWeOffer: [
      {
        number: "01",
        title: "Custom Logo Concepts",
        description: "Distinctive vector marks drafted with mathematical grid balance in minimal, modern, or classic aesthetics."
      },
      {
        number: "02",
        title: "Brand Identity Development",
        description: "Full visual ecosystem architecture defining primary, secondary, and badge variations for versatile deployment."
      },
      {
        number: "03",
        title: "Colour & Typography Selection",
        description: "Curated harmonic color palettes (CMYK, RGB, Pantone, HEX) paired with bespoke typographic hierarchy."
      },
      {
        number: "04",
        title: "Brand Guidelines Manual",
        description: "Comprehensive style guide detailing clear-space, improper usage, grid alignments, and brand voice rules."
      },
      {
        number: "05",
        title: "Logo Redesign & Refresh",
        description: "Modernizing outdated trademarks while preserving established brand equity and market heritage."
      },
      {
        number: "06",
        title: "Master Vector Asset Kit",
        description: "High-resolution production formats (.AI, .EPS, .SVG, .PDF, .PNG) ready for billboards down to favicons."
      }
    ],
    idealFor: "Startups, established companies, and businesses looking for a complete visual makeover.",
    iconName: "PenTool"
  },
  {
    id: "branding-marketing",
    number: "03",
    title: "Branding & Marketing Design",
    heroHeadlineTop: "HIGH IMPACT & ENGAGING",
    heroHeadlineMain: "BRANDING & MARKETING DESIGN",
    tagline: "Visual assets that strengthen your brand presence",
    description:
      "Company profiles & brand presentations, marketing campaigns & promotional creatives, advertising design for both print & digital, and compelling visual storytelling for brand communication.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Marketing strategy, brand campaign collateral, and visual presentations",
    deliverables: [
      "Company Profiles & Brand Presentations",
      "Marketing Campaigns & Promotional Creatives",
      "Advertising Design (Print & Digital)",
      "Visual Storytelling for Brand Communication"
    ],
    whatWeOffer: [
      {
        number: "01",
        title: "Company Profiles & Decks",
        description: "High-conversion pitch decks, investment brochures, and corporate portfolios designed to close deals."
      },
      {
        number: "02",
        title: "Marketing Campaigns",
        description: "End-to-end promotional visuals across seasonal rollouts, product launches, and retail promotions."
      },
      {
        number: "03",
        title: "Print & Digital Advertising",
        description: "Newspaper ads, billboard placements, magazine spreads, and digital display ad creatives."
      },
      {
        number: "04",
        title: "Visual Storytelling",
        description: "Infographics, iconography suites, and narrative visual devices that simplify complex value propositions."
      },
      {
        number: "05",
        title: "Promotional Merchandising",
        description: "Branded collateral, packaging inserts, apparel concepts, and corporate gifting aesthetics."
      },
      {
        number: "06",
        title: "Multi-Channel Continuity",
        description: "Unified look-and-feel executed across out-of-home advertising, web touchpoints, and print flyers."
      }
    ],
    idealFor: "Brands executing high-impact marketing, investor pitches, and multi-channel advertising.",
    iconName: "Palette"
  },
  {
    id: "print-design",
    number: "04",
    title: "Print Design",
    heroHeadlineTop: "TACTILE & PRESS READY",
    heroHeadlineMain: "PRINT DESIGN MASTERY",
    tagline: "High-quality print designs created with attention to detail",
    description:
      "Business cards & corporate stationery, brochures, flyers & leaflets, posters, banners & roll-ups, magazine & catalogue design, and premium packaging & label design.",
    image: "/media/portfolio/print-design.jpg",
    imageAlt: "Open editorial print magazine and catalogue layout design",
    deliverables: [
      "Business Cards & Corporate Stationery",
      "Brochures, Flyers & Leaflets",
      "Posters, Banners & Roll-Ups",
      "Magazine & Catalogue Design",
      "Packaging & Label Design"
    ],
    whatWeOffer: [
      {
        number: "01",
        title: "Stationery & Business Cards",
        description: "Luxury cotton cards, hot foil stamping, debossing dielines, letterheads, and bespoke envelopes."
      },
      {
        number: "02",
        title: "Brochures & Flyers",
        description: "Tri-fold, bi-fold, gatefold, and z-fold corporate brochures designed with strict Swiss grid precision."
      },
      {
        number: "03",
        title: "Posters & Large Format",
        description: "Exhibition posters, outdoor roll-up banners, window vinyls, and architectural hoardings."
      },
      {
        number: "04",
        title: "Magazines & Catalogues",
        description: "Multi-page publication layouts, master baseline grids, editorial rhythm, and press imposition."
      },
      {
        number: "05",
        title: "Packaging & Labels",
        description: "Product box dielines, bottle labels, hangtags, and packaging sleeves with spot UV and foil finishing."
      },
      {
        number: "06",
        title: "Prepress Calibration",
        description: "Direct technical liaison with commercial print houses guaranteeing zero bleed or color shift errors."
      }
    ],
    idealFor: "Publishers, retail brands, FMCG packaging, corporate events, and direct marketing.",
    iconName: "Printer"
  },
  {
    id: "digital-social-media",
    number: "05",
    title: "Digital & Social Media Design",
    heroHeadlineTop: "MODERN & HIGH CONVERTING",
    heroHeadlineMain: "DIGITAL & SOCIAL MEDIA DESIGN",
    tagline: "Creative digital designs optimised for online platforms",
    description:
      "Social media posts & ad creatives, web banners & digital advertisements, presentation & pitch deck design, and high-converting email marketing visuals.",
    image: "/media/portfolio/digital-social-media.jpg",
    imageAlt: "Instagram, Facebook, Messenger, and social media digital marketing visuals",
    deliverables: [
      "Social Media Posts & Ad Creatives",
      "Web Banners & Digital Advertisements",
      "Presentation & Pitch Deck Design",
      "Email Marketing Visuals"
    ],
    whatWeOffer: [
      {
        number: "01",
        title: "Social Media Posts & Creatives",
        description: "Scroll-stopping Instagram carousels, feed posts, story graphics, and LinkedIn thought leadership plates."
      },
      {
        number: "02",
        title: "Web Banners & Digital Ads",
        description: "Google Display ads, Meta paid campaign assets, website hero banners, and promotional sliders."
      },
      {
        number: "03",
        title: "Pitch Decks & Presentations",
        description: "Custom PowerPoint, Keynote, and Figma pitch decks engineered for investor meetings and webinars."
      },
      {
        number: "04",
        title: "Email Marketing Visuals",
        description: "Branded newsletter headers, promotional product banners, and seasonal email marketing graphics."
      },
      {
        number: "05",
        title: "Social Brand Templates",
        description: "Editable Canva/Photoshop template systems empowering your internal team to publish on-brand content."
      },
      {
        number: "06",
        title: "Motion & Animated Banners",
        description: "Subtle GIF and micro-animated assets to boost click-through rates and campaign visibility."
      }
    ],
    idealFor: "Digital-first brands, eCommerce stores, influencers, agencies, and online campaigns.",
    iconName: "Layers"
  }
];

export const STATS: StatItem[] = [
  {
    number: "01",
    value: "14+",
    label: "Years Design Craft",
    description: "Over 14 continuous years delivering bespoke branding, print media, and digital design excellence.",
    isConfirmed: true
  },
  {
    number: "02",
    value: "300+",
    label: "Brand Projects",
    description: "Marks, corporate identities, and editorial publications delivered to founders worldwide.",
    isConfirmed: true
  },
  {
    number: "03",
    value: "100%",
    label: "Press-Ready Guarantee",
    description: "Zero printer rejection rate with strict CMYK separations, bleeds, and vector master standards.",
    isConfirmed: true
  },
  {
    number: "04",
    value: "7",
    label: "Design Disciplines",
    description: "From custom trademarks to 64-page magazine layouts and editorial fashion photography.",
    isConfirmed: true
  }
];

export const CREATIVE_PROCESS: ProcessStep[] = [
  {
    number: "01",
    title: "Discover & Align",
    description:
      "We unpack your business goals, target demographic, competitive landscape, and aesthetic aspirations through a focused creative brief.",
    deliverables: ["Creative Brief", "Aesthetic Moodboard", "Project Milestones"]
  },
  {
    number: "02",
    title: "Concept & Exploration",
    description:
      "Our studio explores distinct creative directions, drafting custom vector marks, typographic lockups, and preliminary layouts.",
    deliverables: ["2–3 Distinct Creative Routes", "Contextual Mockups", "Presentation Deck"]
  },
  {
    number: "03",
    title: "Refine & Polish",
    description:
      "Collaborative feedback cycles to fine-tune letterforms, kerning, color systems, and grid alignment until every millimeter is resolved.",
    deliverables: ["Fine-tuned Master Direction", "Revisions & Adjustments", "Color Calibration"]
  },
  {
    number: "04",
    title: "Deliver & Deploy",
    description:
      "Exporting comprehensive brand kits, press-ready high-resolution print files, and guidelines ready for immediate deployment.",
    deliverables: ["Full Asset Archive (AI, EPS, PDF, SVG, PNG)", "Brand Style Sheet", "Prepress File Handover"]
  }
];

export const TESTIMONIAL: TestimonialItem = {
  quote:
    "Great design is never an accident. It is the deliberate convergence of relentless precision, timeless typography, and unwavering purpose.",
  attribution: "Joozz Designing",
  role: "Studio Philosophy",
  noteForClient: ""
};

export const CLIENT_REVIEWS: TestimonialItem[] = [
  {
    quote: "We hired Joozz Designing for our complete luxury real estate rebranding. The visual identity, letterpress stationery, and signage mockups they delivered exceeded all our expectations. Exceptional craft and delivery.",
    attribution: "Marcus Sterling",
    role: "Client • Managing Director",
    company: "Apex Architectural & Real Estate (London)",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "Our publication needed high-finish editorial layouts and press-ready packaging files on a tight deadline. Joozz handled prepress checks flawlessly. The final printed magazines look world-class.",
    attribution: "Elena Rostova",
    role: "Client • Editor-in-Chief",
    company: "Luxe Living Magazine",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "From our initial brief to final brand guidelines handover, working with Joozz was seamless. Their custom logo mark and typography system gave our tech startup an immediate edge in investor pitches.",
    attribution: "David Chen",
    role: "Client • Co-Founder & CEO",
    company: "Kinetix Digital Labs",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "The bespoke menu engineering and gold-foil packaging designs elevated our boutique hotel brand across the UK. Their dedication to tactile paper finishes and color calibration is truly unmatched.",
    attribution: "Sophia Montgomery",
    role: "Client • Creative Partner",
    company: "The Grand Savoy Hospitality",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "Joozz crafted our complete haute couture campaign lookbook and visual identity. The balance of negative space, bold editorial typography, and print clarity captured our aesthetic vision effortlessly.",
    attribution: "Julian Vance",
    role: "Client • Brand Director",
    company: "Vance & Co. Luxury Apparel",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "Exceptional speed, direct senior communication, and flawless vector assets. They re-architected our corporate identity and event signage across 3 European summits with zero friction.",
    attribution: "Amara Ndiaye",
    role: "Client • Head of Global Brand",
    company: "Novus Energy Group",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "p1",
    title: "Architectural Identity & Wordmark",
    category: "Logo Design",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    mediaUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    client: "Apex Architecture Studio",
    year: "2024",
    aspectRatio: "portrait",
    description: "Minimalist geometric emblem and custom typography engineered for an elite architectural studio.",
    deliverables: ["Vector Master Marks", "Monochrome Variants", "Sub-brand System"],
    placeholderLabel: "Minimalist Architectural Wordmark & Identity",
    imagePlaceholderColor: "from-zinc-900 to-stone-900",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "r1",
    title: "Kinetic Brand Identity Motion Showcase",
    category: "Reels / Motion",
    type: "video",
    // TODO(client): provide compressed .mp4 (H.264, under ~20MB) or embed link for Kinetic Brand Identity Motion Showcase
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80",
    mediaUrl: "/media/home/5092427-hd_1920_1080_30fps - Trim.mp4",
    isEmbed: false,
    client: "Joozz Motion Lab",
    year: "2024",
    aspectRatio: "landscape",
    description: "Dynamic typographic and brand logo animation exploring modern pacing, vector distortions, and cinematic audio sync.",
    deliverables: ["1080p Master Reel", "Social 9:16 Cut", "Audio Sync & Sound Design"],
    placeholderLabel: "Kinetic Typography & Brand Motion",
    imagePlaceholderColor: "from-amber-950/40 to-zinc-900",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "p2",
    title: "Artisan Coffee Roasters Brand System",
    category: "Branding",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
    mediaUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
    client: "Vanguard Coffee Roasters",
    year: "2024",
    aspectRatio: "landscape",
    description: "Comprehensive visual identity including packaging labels, custom stamp icons, and warm ochre color system.",
    deliverables: ["Brand Guidelines", "Coffee Bag Packaging", "Menu Collateral"],
    placeholderLabel: "Artisan Coffee Packaging & Identity System",
    imagePlaceholderColor: "from-amber-950/40 to-stone-900",
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "r2",
    title: "Editorial Fashion Lookbook Reel",
    category: "Reels / Motion",
    type: "video",
    // TODO(client): provide compressed .mp4 (H.264, under ~20MB) or embed link for Editorial Fashion Lookbook Reel
    thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
    mediaUrl: "/media/home/7598770-hd_1920_1080_30fps - Trim-compressed.mp4",
    isEmbed: false,
    client: "Maison Lopez Runway",
    year: "2024",
    aspectRatio: "vertical",
    description: "High-energy vertical reel showcasing campaign art direction, typography supers, and editorial transitions.",
    deliverables: ["9:16 Instagram Reel", "4K Campaign Master", "Story Highlight Cuts"],
    placeholderLabel: "Vertical Runway Editorial Motion",
    imagePlaceholderColor: "from-zinc-900 to-stone-900",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "p3",
    title: "Biennale Exhibition Large Poster Series",
    category: "Brochures & Posters",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80",
    mediaUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80",
    client: "London Design Biennale",
    year: "2023",
    aspectRatio: "portrait",
    description: "Typographic exhibition posters utilizing high-contrast Swiss grid systems and metallic ink separations.",
    deliverables: ["A1 Poster Series", "Digital Social Teasers", "Exhibition Program"],
    placeholderLabel: "High-Contrast Typographic Exhibition Poster",
    imagePlaceholderColor: "from-zinc-900 to-neutral-900",
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "p4",
    title: "Executive Foil-Stamped Business Cards",
    category: "Business Cards",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80",
    mediaUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80",
    client: "Shelton Chambers",
    year: "2024",
    aspectRatio: "square",
    description: "Tactile cotton paper cards featuring copper foil debossing and matte painted edges.",
    deliverables: ["600gsm Cotton Stock Spec", "Copper Foil Die Setup", "Digital QR Integration"],
    placeholderLabel: "Luxury Copper Foil Debossed Stationery",
    imagePlaceholderColor: "from-stone-900 to-zinc-950",
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "p5",
    title: "Editorial Lookbook & Quarterly Journal",
    category: "Magazine Layout",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80",
    mediaUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80",
    client: "Covent Review",
    year: "2023",
    aspectRatio: "landscape",
    description: "64-page luxury editorial publication featuring bespoke serif typography, wide margins, and curated imagery.",
    deliverables: ["Complete 64-page Layout", "Master Grid Templates", "Press-ready PDF with Bleeds"],
    placeholderLabel: "Editorial Magazine Spread & Swiss Grid Layout",
    imagePlaceholderColor: "from-zinc-900 to-neutral-900",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "p6",
    title: "Haute Couture Editorial Campaign",
    category: "Photography",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
    mediaUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
    client: "Maison Lopez",
    year: "2024",
    aspectRatio: "portrait",
    description: "Cinematic studio lighting and high-fashion portraiture with rich tonal color grading.",
    deliverables: ["Campaign Lookbook Art Direction", "High-res Master Retouching", "Print Collateral Formats"],
    placeholderLabel: "Editorial Fashion Portraiture & Lighting",
    imagePlaceholderColor: "from-stone-900 to-zinc-900",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "p7",
    title: "Boutique Heritage Typography System",
    category: "Branding",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
    mediaUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
    client: "St. Clair Heritage Hotel",
    year: "2023",
    aspectRatio: "square",
    description: "Bespoke typographic treatment and monogram lockups for a luxury heritage hospitality venue.",
    deliverables: ["Custom Monogram", "Hotel Stationery Suite", "Signage Specifications"],
    placeholderLabel: "Heritage Monogram & Luxury Signage Suite",
    imagePlaceholderColor: "from-amber-950/30 to-zinc-900",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "p8",
    title: "Press-Ready Luxury Product Packaging",
    category: "Brochures & Posters",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80",
    mediaUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80",
    client: "Aura Botanical Skincare",
    year: "2024",
    aspectRatio: "landscape",
    description: "Multi-panel folding brochure and rigid box sleeve with spot UV varnish and custom die-cut contour.",
    deliverables: ["Die-cut Vector Templates", "Spot UV Layer Files", "3D Packaging Proofs"],
    placeholderLabel: "Luxury Packaging Box & Die-Cut Brochure",
    imagePlaceholderColor: "from-zinc-900 to-stone-950",
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80"
  }
];

export const FAQS = [
  { q: 'What is the typical turnaround time for a project?', a: 'Initial conceptual exploration (2–3 distinct routes) is presented within 48 to 72 hours for brand marks and logo design. Full brand universe packages and multi-page editorial publications typically take 2 to 3 weeks with dedicated feedback milestones.' },
  { q: 'What deliverables and file formats are provided upon completion?', a: 'You receive a complete master archive including scalable vector files (.AI, .EPS, .SVG, .PDF), transparent web formats (.PNG, .WebP), and press-ready CMYK PDFs with crop marks, bleeds, and Pantone spot specifications.' },
  { q: 'Do you work with international clients outside the United Kingdom?', a: 'Yes! While based primarily in Chelmsford and London, United Kingdom, our studio maintains a dedicated international line and collaborates with founders and creative directors globally across Europe, North America, and Asia.' },
  { q: 'Can you liaise directly with my commercial print shop?', a: 'Absolutely. We regularly coordinate directly with commercial printers to verify paper stocks, spot UV / foil debossing die-lines, and press proofs to guarantee zero production surprises.' }
];

export const NAVIGATION_ITEMS = [
  { location: 'header', label: 'Home', url: '/', visible: true },
  { location: 'header', label: 'About', url: '/about', visible: true },
  { location: 'header', label: 'Services', url: '/services', visible: true },
  { location: 'header', label: 'Portfolio', url: '/portfolio', visible: true },
  { location: 'header', label: 'Contact', url: '/contact', visible: true },
  { location: 'footer_studio', label: 'Home', url: '/', visible: true },
  { location: 'footer_studio', label: 'About Us', url: '/about', visible: true },
  { location: 'footer_studio', label: 'Services', url: '/services', visible: true },
  { location: 'footer_studio', label: 'Portfolio', url: '/portfolio', visible: true },
  { location: 'footer_studio', label: 'Contact', url: '/contact', visible: true },
  { location: 'footer_disciplines', label: 'Logo Design', url: '/services', visible: true },
  { location: 'footer_disciplines', label: 'Brand Identity', url: '/services', visible: true },
  { location: 'footer_disciplines', label: 'Brochure & Print', url: '/services', visible: true },
  { location: 'footer_disciplines', label: 'Business Cards', url: '/services', visible: true },
  { location: 'footer_disciplines', label: 'Fashion Photography', url: '/services', visible: true }
];

export const PORTFOLIO_CATEGORIES: string[] = ['Logo Design', 'Branding', 'Brochures & Posters', 'Business Cards', 'Magazine Layout', 'Photography', 'Reels / Motion'];

export const HOME_CONTENT = {
  heroEyebrow: 'Joozz Designing Studio',
  heroHeading: 'WE DESIGN\nWITH PURPOSE\n& PRECISION.',
  heroSubheading: 'Boutique graphic design studio crafting distinctive brand identities, editorial layouts, and press-ready print media.',
  ctaText: 'VIEW WORK',
  ctaLink: '/portfolio',
  secondaryCtaText: 'START A PROJECT',
  secondaryCtaLink: '/contact',
  heroTags: ['Brand Identity', 'Brochure Design', 'Business Cards', 'Magazine Layout', 'Print Media', 'Reels / Motion'],
  featuredVideo: '/media/home/5092427-hd_1920_1080_30fps - Trim.mp4',
  featuredVideoPoster: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80',
  featuredEyebrow: 'Kinetic Showcase',
  featuredHeading: 'Our Work in Motion.',
  featuredDescription: 'From dynamic logo reveals to high-energy editorial lookbooks—bringing brand stories to life with cinematic pacing and precision.',
  featuredCtaText: 'See Full Portfolio',
  featuredCtaLink: '/portfolio?filter=reel',
  whyEyebrow: '02 Why Choose Us',
  whyHeading: 'Why choose Joozz Designing?',
  whyDescription: '14+ years of professional design experience with a creative, reliable, and client-focused approach. We deliver high-quality designs with quick turnaround tailored to your business goals.',
  whyPoints: [
    { number: '01', title: '14+ Years Experience', description: 'Over a decade of mastering typography, branding systems, and prepress standards across global industries.' },
    { number: '02', title: 'Client-Centric Craft', description: 'Direct collaboration with the principal designer from discovery to delivery without layers of middle management.' },
    { number: '03', title: 'Quick Turnaround', description: 'Fast, dependable production cycles tailored to tight marketing launches and commercial print deadlines.' },
    { number: '04', title: 'Press-Ready Precision', description: 'Zero printer rejections. Flawless CMYK spot color separations, bleed precision, and infinite-resolution vectors.' },
  ],
  servicesEyebrow: '03 Core Disciplines',
  servicesHeading: 'End-to-end design & press production.',
  servicesCtaText: 'All services',
  portfolioEyebrow: '04 Selected Works',
  portfolioHeading: 'Selected identity & editorial projects.',
  portfolioCtaText: 'View Full Archive',
  featuredPortfolioIds: ['p1', 'r1', 'p2', 'r2', 'p3', 'p4'],
  reviewsEyebrow: 'Client Endorsements',
  reviewsHeading: 'What founders & directors say',
  reviewsDescription: 'Real feedback from brand founders & creative directors.',
  aboutEyebrow: 'About',
  aboutHeading: 'Independent craft with direct collaboration.',
  aboutButtonText: 'Discover the Studio',
  aboutToolsText: 'Adobe Illustrator • Photoshop • InDesign',
  finalEyebrow: 'Have a Project in Mind?',
  finalBackgroundText: "LET'S BUILD",
  finalDescription: 'Direct collaboration with senior design expertise. Fast turnarounds, bespoke craftsmanship, and guaranteed press-ready excellence.',
  finalCtaText: 'Request a Proposal',
  finalCtaLink: '/contact',
  finalSecondaryText: 'Direct Email',
  introduction: 'Independent craft with direct collaboration.',
  finalCta: 'Let’s build something remarkable.',
  sectionVisibility: { hero: true, showcase: true, about: true, why: true, stats: true, services: true, portfolio: true, reviews: true, quote: true, finalCta: true },
};

export const ABOUT_CONTENT = {
  heading: 'ABOUT US',
  introduction: STUDIO_INFO.founderBio,
  ctaText: 'Start a project',
  ctaLink: '/contact',
  founderImage: '/media/about/founder-workspace.jpg',
  storyEyebrow: '01 The Story',
  storyHeading: '14+ Years of Design Craft & Purpose.',
  storyParagraphs: [
    'With over 14 years of dedicated industry experience, Joozz Designing has partnered with ambitious businesses, founders, and enterprises across the United Kingdom and globally to shape powerful brand narratives.',
    'From initial custom logo concepts and corporate branding to complex magazine layouts, packaging, and digital marketing visuals, every project is crafted with creativity, precision, and relentless attention to detail.',
    'Working across the industry-standard Adobe Creative Suite, we ensure every deliverable bridges digital vibrancy with flawless prepress production.',
  ],
  storyPillars: [
    { title: 'No Middle Management', description: 'Direct collaboration with the principal designer from discovery to delivery.' },
    { title: 'Press-Ready Precision', description: 'Flawless color separation, bleeds, and vector master deliverables.' },
  ],
  manifestoEyebrow: '02 Design Manifesto',
  manifestoHeading: 'The core principles that guide our studio.',
  manifestoPoints: [
    { number: '01', title: 'Craft Over Templates', description: 'We never recycle off-the-shelf templates or generic presets. Every mark, layout, and color swatch is conceived uniquely for your brand narrative.' },
    { number: '02', title: 'Typography as Voice', description: 'Typography is not just text—it is the voice and posture of your business. We obsess over kerning, line-height, hierarchy, and optical balance.' },
    { number: '03', title: 'Longevity Over Micro-Trends', description: 'Design should endure. We construct identities that look fresh on day one and remain distinguished a decade later.' },
    { number: '04', title: 'Flawless Physical Execution', description: 'A great concept is useless if it fails at the press. We guarantee zero errors across resolution, CMYK separations, and die-cuts.' },
  ],
  toolsEyebrow: '03 Tools of the Trade',
  toolsHeading: 'Deep mastery in Adobe Creative Suite & prepress.',
  tools: [
    { iconName: 'PenTool', name: 'Adobe Illustrator', role: 'Vector Identity & Typography', description: 'Precision bezier curve construction, custom letterform drafting, and infinite-resolution logo systems.' },
    { iconName: 'Palette', name: 'Adobe Photoshop', role: 'Art Direction & Retouching', description: 'High-end color grading, photographic composites, texture generation, and editorial mockups.' },
    { iconName: 'BookOpen', name: 'Adobe InDesign', role: 'Publication & Editorial Grid', description: 'Master pages, strict Swiss grid systems, paragraph styling, and press-ready book or magazine imposition.' },
    { iconName: 'Camera', name: 'Adobe Lightroom', role: 'Fashion & Campaign Grading', description: 'Tonal calibration, editorial lookbook styling, and consistent campaign palette development.' },
    { iconName: 'Printer', name: 'Prepress Color Standards', role: 'CMYK & Pantone Precision', description: 'Spot color separations, bleed calibrations, die-line creation, and commercial printer coordination.' },
    { iconName: 'Layers', name: 'Tactile Print Finishes', role: 'Material & Paper Engineering', description: 'Embossing, debossing, hot foil stamping, spot UV varnish, and heavy cotton or linen paper stock curation.' },
  ],
  processEyebrow: '04 Creative Process',
  processHeading: 'From initial spark to press-ready delivery.',
  locationPrimaryLabel: 'Principal Studio Hub',
  locationPrimaryHeading: 'Chelmsford, Essex & London',
  locationSecondaryLabel: 'International Line',
  locationSecondaryHeading: 'India Coordination Office',
  locationSecondaryDescription: 'Direct remote line for overseas commissions and agile production cycles.',
  teamEyebrow: 'The People',
  teamHeading: 'Production Team',
  teamDescription: 'Exceptional talent is the cornerstone of everything we create. Our team brings decades of combined experience in multimedia production.',
  finalHeading: 'Ready to elevate your brand with Joozz Designing?',
  finalPrimaryText: 'Inquire for Availability',
  finalSecondaryText: 'Browse Archive',
  sectionVisibility: { hero: true, story: true, manifesto: true, tools: true, process: true, locations: true, team: true, finalCta: true },
};

export const CONTACT_CONTENT = {
  heading: "Tell us about your brand. Let's create something extraordinary.",
  introduction: 'Whether you need a full visual identity, high-finish print collateral, or an ongoing creative retainer, our team will get back to you directly with availability and next steps.',
  formHeading: 'Project Inquiry Form',
  formDescription: 'Fill in your requirements below for a detailed project estimate and timeline.',
  contactsHeading: 'Direct Studio Contacts',
  responseLabel: '48–72 hour concept turnaround',
  responseTime: 'We respond to all project inquiries within 24 hours with a custom project proposal and scheduled kickoff date.',
  faqEyebrow: '02 Frequently Asked Questions',
  faqHeading: 'Clear answers on process, timelines & delivery.',
  form: {
    nameLabel: 'Your Name', namePlaceholder: 'e.g. Eleanor Vance',
    emailLabel: 'Email Address', emailPlaceholder: 'e.g. eleanor@studio.com',
    phoneLabel: 'Phone / WhatsApp', phonePlaceholder: '+44 7000 000000', optionalLabel: 'Optional',
    serviceLabel: 'Project Type', budgetLabel: 'Estimated Budget', timelineLabel: 'Target Timeline',
    messageLabel: 'Project Details & Objectives', messagePlaceholder: 'Tell us about your brand, what deliverables you need, and any specific aesthetic inspirations...',
    submitText: 'Send Project Inquiry', submittingText: 'Transmitting Details...',
    successHeading: 'Inquiry Received', successMessage: 'Thank you. Our studio will review your project requirements and respond within 24â€“48 hours with initial thoughts and availability.',
    resetText: 'Send Another Message', responseNote: 'Direct response within 24â€“48 hours. No middle management.',
    extraServices: ['Ongoing Creative Retainer', 'Other / Custom Project'],
    budgets: ['Under Â£1,000', 'Â£1,000 - Â£3,000', 'Â£3,000 - Â£6,000', 'Â£6,000+'],
    timelines: ['Urgent (Within 1-2 Weeks)', 'Within 2-4 Weeks', 'Next 1-2 Months', 'Flexible / Planning'],
  },
  sectionVisibility: { hero: true, form: true, faqs: true },
};

export const SERVICES_CONTENT = {
  eyebrow: 'Our Services & Solutions',
  heading: 'Design Solutions.',
  highlightedHeading: 'Crafted with Precision.',
  description: 'With over 14 years of professional experience, Joozz Designing delivers high-impact branding, print mastery, and digital design tailored to your strategic business goals.',
  guaranteeEyebrow: 'Technical Excellence Guarantee',
  guaranteeHeading: '100% Press-Ready & Vector Standards',
  guaranteeDescription: 'We eliminate costly printer rejections. Every file pack includes clean spot color separations, Pantone matching, accurate 3mm+ bleeds, trimmed die-lines, and infinite-resolution master SVG/EPS/AI vector files.',
  guaranteeButtonText: 'Discuss Your Specifications', guaranteeButtonLink: '/contact',
  detailBackText: 'Back to Services', detailCtaText: 'Start a Project', detailCtaLink: '/contact',
  offersEyebrow: 'Scope of Capabilities', offersHeading: 'What We Offer',
  deliverablesEyebrow: 'Guaranteed Standard', deliverablesHeading: 'Core Deliverables',
  deliverablesDescription: 'Every project includes full vector production master files, color-separated proofs, and direct technical printer coordination.',
  finalHeading: 'Ready to Collaborate?',
  finalDescription: 'Elevate your brand with 14+ years of bespoke design mastery, direct designer collaboration, and guaranteed press-ready excellence.',
  finalPrimaryText: 'Get a Quote', finalPrimaryLink: '/contact', finalSecondaryText: 'View Portfolio', finalSecondaryLink: '/portfolio',
  sectionVisibility: { hero: true, list: true, guarantee: true, offers: true, finalCta: true },
};

export const PORTFOLIO_CONTENT = {
  eyebrow: 'Curated Design Archive',
  heading: 'A showcase of marks, print collateral &',
  highlightedHeading: 'visual identities.',
  description: 'Explore recent works across branding, packaging, editorial layout, fashion photography, and kinetic motion reels. Click any piece to inspect technical deliverables, typography details, and client specifications.',
  allFilterLabel: 'All', imageActionText: 'Inspect Details', videoActionText: 'Expand Full Reel', deliverablesLabel: 'Deliverables',
  sectionVisibility: { hero: true, filters: true, gallery: true },
};

export const GLOBAL_CONTENT = {
  logo: '/media/global/logo.png', brandLabel: 'JOOZZ', brandLocation: 'STUDIO UK',
  servicesMenuLabel: 'Our Services', servicesMenuAllText: 'View All Services',
  startProjectText: 'Start Project', mobilePhoneLabel: 'Direct UK Line:',
  footerDescription: 'Independent graphic design, brand architecture, and visual storytelling. Chelmsford & London, United Kingdom.',
  availabilityText: 'Available for New Brand Projects', studioLinksHeading: 'Studio', disciplinesLinksHeading: 'Disciplines', contactHeading: 'Get in Touch',
  copyrightText: 'Joozz Designing. All Rights Reserved.', footerLocationText: 'Chelmsford, Essex Â· London WC2H 9JQ', footerRegistrationText: 'UK Registered Design Studio',
  notFoundLabel: '// 404 ERROR', notFoundHeading: 'Page Not Found', notFoundDescription: 'The page you are looking for does not exist or may have moved. Please return to the homepage or explore our core disciplines.', notFoundButtonText: 'Return Home',
};

export const PAGE_SEO: Record<string, { title?: string; metaTitle?: string; metaDescription?: string; indexable?: boolean }> = {};

/**
 * Keeps the current static data as a resilient first-paint fallback, then swaps
 * in CMS data after the public API has responded. Arrays retain their identity
 * so all existing page components receive the new content on the next render.
 */
export function applyPublicContent(payload: {
  settings?: Record<string, unknown>;
  services?: unknown[];
  portfolio?: unknown[];
  faqs?: unknown[];
  navigation?: unknown[];
  categories?: string[];
  seo?: Record<string, { title?: string; metaTitle?: string; metaDescription?: string; indexable?: boolean }>;
}): void {
  const settings = payload.settings || {};
  if (isRecord(settings.studio_info)) Object.assign(STUDIO_INFO, settings.studio_info);
  if (Array.isArray(settings.stats)) replaceArray(STATS, settings.stats as StatItem[]);
  if (Array.isArray(settings.creative_process)) replaceArray(CREATIVE_PROCESS, settings.creative_process as ProcessStep[]);
  if (Array.isArray(settings.production_team)) replaceArray(PRODUCTION_TEAM, settings.production_team as TeamMember[]);
  if (Array.isArray(settings.marquee_keywords)) replaceArray(MARQUEE_KEYWORDS, settings.marquee_keywords as string[]);
  if (isRecord(settings.testimonial)) Object.assign(TESTIMONIAL, settings.testimonial);
  if (Array.isArray(settings.client_reviews)) replaceArray(CLIENT_REVIEWS, settings.client_reviews as TestimonialItem[]);
  if (isRecord(settings.home_content)) Object.assign(HOME_CONTENT, settings.home_content);
  if (isRecord(settings.about_content)) Object.assign(ABOUT_CONTENT, settings.about_content);
  if (isRecord(settings.contact_content)) Object.assign(CONTACT_CONTENT, settings.contact_content);
  if (isRecord(settings.services_content)) Object.assign(SERVICES_CONTENT, settings.services_content);
  if (isRecord(settings.portfolio_content)) Object.assign(PORTFOLIO_CONTENT, settings.portfolio_content);
  if (isRecord(settings.global_content)) Object.assign(GLOBAL_CONTENT, settings.global_content);
  if (Array.isArray(payload.services)) replaceArray(CORE_SERVICES, payload.services as ServiceItem[]);
  if (Array.isArray(payload.portfolio)) replaceArray(PORTFOLIO_ITEMS, payload.portfolio as PortfolioItem[]);
  if (Array.isArray(payload.faqs)) replaceArray(FAQS, payload.faqs as typeof FAQS);
  if (Array.isArray(payload.navigation)) replaceArray(NAVIGATION_ITEMS, payload.navigation as typeof NAVIGATION_ITEMS);
  if (Array.isArray(payload.categories)) replaceArray(PORTFOLIO_CATEGORIES, payload.categories as string[]);
  if (isRecord(payload.seo)) Object.assign(PAGE_SEO, payload.seo);
  normalizeUploadedMedia();
}

export function applyCmsDocumentPreview(key: string, document: Record<string, unknown>): void {
  if (key === 'global') {
    if (isRecord(document.studioInfo)) Object.assign(STUDIO_INFO, document.studioInfo);
    if (isRecord(document.content)) Object.assign(GLOBAL_CONTENT, document.content);
    if (Array.isArray(document.navigation)) replaceArray(NAVIGATION_ITEMS, document.navigation as typeof NAVIGATION_ITEMS);
    if (isRecord(document.collections)) {
      const collections = document.collections;
      if (Array.isArray(collections.services)) replaceArray(CORE_SERVICES, collections.services as ServiceItem[]);
      if (Array.isArray(collections.testimonials)) replaceArray(CLIENT_REVIEWS, collections.testimonials as TestimonialItem[]);
      if (Array.isArray(collections.faqs)) replaceArray(FAQS, collections.faqs as typeof FAQS);
      if (Array.isArray(collections.team)) replaceArray(PRODUCTION_TEAM, collections.team as TeamMember[]);
      if (Array.isArray(collections.stats)) replaceArray(STATS, collections.stats as StatItem[]);
      if (Array.isArray(collections.categories)) replaceArray(PORTFOLIO_CATEGORIES, collections.categories as string[]);
    }
  }
  if (key === 'home') {
    if (isRecord(document.content)) Object.assign(HOME_CONTENT, document.content);
    if (Array.isArray(document.stats)) replaceArray(STATS, document.stats as StatItem[]);
    if (Array.isArray(document.reviews)) replaceArray(CLIENT_REVIEWS, document.reviews as TestimonialItem[]);
    if (isRecord(document.testimonial)) Object.assign(TESTIMONIAL, document.testimonial);
  }
  if (key === 'about') {
    if (isRecord(document.content)) Object.assign(ABOUT_CONTENT, document.content);
    if (Array.isArray(document.process)) replaceArray(CREATIVE_PROCESS, document.process as ProcessStep[]);
    if (Array.isArray(document.team)) replaceArray(PRODUCTION_TEAM, document.team as TeamMember[]);
  }
  if (key === 'services') {
    if (isRecord(document.content)) Object.assign(SERVICES_CONTENT, document.content);
    if (Array.isArray(document.items)) replaceArray(CORE_SERVICES, document.items as ServiceItem[]);
  }
  if (key === 'portfolio') {
    if (isRecord(document.content)) Object.assign(PORTFOLIO_CONTENT, document.content);
    if (Array.isArray(document.items)) replaceArray(PORTFOLIO_ITEMS, document.items as PortfolioItem[]);
  }
  if (key === 'contact') {
    if (isRecord(document.content)) Object.assign(CONTACT_CONTENT, document.content);
    if (Array.isArray(document.faqs)) replaceArray(FAQS, document.faqs as typeof FAQS);
  }
  if (isRecord(document.seo)) PAGE_SEO[key] = document.seo;
  normalizeUploadedMedia();
}

function normalizeUploadedMedia(): void {
  const apiBase = ((import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_API_BASE_URL || '/api/v1').replace(/\/api\/v1\/?$/, '');
  const mediaUrl = (value: string | undefined): string | undefined => value?.startsWith('/uploads/') ? `${apiBase}${value}` : value;
  PRODUCTION_TEAM.forEach(member => { member.image = mediaUrl(member.image) || member.image; });
  CORE_SERVICES.forEach(service => { service.image = mediaUrl(service.image); });
  PORTFOLIO_ITEMS.forEach(item => { item.thumbnail = mediaUrl(item.thumbnail); item.mediaUrl = mediaUrl(item.mediaUrl); item.imageUrl = mediaUrl(item.imageUrl); });
  CLIENT_REVIEWS.forEach(review => { review.avatar = mediaUrl(review.avatar); });
}

function replaceArray<T>(target: T[], values: T[]): void {
  target.splice(0, target.length, ...values);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
