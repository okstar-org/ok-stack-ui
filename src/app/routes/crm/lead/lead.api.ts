import { OkApi, OkPageApi } from './../../../shared/api/ok';

class Api implements OkApi {
  params = '/api/portal/app-crm/lead/params';
  page = '/api/portal/app-crm/lead/page';
  top = '/api/portal/app-crm/lead/page/top';
  export = '/api/portal/app-crm/lead/export';
  importBegin = '/api/portal/app-crm/lead/import/begin';
  importAdd = '/api/portal/app-crm/lead/import/add';
  importCommit = '/api/portal/app-crm/lead/import/commit';
  save = '/api/portal/app-crm/lead/save';
  deleteById = '/api/portal/app-crm/lead/deleteById/';
  findById = '/api/portal/app-crm/lead/findById/';
  form = '/api/portal/app-crm/lead/form';
}

const api = new Api();
export { api };


class InfoApi implements OkApi {
  page = 'string';
  findById = '/api/portal/app-crm/lead/detail/info/findById/';
}

const infoApi = new InfoApi();
export { OkPageApi, infoApi };

class FollowApi implements OkApi {
  findById = '/api/portal/app-crm/lead/detail/follow-up/page';
  page = '/api/portal/app-crm/lead/detail/follow-up/page';
}

const followApi = new FollowApi();
export { followApi };

class TaskApi implements OkApi {
  findById = '/api/portal/app-crm/lead/detail/task/findById';
  page = '/api/portal/app-crm/lead/detail/task/page';
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
  source: string;
  status: string;
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
