import {
  ABOUT_CONTENT, CLIENT_REVIEWS, CONTACT_CONTENT, CORE_SERVICES, CREATIVE_PROCESS,
  FAQS, GLOBAL_CONTENT, HOME_CONTENT, NAVIGATION_ITEMS, PORTFOLIO_CATEGORIES, PORTFOLIO_CONTENT,
  PORTFOLIO_ITEMS, PRODUCTION_TEAM, SERVICES_CONTENT, STATS, STUDIO_INFO, TESTIMONIAL,
} from '../data/content';

export type FieldType = 'text' | 'textarea' | 'url' | 'image' | 'toggle' | 'number' | 'list' | 'categoryList' | 'portfolioSelect' | 'serviceSelect' | 'objectList' | 'select';
export interface FieldSchema {
  path: string;
  label: string;
  type?: FieldType;
  help?: string;
  placeholder?: string;
  fields?: FieldSchema[];
  options?: Array<{ label: string; value: string }>;
}
export interface RepeaterSchema {
  path: string;
  itemName: string;
  titlePath: string;
  fields: FieldSchema[];
  filter?: { path: string; value: unknown };
}
export interface SectionSchema {
  key: string;
  title: string;
  description: string;
  fields?: FieldSchema[];
  repeater?: RepeaterSchema;
  visibilityPath?: string;
}
export interface DocumentSchema { title: string; route: string; description: string; sections: SectionSchema[] }

const sharedCollectionSections = (): SectionSchema[] => [
  { key: 'sharedServices', title: 'Services', description: 'One shared list used by the homepage, Services page, navigation and enquiry form.', repeater: { path: 'collections.services', itemName: 'Service', titlePath: 'title', fields: [
    { path: 'id', label: 'Website ID', help: 'Use lowercase letters and hyphens, for example web-development.' }, { path: 'title', label: 'Service Name' }, { path: 'number', label: 'Menu Number' }, { path: 'tagline', label: 'Short Introduction' }, { path: 'heroHeadlineTop', label: 'Hero Label' }, { path: 'heroHeadlineMain', label: 'Hero Heading' }, { path: 'description', label: 'Description', type: 'textarea' }, { path: 'image', label: 'Featured Image', type: 'image' }, { path: 'imageAlt', label: 'Image Description' }, { path: 'idealFor', label: 'Ideal Customer', type: 'textarea' }, { path: 'deliverables', label: 'Deliverables', type: 'list' }, { path: 'whatWeOffer', label: 'What We Offer', type: 'objectList', fields: [{ path: 'title', label: 'Title' }, { path: 'description', label: 'Description', type: 'textarea' }] }, { path: 'visible', label: 'Show Service', type: 'toggle' },
  ] } },
  { key: 'sharedTestimonials', title: 'Testimonials', description: 'Shared client reviews used wherever testimonial cards appear.', repeater: { path: 'collections.testimonials', itemName: 'Testimonial', titlePath: 'attribution', fields: [
    { path: 'attribution', label: 'Client Name' }, { path: 'role', label: 'Role' }, { path: 'company', label: 'Company' }, { path: 'rating', label: 'Rating', type: 'number' }, { path: 'avatar', label: 'Photo', type: 'image' }, { path: 'quote', label: 'Review', type: 'textarea' },
  ] } },
  { key: 'sharedFaqs', title: 'FAQs', description: 'One shared FAQ collection used across contact and future page sections.', repeater: { path: 'collections.faqs', itemName: 'FAQ', titlePath: 'q', fields: [
    { path: 'q', label: 'Question' }, { path: 'a', label: 'Answer', type: 'textarea' }, { path: 'visible', label: 'Show FAQ', type: 'toggle' },
  ] } },
  { key: 'sharedTeam', title: 'Team Members', description: 'Shared team profiles used on the About page and future team sections.', repeater: { path: 'collections.team', itemName: 'Team Member', titlePath: 'name', fields: [
    { path: 'name', label: 'Name' }, { path: 'role', label: 'Role' }, { path: 'image', label: 'Photo', type: 'image' }, { path: 'visible', label: 'Show Member', type: 'toggle' },
  ] } },
  { key: 'sharedStats', title: 'Statistics', description: 'Shared proof points that can be reused across page sections.', repeater: { path: 'collections.stats', itemName: 'Statistic', titlePath: 'label', fields: [
    { path: 'value', label: 'Value' }, { path: 'label', label: 'Label' }, { path: 'description', label: 'Description', type: 'textarea' }, { path: 'isConfirmed', label: 'Confirmed', type: 'toggle' },
  ] } },
  { key: 'sharedCategories', title: 'Portfolio Categories', description: 'Add and manage the shared category list used by portfolio filters and project cards.', fields: [{ path: 'collections.categories', label: 'Categories', type: 'categoryList', help: 'Choose these categories on every portfolio project to prevent spelling mismatches.' }] },
];

