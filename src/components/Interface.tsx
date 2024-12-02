export interface Student {
  id: number;
  name: string;
  skills: string[];
  professionalPage: string;
  profileImage: string;
  location: string;
}

export interface Company {
  id: number;
  name: string;
  overview: string;
  location: string;
  links: string | string[];
  emails: string | string[];
  positions: Position[];
}

export interface Position {
  id: number;
  title: string;
  description: string;
  skills: string | string[];
  jobType: string | string[];
  numberOfHires: number;
  salaryRange: number;
}
