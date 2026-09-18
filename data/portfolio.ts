export type PortfolioCategory = 'insulation' | 'painting';

export interface PortfolioItem {
  id: string;
  category: PortfolioCategory;
  beforeImage: string;
  afterImage: string;
  location: string;
  featured: boolean;
  title: {
    el: string;
    en: string;
  };
  description: {
    el: string;
    en: string;
  };
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'basement-waterproofing',
    category: 'insulation',
    beforeImage: '/images/portfolio/basement-waterproofing-before.svg',
    afterImage: '/images/portfolio/basement-waterproofing-after.svg',
    location: 'Χαλάνδρι',
    featured: true,
    title: {
      el: 'Στεγανοποίηση Υπογείου',
      en: 'Basement Waterproofing',
    },
    description: {
      el: 'Οριστική αντιμετώπιση ανερχόμενης υγρασίας σε υπόγειο κατοικίας με στεγανωτικά τσιμεντοειδή επιχρίσματα.',
      en: 'Permanent treatment of rising damp in a residential basement using cementitious waterproofing coatings.',
    },
  },
  {
    id: 'roof-insulation',
    category: 'insulation',
    beforeImage: '/images/portfolio/roof-insulation-before.svg',
    afterImage: '/images/portfolio/roof-insulation-after.svg',
    location: 'Γλυφάδα',
    featured: true,
    title: {
      el: 'Θερμομόνωση & Στεγανοποίηση Ταράτσας',
      en: 'Roof Thermal Insulation & Waterproofing',
    },
    description: {
      el: 'Πλήρης στεγανοποίηση δώματος με ελαστομερείς ασφαλτικές μεμβράνες και θερμομονωτικά φύλλα.',
      en: 'Complete roof waterproofing with elastomeric bituminous membranes and thermal insulation boards.',
    },
  },
  {
    id: 'facade-painting',
    category: 'painting',
    beforeImage: '/images/portfolio/facade-painting-before.svg',
    afterImage: '/images/portfolio/facade-painting-after.svg',
    location: 'Μαρούσι',
    featured: true,
    title: {
      el: 'Ανακαίνιση Πρόσοψης Πολυκατοικίας',
      en: 'Apartment Building Facade Renovation',
    },
    description: {
      el: 'Πλήρης βαφή εξωτερικής πρόσοψης με σιλικονούχα χρώματα ανθεκτικά στις καιρικές συνθήκες.',
      en: 'Complete exterior facade painting with weather-resistant silicone-based paints.',
    },
  },
  {
    id: 'interior-painting',
    category: 'painting',
    beforeImage: '/images/portfolio/interior-painting-before.svg',
    afterImage: '/images/portfolio/interior-painting-after.svg',
    location: 'Κηφισιά',
    featured: false,
    title: {
      el: 'Ανακαίνιση Εσωτερικών Χώρων',
      en: 'Interior Space Renovation',
    },
    description: {
      el: 'Πλήρης ανακαίνιση με στοκαρίσματα, αστάρια και οικολογικά χρώματα σε διαμέρισμα 90τμ.',
      en: 'Full renovation with filling, priming and eco-friendly paints in a 90sqm apartment.',
    },
  },
];

export function getFeaturedPortfolioItems(limit = 3): PortfolioItem[] {
  return portfolioItems.filter((item) => item.featured).slice(0, limit);
}

export function getPortfolioItemsByCategory(category?: PortfolioCategory): PortfolioItem[] {
  if (!category) return portfolioItems;
  return portfolioItems.filter((item) => item.category === category);
}
