import { OkApi } from './../../../shared/api/ok';

class LeadApi implements OkApi {
  params: string;
  page: string;
  top: string;
  export: string;
  importBegin: string;
  importCommit: string;
  save: string;
  deleteById: string;
  findById: string;

  detail = {
    findById: '/api/portal/app-crm/saleslead/detail/findById/',
    findBySn: '/api/portal/app-crm/saleslead/detail/findBySn/',
    info: {
      findById: '/api/portal/app-crm/saleslead/detail/info/findById/',
    },
  };
}

const leadApi = new LeadApi();

export { leadApi };

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