export const CMS_SCHEMAS: Record<string, DocumentSchema> = {
  home: {
    title: 'Home Page', route: '/', description: 'Manage every content section shown on the homepage.', sections: [
      { key: 'hero', title: 'Hero Section', description: 'The opening message, topic labels and primary actions.', visibilityPath: 'content.sectionVisibility.hero', fields: [
        { path: 'content.heroEyebrow', label: 'Small Label' }, { path: 'content.heroHeading', label: 'Main Heading', type: 'textarea', help: 'Use a new line to control each headline line.' },
        { path: 'content.heroSubheading', label: 'Description', type: 'textarea' }, { path: 'content.heroTags', label: 'Topic Labels', type: 'list', help: 'One label per line.' },
        { path: 'content.ctaText', label: 'Primary Button Text' }, { path: 'content.ctaLink', label: 'Primary Button Destination', type: 'url' },
        { path: 'content.secondaryCtaText', label: 'Secondary Button Text' }, { path: 'content.secondaryCtaLink', label: 'Secondary Button Destination', type: 'url' },
      ]},
      { key: 'showcase', title: 'Motion Showcase', description: 'Featured video, poster, supporting copy and button.', visibilityPath: 'content.sectionVisibility.showcase', fields: [
        { path: 'content.featuredVideo', label: 'Featured Video', type: 'image', help: 'MP4 or WebM. Landscape media works best.' }, { path: 'content.featuredVideoPoster', label: 'Video Poster Image', type: 'image', help: 'Recommended: 1600 × 900 landscape.' },
        { path: 'content.featuredEyebrow', label: 'Small Label' }, { path: 'content.featuredHeading', label: 'Heading' }, { path: 'content.featuredDescription', label: 'Description', type: 'textarea' },
        { path: 'content.featuredCtaText', label: 'Button Text' }, { path: 'content.featuredCtaLink', label: 'Button Destination', type: 'url' },
      ]},
      { key: 'why', title: 'Why Choose Us', description: 'Trust message and benefit cards.', visibilityPath: 'content.sectionVisibility.why', fields: [
        { path: 'content.whyEyebrow', label: 'Small Label' }, { path: 'content.whyHeading', label: 'Heading' }, { path: 'content.whyDescription', label: 'Description', type: 'textarea' },
        { path: 'content.whyPoints', label: 'Benefit Cards', type: 'objectList', fields: [{ path: 'title', label: 'Title' }, { path: 'description', label: 'Description', type: 'textarea' }] },
      ]},
      { key: 'about', title: 'About Preview', description: 'Short studio introduction displayed on the homepage.', visibilityPath: 'content.sectionVisibility.about', fields: [
        { path: 'content.aboutEyebrow', label: 'Small Label' }, { path: 'content.aboutHeading', label: 'Heading', type: 'textarea' }, { path: 'content.aboutDescription', label: 'Description', type: 'textarea', help: 'The paragraph below the heading on the Home page.' }, { path: 'content.aboutButtonText', label: 'Button Text' }, { path: 'content.aboutToolsText', label: 'Tools Label' },
      ]},
      { key: 'stats', title: 'Statistics', description: 'Edit the statistic cards shown on the Home page.', visibilityPath: 'content.sectionVisibility.stats', repeater: { path: 'stats', itemName: 'Statistic', titlePath: 'label', fields: [
        { path: 'number', label: 'Reference Number', help: 'Optional internal display number, for example 01.' }, { path: 'value', label: 'Value', help: 'For example 14+, 300+, or 100%.' }, { path: 'label', label: 'Label' }, { path: 'description', label: 'Description', type: 'textarea', help: 'Supporting detail for this statistic.' }, { path: 'isConfirmed', label: 'Confirmed', type: 'toggle' },
      ] } },
      { key: 'services', title: 'Services Preview', description: 'Heading and link above the featured services.', visibilityPath: 'content.sectionVisibility.services', fields: [
        { path: 'content.servicesEyebrow', label: 'Small Label' }, { path: 'content.servicesHeading', label: 'Heading', type: 'textarea' }, { path: 'content.servicesCtaText', label: 'Button Text' }, { path: 'content.featuredServiceIds', label: 'Featured Services', type: 'serviceSelect', help: 'Choose which services appear in this Home page section.' },
      ]},
      { key: 'portfolio', title: 'Portfolio Preview', description: 'Heading and action above selected projects.', visibilityPath: 'content.sectionVisibility.portfolio', fields: [
        { path: 'content.portfolioEyebrow', label: 'Small Label' }, { path: 'content.portfolioHeading', label: 'Heading', type: 'textarea' }, { path: 'content.portfolioCtaText', label: 'Button Text' }, { path: 'content.featuredPortfolioIds', label: 'Featured Works', type: 'portfolioSelect', help: 'Choose the projects that appear in this Home page section.' },
      ]},
      { key: 'reviews', title: 'Client Reviews', description: 'Section copy and client testimonial cards.', visibilityPath: 'content.sectionVisibility.reviews', fields: [
        { path: 'content.reviewsEyebrow', label: 'Small Label' }, { path: 'content.reviewsHeading', label: 'Heading' }, { path: 'content.reviewsDescription', label: 'Description' },
      ], repeater: { path: 'reviews', itemName: 'Review', titlePath: 'attribution', fields: [
        { path: 'attribution', label: 'Client Name' }, { path: 'role', label: 'Role' }, { path: 'company', label: 'Company' }, { path: 'rating', label: 'Star Rating', type: 'number' }, { path: 'quote', label: 'Review', type: 'textarea' }, { path: 'avatar', label: 'Client Photo', type: 'image', help: 'Optional square profile image.' },
      ] } },
      { key: 'quote', title: 'Studio Quote', description: 'The large pull quote below client reviews.', visibilityPath: 'content.sectionVisibility.quote', fields: [
        { path: 'testimonial.quote', label: 'Quote', type: 'textarea' }, { path: 'testimonial.attribution', label: 'Attribution' }, { path: 'testimonial.role', label: 'Role' },
      ]},
      { key: 'finalCta', title: 'Final Call to Action', description: 'The closing invitation and contact actions.', visibilityPath: 'content.sectionVisibility.finalCta', fields: [
        { path: 'content.finalEyebrow', label: 'Small Label' }, { path: 'content.finalBackgroundText', label: 'Background Text' }, { path: 'content.finalCta', label: 'Heading', type: 'textarea' }, { path: 'content.finalDescription', label: 'Description', type: 'textarea' }, { path: 'content.finalCtaText', label: 'Button Text' }, { path: 'content.finalCtaLink', label: 'Button Destination', type: 'url' }, { path: 'content.finalSecondaryText', label: 'Email Button Text' },
      ]},
    ],
  },
  about: {
    title: 'About Page', route: '/about', description: 'Manage the studio story, principles, process and team.', sections: [
      { key: 'hero', title: 'Page Introduction', description: 'Opening title and studio introduction.', visibilityPath: 'content.sectionVisibility.hero', fields: [{ path: 'content.heading', label: 'Page Heading' }, { path: 'content.introduction', label: 'Introduction', type: 'textarea' }] },
      { key: 'story', title: 'Founder Story', description: 'Founder image and long-form studio story.', visibilityPath: 'content.sectionVisibility.story', fields: [
        { path: 'content.founderImage', label: 'Founder Image', type: 'image', help: 'Recommended: portrait or 4:5 image.' }, { path: 'content.storyEyebrow', label: 'Small Label' }, { path: 'content.storyHeading', label: 'Heading' }, { path: 'content.storyParagraphs', label: 'Story Paragraphs', type: 'list', help: 'One paragraph per line.' }, { path: 'content.storyPillars', label: 'Story Highlights', type: 'objectList', fields: [{ path: 'title', label: 'Title' }, { path: 'description', label: 'Description', type: 'textarea' }] },
      ]},
      { key: 'manifesto', title: 'Design Manifesto', description: 'Principles heading and cards.', visibilityPath: 'content.sectionVisibility.manifesto', fields: [{ path: 'content.manifestoEyebrow', label: 'Small Label' }, { path: 'content.manifestoHeading', label: 'Heading' }, { path: 'content.manifestoPoints', label: 'Principles', type: 'objectList', fields: [{ path: 'number', label: 'Number' }, { path: 'title', label: 'Title' }, { path: 'description', label: 'Description', type: 'textarea' }] }] },
      { key: 'tools', title: 'Tools & Expertise', description: 'Tools-of-the-trade heading and cards.', visibilityPath: 'content.sectionVisibility.tools', fields: [{ path: 'content.toolsEyebrow', label: 'Small Label' }, { path: 'content.toolsHeading', label: 'Heading' }, { path: 'content.tools', label: 'Tools', type: 'objectList', fields: [{ path: 'iconName', label: 'Icon', type: 'select', options: [{ label: 'Pen tool', value: 'PenTool' }, { label: 'Colour palette', value: 'Palette' }, { label: 'Book / publication', value: 'BookOpen' }, { label: 'Camera', value: 'Camera' }, { label: 'Printer', value: 'Printer' }, { label: 'Layers', value: 'Layers' }, { label: 'Sliders / controls', value: 'Sliders' }, { label: 'Compass', value: 'Compass' }, { label: 'Technology', value: 'Cpu' }, { label: 'Feather / craft', value: 'Feather' }] }, { path: 'name', label: 'Name' }, { path: 'role', label: 'Role' }, { path: 'description', label: 'Description', type: 'textarea' }] }] },
      { key: 'process', title: 'Creative Process', description: 'Ordered workflow shown to prospective clients.', visibilityPath: 'content.sectionVisibility.process', fields: [{ path: 'content.processEyebrow', label: 'Small Label' }, { path: 'content.processHeading', label: 'Heading' }], repeater: { path: 'process', itemName: 'Process Step', titlePath: 'title', fields: [
        { path: 'number', label: 'Step Number' }, { path: 'title', label: 'Title' }, { path: 'description', label: 'Description', type: 'textarea' }, { path: 'deliverables', label: 'Deliverables', type: 'list', help: 'One deliverable per line.' },
      ] } },
      { key: 'locations', title: 'Studio Locations', description: 'Labels, shared address and shared phone numbers for the location cards.', visibilityPath: 'content.sectionVisibility.locations', fields: [{ path: 'content.locationPrimaryLabel', label: 'UK Small Label' }, { path: 'content.locationPrimaryHeading', label: 'UK Heading' }, { path: 'studioInfo.registeredOffice', label: 'UK Address', type: 'textarea', help: 'Shared business address used throughout the website.' }, { path: 'studioInfo.phoneUK', label: 'UK Phone Number', help: 'Shared UK phone number used throughout the website.' }, { path: 'content.locationSecondaryLabel', label: 'International Small Label' }, { path: 'content.locationSecondaryHeading', label: 'International Heading' }, { path: 'content.locationSecondaryDescription', label: 'International Description', type: 'textarea' }, { path: 'studioInfo.phoneIndia', label: 'International Phone Number', help: 'Shared international phone number used throughout the website.' }] },
      { key: 'team', title: 'Production Team', description: 'Introduction and individual team member cards.', visibilityPath: 'content.sectionVisibility.team', fields: [{ path: 'content.teamEyebrow', label: 'Small Label' }, { path: 'content.teamHeading', label: 'Heading' }, { path: 'content.teamDescription', label: 'Description', type: 'textarea' }], repeater: { path: 'team', itemName: 'Team Member', titlePath: 'name', fields: [
        { path: 'name', label: 'Name' }, { path: 'role', label: 'Role' }, { path: 'image', label: 'Photo', type: 'image', help: 'Portrait image works best.' }, { path: 'visible', label: 'Show Team Member', type: 'toggle' },
      ] } },
      { key: 'finalCta', title: 'Final Call to Action', description: 'Closing heading and buttons.', visibilityPath: 'content.sectionVisibility.finalCta', fields: [{ path: 'content.finalHeading', label: 'Heading' }, { path: 'content.finalPrimaryText', label: 'Primary Button Text' }, { path: 'content.finalSecondaryText', label: 'Secondary Button Text' }] },
    ],
  },
  services: {
    title: 'Services', route: '/services', description: 'Manage the services landing page and every service detail.', sections: [
      { key: 'hero', title: 'Page Introduction', description: 'Services page title and opening description.', visibilityPath: 'content.sectionVisibility.hero', fields: [{ path: 'content.eyebrow', label: 'Small Label' }, { path: 'content.heading', label: 'Main Heading' }, { path: 'content.highlightedHeading', label: 'Highlighted Heading' }, { path: 'content.description', label: 'Description', type: 'textarea' }] },
      { key: 'items', title: 'Service Cards', description: 'Edit every service card and its matching service-detail content.', visibilityPath: 'content.sectionVisibility.list', repeater: { path: 'items', itemName: 'Service', titlePath: 'title', fields: [
        { path: 'id', label: 'Website ID', help: 'Use lowercase letters and hyphens, for example web-development.' }, { path: 'title', label: 'Service Name' }, { path: 'tagline', label: 'Short Introduction' }, { path: 'iconName', label: 'Service Icon', type: 'select', options: [{ label: 'Pen tool', value: 'PenTool' }, { label: 'Colour palette', value: 'Palette' }, { label: 'Document', value: 'FileText' }, { label: 'Business card', value: 'CreditCard' }, { label: 'Book / publication', value: 'BookOpen' }, { label: 'Printer', value: 'Printer' }, { label: 'Camera', value: 'Camera' }] }, { path: 'description', label: 'Description', type: 'textarea' }, { path: 'image', label: 'Featured Image', type: 'image' }, { path: 'imageAlt', label: 'Image Description' }, { path: 'idealFor', label: 'Ideal Customer', type: 'textarea' }, { path: 'deliverables', label: 'Deliverables', type: 'list', help: 'One deliverable per line.' }, { path: 'whatWeOffer', label: 'What We Offer', type: 'objectList', fields: [{ path: 'title', label: 'Title' }, { path: 'description', label: 'Description', type: 'textarea' }] }, { path: 'visible', label: 'Show Service', type: 'toggle' },
      ] } },
      { key: 'guarantee', title: 'Press-Ready Guarantee', description: 'Technical assurance card and its action.', visibilityPath: 'content.sectionVisibility.guarantee', fields: [{ path: 'content.guaranteeEyebrow', label: 'Small Label' }, { path: 'content.guaranteeHeading', label: 'Heading' }, { path: 'content.guaranteeDescription', label: 'Description', type: 'textarea' }, { path: 'content.guaranteeButtonText', label: 'Button Text' }, { path: 'content.guaranteeButtonLink', label: 'Button Destination', type: 'url' }] },
      { key: 'detailLabels', title: 'Service Detail Labels', description: 'Shared labels and calls to action used on every service page.', fields: [{ path: 'content.detailBackText', label: 'Back Button Text' }, { path: 'content.detailCtaText', label: 'Hero Button Text' }, { path: 'content.detailCtaLink', label: 'Hero Button Destination', type: 'url' }, { path: 'content.offersEyebrow', label: 'Offers Small Label' }, { path: 'content.offersHeading', label: 'Offers Heading' }, { path: 'content.deliverablesEyebrow', label: 'Deliverables Small Label' }, { path: 'content.deliverablesHeading', label: 'Deliverables Heading' }, { path: 'content.deliverablesDescription', label: 'Deliverables Description', type: 'textarea' }] },
      { key: 'finalCta', title: 'Final Call to Action', description: 'Closing service-page invitation.', visibilityPath: 'content.sectionVisibility.finalCta', fields: [{ path: 'content.finalHeading', label: 'Heading' }, { path: 'content.finalDescription', label: 'Description', type: 'textarea' }, { path: 'content.finalPrimaryText', label: 'Primary Button Text' }, { path: 'content.finalPrimaryLink', label: 'Primary Button Destination', type: 'url' }, { path: 'content.finalSecondaryText', label: 'Secondary Button Text' }, { path: 'content.finalSecondaryLink', label: 'Secondary Button Destination', type: 'url' }] },
    ],
  },
  portfolio: {
    title: 'Portfolio', route: '/portfolio', description: 'Manage the archive introduction, filters and project cards.', sections: [
      { key: 'hero', title: 'Page Introduction', description: 'Portfolio title and opening copy.', visibilityPath: 'content.sectionVisibility.hero', fields: [{ path: 'content.eyebrow', label: 'Small Label' }, { path: 'content.heading', label: 'Main Heading' }, { path: 'content.highlightedHeading', label: 'Highlighted Heading' }, { path: 'content.description', label: 'Description', type: 'textarea' }] },
      { key: 'labels', title: 'Gallery Labels', description: 'Small interface labels used around portfolio cards.', visibilityPath: 'content.sectionVisibility.filters', fields: [{ path: 'content.allFilterLabel', label: 'All Projects Label' }, { path: 'content.imageActionText', label: 'Image Action Text' }, { path: 'content.videoActionText', label: 'Video Action Text' }, { path: 'content.deliverablesLabel', label: 'Deliverables Label' }] },
      { key: 'categories', title: 'Portfolio Categories', description: 'Add and manage the categories available for every portfolio project.', fields: [{ path: 'categories', label: 'Categories', type: 'categoryList', help: 'Add a category here, then select it on any portfolio project.' }] },
      { key: 'items', title: 'Portfolio Projects', description: 'Add, edit, reorder or hide projects.', visibilityPath: 'content.sectionVisibility.gallery', repeater: { path: 'items', itemName: 'Project', titlePath: 'title', fields: [{ path: 'title', label: 'Project Title' }, { path: 'category', label: 'Category' }, { path: 'client', label: 'Client' }, { path: 'year', label: 'Year' }, { path: 'description', label: 'Description', type: 'textarea' }, { path: 'thumbnail', label: 'Thumbnail', type: 'image' }, { path: 'mediaUrl', label: 'Main Image or Video', type: 'image' }, { path: 'placeholderLabel', label: 'Image Description' }, { path: 'deliverables', label: 'Deliverables', type: 'list' }, { path: 'visible', label: 'Show Project', type: 'toggle' }] } },
    ],
  },
  contact: {
    title: 'Contact Page', route: '/contact', description: 'Manage contact copy, form language, response promise and FAQs.', sections: [
      { key: 'hero', title: 'Page Introduction', description: 'The contact-page opening heading and description.', visibilityPath: 'content.sectionVisibility.hero', fields: [{ path: 'content.heading', label: 'Heading', type: 'textarea' }, { path: 'content.introduction', label: 'Introduction', type: 'textarea' }] },
      { key: 'form', title: 'Enquiry Form', description: 'Form heading, helper text, labels, placeholders and button copy.', visibilityPath: 'content.sectionVisibility.form', fields: [{ path: 'content.formHeading', label: 'Form Heading' }, { path: 'content.formDescription', label: 'Form Description', type: 'textarea' }, { path: 'content.form.nameLabel', label: 'Name Label' }, { path: 'content.form.namePlaceholder', label: 'Name Placeholder' }, { path: 'content.form.emailLabel', label: 'Email Label' }, { path: 'content.form.emailPlaceholder', label: 'Email Placeholder' }, { path: 'content.form.phoneLabel', label: 'Phone Label' }, { path: 'content.form.phonePlaceholder', label: 'Phone Placeholder' }, { path: 'content.form.serviceLabel', label: 'Project Type Label' }, { path: 'content.form.budgetLabel', label: 'Budget Label' }, { path: 'content.form.timelineLabel', label: 'Timeline Label' }, { path: 'content.form.messageLabel', label: 'Message Label' }, { path: 'content.form.messagePlaceholder', label: 'Message Placeholder', type: 'textarea' }, { path: 'content.form.submitText', label: 'Submit Button Text' }, { path: 'content.form.responseNote', label: 'Response Note' }] },
      { key: 'contactDetails', title: 'Contact Details Section', description: 'Section heading and response promise; phone and email are global.', fields: [{ path: 'content.contactsHeading', label: 'Section Heading' }, { path: 'content.responseLabel', label: 'Response Label' }, { path: 'content.responseTime', label: 'Response Message', type: 'textarea' }] },
      { key: 'faqs', title: 'Frequently Asked Questions', description: 'Edit the Contact page heading and every FAQ question and answer.', visibilityPath: 'content.sectionVisibility.faqs', fields: [{ path: 'content.faqEyebrow', label: 'Small Label' }, { path: 'content.faqHeading', label: 'Heading' }], repeater: { path: 'faqs', itemName: 'FAQ', titlePath: 'q', fields: [{ path: 'q', label: 'Question' }, { path: 'a', label: 'Answer', type: 'textarea' }, { path: 'visible', label: 'Show FAQ', type: 'toggle' }] } },
    ],
  },
  global: {
    title: 'Header & Footer', route: '/', description: 'Manage site identity, navigation, business information and footer copy.', sections: [
      { key: 'identity', title: 'Site Identity', description: 'Logo and brand labels shown across the website.', fields: [{ path: 'content.logo', label: 'Logo', type: 'image', help: 'Transparent PNG or SVG recommended.' }, { path: 'content.brandLabel', label: 'Short Brand Label' }, { path: 'content.brandLocation', label: 'Brand Location Label' }, { path: 'studioInfo.brandName', label: 'Business Name' }, { path: 'studioInfo.tagline', label: 'Tagline' }] },
      { key: 'business', title: 'Business Information', description: 'Shared contact details used throughout the website.', fields: [{ path: 'studioInfo.founder', label: 'Founder Name' }, { path: 'studioInfo.experience', label: 'Experience' }, { path: 'studioInfo.founderBio', label: 'Founder Story', type: 'textarea' }, { path: 'studioInfo.email', label: 'Email Address' }, { path: 'studioInfo.phoneUK', label: 'UK Phone' }, { path: 'studioInfo.phoneIndia', label: 'India Phone' }, { path: 'studioInfo.registeredOffice', label: 'Registered Office', type: 'textarea' }, { path: 'studioInfo.locationUK', label: 'UK Location' }, { path: 'studioInfo.locationIndia', label: 'India Location' }] },
      { key: 'social', title: 'Social Media', description: 'Public profile destinations; icons are handled automatically.', fields: [{ path: 'studioInfo.socials.instagram', label: 'Instagram', type: 'url' }, { path: 'studioInfo.socials.linkedin', label: 'LinkedIn', type: 'url' }, { path: 'studioInfo.socials.behance', label: 'Behance', type: 'url' }, { path: 'studioInfo.socials.dribbble', label: 'Dribbble', type: 'url' }] },
      { key: 'header', title: 'Header Content', description: 'Edit the top-menu links, services dropdown, button, and mobile-menu wording. Service and footer links are not shown here.', fields: [{ path: 'content.servicesMenuLabel', label: 'Services Dropdown Label' }, { path: 'content.servicesMenuAllText', label: 'View All Services Link Text' }, { path: 'content.startProjectText', label: 'Start Project Button Text' }, { path: 'content.mobilePhoneLabel', label: 'Mobile Phone Label' }], repeater: { path: 'navigation', itemName: 'Header Menu Link', titlePath: 'label', filter: { path: 'location', value: 'header' }, fields: [{ path: 'label', label: 'Menu Label' }, { path: 'url', label: 'Destination', type: 'url' }, { path: 'visible', label: 'Show Link', type: 'toggle' }] } },
      { key: 'footer', title: 'Footer', description: 'Footer introduction, headings and legal text.', fields: [{ path: 'content.footerDescription', label: 'Description', type: 'textarea' }, { path: 'content.availabilityText', label: 'Availability Message' }, { path: 'content.studioLinksHeading', label: 'Studio Links Heading' }, { path: 'content.disciplinesLinksHeading', label: 'Disciplines Links Heading' }, { path: 'content.contactHeading', label: 'Contact Heading' }, { path: 'content.copyrightText', label: 'Copyright Text' }, { path: 'content.footerLocationText', label: 'Footer Location' }, { path: 'content.footerRegistrationText', label: 'Registration Text' }] },
      ...sharedCollectionSections(),
    ],
  },
};

