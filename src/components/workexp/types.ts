export interface Track {
  id: string;
  title: string;
  description: string;
  image: string;
  skills: string[];
  duration: string;
  badgeColor: string;
}

export interface Pillar {
  number: string;
  name: string;
  bg: string;
  textColor?: string;
  badgeBg?: string;
  description: string;
  detail?: string;
}

export interface FAQItem {
  q: string;
  a: string;
}
