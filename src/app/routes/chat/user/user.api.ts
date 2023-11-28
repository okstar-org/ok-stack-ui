import { OkApi } from '@shared/api/ok';

export interface User {
  name: string;
  username: string;
  email: string;
}

export interface ChatGeneral {
  contacts: number;
  msgs: number;
  groups: number;
}

export interface ChatRostItem {
  jid: string;

  nickname: string;

  /**
   * SubType
   * * Indicates the roster item should be removed.
   * REMOVE(-1),
   * No subscription is established.
   * NONE(0),
   * * The roster owner has a subscription to the roster item's presence.
   * TO(1),
   * * The roster item has a subscription to the roster owner's presence.
   * FROM(2),
   * * The roster item and owner have a mutual subscription.
   * BOTH(3);
   */
  subscriptionType: number;

  groups: string[];
}

class Api implements OkApi {
  params = '/api/portal/app-crm/customer/params';
  page = '/api/chat/user/findAll';
  top = '/api/portal/app-crm/customer/page/top';
  export = '/api/portal/app-crm/customer/export';
  importBegin = '/api/portal/app-crm/customer/import/begin';
  importAdd = '/api/portal/app-crm/customer/import/add';
  importCommit = '/api/portal/app-crm/customer/import/commit';
  save = '/api/portal/app-crm/customer/save';
  update = '';
  deleteById = '/api/portal/app-crm/customer/deleteById/';
  findById = '/api/chat/user/findByUsername/';
  findGeneralInfo = '/api/chat/user/findGeneralByUsername/';
  findContacts = '/api/chat/user/findRosterByUsername/';
}

const api = new Api();

export { api };