const clone = <T,>(value: T): T => structuredClone(value);
const merge = (base: Record<string, unknown>, value: unknown) => ({ ...clone(base), ...(value && typeof value === 'object' && !Array.isArray(value) ? clone(value as Record<string, unknown>) : {}) });
const collection = (value: unknown, fallback: unknown[]) => Array.isArray(value) && value.length ? clone(value) : clone(fallback);
const hydrateAboutContent = (value: unknown): Record<string, unknown> => {
  const content = merge(ABOUT_CONTENT, value);
  if (Array.isArray(content.tools)) {
    content.tools = content.tools.map((tool, index) => ({ iconName: ABOUT_CONTENT.tools[index]?.iconName || 'PenTool', ...(tool as Record<string, unknown>) }));
  }
  return content;
};

export function hydrateCmsDocument(key: string, source: Record<string, unknown>): Record<string, unknown> {
  const value = clone(source || {});
  if (key === 'home') return { ...value, content: merge(HOME_CONTENT, value.content), stats: Array.isArray(value.stats) && value.stats.length ? value.stats : clone(STATS), reviews: Array.isArray(value.reviews) && value.reviews.length ? value.reviews : clone(CLIENT_REVIEWS), testimonial: merge(TESTIMONIAL as unknown as Record<string, unknown>, value.testimonial) };
  if (key === 'about') return { ...value, content: hydrateAboutContent(value.content), studioInfo: merge(STUDIO_INFO as unknown as Record<string, unknown>, value.studioInfo), process: Array.isArray(value.process) && value.process.length ? value.process : clone(CREATIVE_PROCESS), team: Array.isArray(value.team) && value.team.length ? value.team : clone(PRODUCTION_TEAM) };
  if (key === 'services') return { ...value, content: merge(SERVICES_CONTENT, value.content), items: (Array.isArray(value.items) && value.items.length ? value.items : clone(CORE_SERVICES)).map((item: Record<string, unknown>) => ({ visible: true, ...item })) };
  if (key === 'portfolio') return { ...value, content: merge(PORTFOLIO_CONTENT, value.content), categories: Array.isArray(value.categories) && value.categories.length ? value.categories : clone(PORTFOLIO_CATEGORIES), items: (Array.isArray(value.items) && value.items.length ? value.items : clone(PORTFOLIO_ITEMS)).map((item: Record<string, unknown>) => ({ visible: true, ...item })) };
  if (key === 'contact') return { ...value, content: merge(CONTACT_CONTENT, value.content), faqs: (Array.isArray(value.faqs) && value.faqs.length ? value.faqs : clone(FAQS)).map((item: Record<string, unknown>) => ({ visible: true, ...item })) };
  if (key === 'global') {
    const collections = value.collections && typeof value.collections === 'object' && !Array.isArray(value.collections) ? value.collections as Record<string, unknown> : {};
    return { ...value, studioInfo: merge(STUDIO_INFO as unknown as Record<string, unknown>, value.studioInfo), content: merge(GLOBAL_CONTENT, value.content), navigation: Array.isArray(value.navigation) && value.navigation.length ? value.navigation : clone(NAVIGATION_ITEMS), collections: {
      services: collection(collections.services, CORE_SERVICES),
      testimonials: collection(collections.testimonials, CLIENT_REVIEWS),
      faqs: collection(collections.faqs, FAQS),
      team: collection(collections.team, PRODUCTION_TEAM),
      stats: collection(collections.stats, STATS),
      categories: collection(collections.categories, ['Logo Design', 'Branding', 'Brochures & Posters', 'Business Cards', 'Magazine Layout', 'Photography', 'Reels / Motion']),
    } };
  }
  return value;
}
