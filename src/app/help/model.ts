
export interface HelpItem {
  question: string;
  answer: string;
}

export interface HelpSection {
  title: string,
  description: string,
  items: HelpItem[];
}
