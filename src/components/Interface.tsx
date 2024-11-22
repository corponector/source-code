export interface Student {
  id: number;
  name: string;
  skills: string[];
  professionalPage: string;
  location: string;
  email: string;
}

export interface Company {
  id: number;
  name: string;
  overview: string;
  location: string;
  links: string[];
  emails: string[];
}
