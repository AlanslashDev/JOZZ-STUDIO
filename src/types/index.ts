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

export type PortfolioCategory =
  | 'Logo Design'
  | 'Branding'
  | 'Brochures & Posters'
  | 'Business Cards'
  | 'Magazine Layout'
  | 'Photography'
  | 'Reels / Motion';

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  type?: 'image' | 'video';
  thumbnail?: string; // used as grid preview + video poster
  mediaUrl?: string; // image src OR video src (.mp4) OR embed URL (Instagram/YouTube)
  isEmbed?: boolean; // true if mediaUrl is an external embed link, not a raw file
  client?: string;
  year: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'vertical';
  description: string;
  deliverables: string[];
  placeholderLabel?: string;
  imagePlaceholderColor?: string;
  imageUrl?: string; // backwards compatibility
}

export interface TestimonialItem {
  quote: string;
  attribution: string;
  role: string;
  company?: string;
  rating?: number;
  avatar?: string;
  noteForClient?: string;
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

export interface TeamMember {
  name: string;
  role?: string;
  image: string;
}
