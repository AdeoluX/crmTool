export interface IsignIn {
  email: string;
  password: string;
}

export interface IsignUp {
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  companyName: string;
  plan?: string;
}

export interface IactivateCompany {
  activateId: string;
  password: string
}
export interface ServiceRes {
  success: boolean;
  message?: string;
  token?: string;
  options?: any;
  data?: any
}
export interface AuthPayload {
  id: string;
  email: string;
  status: string;
  iat?: number;
}
export interface IPaginate{
  limit: number;
  offset: number;
}

export interface Ipagination {
  page: number;
  perPage: number;
  skip: number;
}

export interface IdateFilter {
  startDate: Date;
  endDate: Date;
}

export interface IQuerySearch {
  search: string;
  status?: string; 
}

export interface IQuery extends Ipagination, IdateFilter, IQuerySearch {}

export interface ICreateTeam {
  name?: string;
  coach?: string;
}

export interface ICreateFixture{
  awayTeam: string;
  homeTeam: string;
  kickOffTime: Date;
  awayTeamGoals?: number;
  homeTeamGoals?: number;
}