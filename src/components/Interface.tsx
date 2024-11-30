export interface Student {
  id: number;
  name: string;
  skills: string[];
  professionalPage: string;
  location: string;
}

export interface Company {
  id: number;
  name: string;
  overview: string;
  location: string;
  links: string;
  emails: string;
  positions: Position[];
}

export interface Position {
  id: number;
  title: string;
  description: string;
  skills: string[];
  jobType: string;
  numberOfHires: number;
  salaryRange: number;
}
