export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  type: string;
  description: string;
  requirements: string[];
  skills: string[];
  experienceLevel: string;
  postedAt: string;
  applicationUrl: string;
  views: number;
  expiresAt?: string;
}

export interface JobFilters {
  search: string;
  jobType: string[];
  experienceLevel: string[];
  location: string;
  salaryRange: [number, number];
  skills: string[];
  remote: boolean;
}

export interface Location {
  id: string;
  name: string;
}

export interface LocationGroup {
  name: string;
  locations: Location[];
}

export interface ApiResponse<T> {
  data: T;
  meta: {
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
  };
}