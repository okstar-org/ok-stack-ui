import { OkApi, OkPageApi } from './../../../shared/api/ok';

class InfoApi implements OkApi {
  page = 'string';
  findById = '/api/portal/app-crm/saleslead/detail/info/findById/';
}

const infoApi = new InfoApi();
export { infoApi };

class FollowApi implements OkApi {
  findById = '/api/portal/app-crm/saleslead/detail/followUp/page';
  page = '/api/portal/app-crm/saleslead/detail/followUp/page';
}

const followApi = new FollowApi();
export { followApi };

class TaskApi implements OkApi {
  findById = '/api/portal/app-crm/saleslead/detail/task/findById';
  page = '/api/portal/app-crm/saleslead/detail/task/page';
}

const taskApi = new TaskApi();
export { taskApi };

enum CustomerStateEnum {
  AlreadyPurchased,
  FollowingUp,
  OnTrial,
  PutItOnHold,
  ReadyToBuy,
  Understanding,
}

enum LeadStateEnum {
  InitialIntention,
  IsCustomer,
  NextInvite,
}

export interface ENTITY {
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DTO extends ENTITY {
  customerName: any;
  contactName: any;
  isCreateFollowUpTask: boolean;
  customerState: CustomerStateEnum;
  avatar: string;
  faxPhone: any;
  landPhone: any;
  mobilePhone: any;
  leadFrom: string;
  leadState: string;
  nextFollowUpTime: Date;
  lastFollowUpTime: Date;
  note: string;
  owner: string;
  ownerName: string;
  unFollowUpDays: number;
  mail: string;
  role?: string;
  position?: string;
  honorificTitle?: string;
}

export interface Form extends DTO {
  mail: any;
}

export interface SN {
  sn: string;
}

export interface LeadDTO extends DTO, SN {}
