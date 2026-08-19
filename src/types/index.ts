export interface ServiceSubOffer {
  number: string;
  title: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  heroHeadlineTop?: string;
  heroHeadlineMain?: string;
  description: string;
  deliverables: string[];
  whatWeOffer?: ServiceSubOffer[];
  idealFor: string;
  accent?: string;
  iconName: string;
  image?: string;
  imageAlt?: string;
}

export interface StatItem {
  number: string;
  value: string;
  label: string;
  description: string;
  isConfirmed: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Logo Design' | 'Branding' | 'Brochures & Posters' | 'Business Cards' | 'Magazine Layout' | 'Photography';
  client?: string;
  year: string;
  aspectRatio: 'square' | 'portrait' | 'landscape';
  description: string;
  deliverables: string[];
  placeholderLabel: string;
  imagePlaceholderColor: string;
  imageUrl?: string;
}

export interface TestimonialItem {
  quote: string;
  attribution: string;
  role: string;
  noteForClient: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface StudioInfo {
  brandName: string;
  tagline: string;
  founder: string;
  experience: string;
  founderBio: string;
  email: string;
  phoneUK: string;
  phoneIndia: string;
  registeredOffice: string;
  locationUK: string;
  locationIndia: string;
  socials: {
    instagram: string;
    linkedin: string;
    behance: string;
    dribbble: string;
  };
}
