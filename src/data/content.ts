import { ServiceItem, StatItem, PortfolioItem, TestimonialItem, ProcessStep, StudioInfo } from '../types';

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
    id: "why-choose-us",
    number: "01",
    title: "Why Choose Joozz Designing?",
    heroHeadlineTop: "EXPERIENCED & TRUSTED",
    heroHeadlineMain: "WHY CHOOSE US",
    tagline: "Creative, reliable, and client-focused",
    description:
      "14+ years of professional design experience with a creative, reliable, and client-focused approach. We deliver high-quality designs with quick turnaround tailored to your business goals.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Creative strategic agency planning and design excellence",
    deliverables: [
      "14+ Years of Professional Design Experience",
      "Creative, Reliable, & Client-Focused Approach",
      "High-Quality Designs with Quick Turnaround",
      "Designs Tailored to Your Business Goals"
    ],
    whatWeOffer: [
      {
        number: "01",
        title: "14+ Years Experience",
        description: "Over a decade and a half of mastering typography, branding systems, and prepress standards across global and UK industries."
      },
      {
        number: "02",
        title: "Client-Centric Philosophy",
        description: "Direct collaboration with the principal designer from discovery to delivery without layers of account management."
      },
      {
        number: "03",
        title: "Quick Turnaround",
        description: "Fast, dependable production cycles tailored to tight marketing launches and commercial printing deadlines."
      },
      {
        number: "04",
        title: "Bespoke Originality",
        description: "Zero generic templates or repetitive presets. Every visual mark and layout is custom engineered for your brand."
      },
      {
        number: "05",
        title: "Press-Ready Precision",
        description: "Flawless technical standards ensuring spot-on CMYK color separation, resolution, bleeds, and die-cut calibration."
      },
      {
        number: "06",
        title: "Multi-Platform Mastery",
        description: "Cohesive visual continuity spanning tactile luxury print media to high-converting social and digital assets."
      }
    ],
    idealFor: "Businesses seeking proven design experience, rapid turnarounds, and bespoke creative solutions.",
    iconName: "ShieldCheck"
  },
  {
    id: "corporate-design",
    number: "02",
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
    number: "03",
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
    number: "04",
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
    number: "05",
    title: "Print Design",
    heroHeadlineTop: "TACTILE & PRESS READY",
    heroHeadlineMain: "PRINT DESIGN MASTERY",
    tagline: "High-quality print designs created with attention to detail",
    description:
      "Business cards & corporate stationery, brochures, flyers & leaflets, posters, banners & roll-ups, magazine & catalogue design, and premium packaging & label design.",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Luxury paper stock, offset print production, and catalog design",
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
    number: "06",
    title: "Digital & Social Media Design",
    heroHeadlineTop: "MODERN & HIGH CONVERTING",
    heroHeadlineMain: "DIGITAL & SOCIAL MEDIA DESIGN",
    tagline: "Creative digital designs optimised for online platforms",
    description:
      "Social media posts & ad creatives, web banners & digital advertisements, presentation & pitch deck design, and high-converting email marketing visuals.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Social media marketing visuals, digital display advertising, and UI graphics",
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
      "Prince explores distinct creative directions, drafting custom vector marks, typographic lockups, and preliminary layouts.",
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
    "Prince is a designer who genuinely listens. The branding work he produced visibly elevated our business image and drew repeated compliments from our clients and partners.",
  attribution: "Verified Client",
  role: "Brand Director",
  noteForClient: ""
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "p1",
    title: "Architectural Identity & Wordmark",
    category: "Logo Design",
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
    id: "p2",
    title: "Artisan Coffee Roasters Brand System",
    category: "Branding",
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
    id: "p3",
    title: "Biennale Exhibition Large Poster Series",
    category: "Brochures & Posters",
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
