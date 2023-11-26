import { OkApi } from '@shared/api/ok';

export interface User {
  name: string;
  username: string;
  email: string;
}

export interface ChatRoom {
  naturalName: string;
  roomName: string;
  subject: string;
  description: string;
  password: string;
  //"owners":["okstar@meet.chuanshaninfo.com"]
  owners: string[];
  //最大成员数量
  maxUsers: number;
  //成员数量
  members: number;
  //是否公开
  publicRoom: boolean;
  //持久化房间（保存到数据库）
  persistent: boolean;
  canChangeNickname: boolean;
  canOccupantsChangeSubject: boolean;
  canOccupantsInvite: boolean;
  logEnabled: boolean;
  creationDate: Date;
  modificationDate: Date;
}

export interface ChatParticipant {
  jid: string;
  role: string;
  affiliation: string;
}

class Api implements OkApi {
  params = '/api/portal/app-crm/customer/params';
  page = '/api/chat/room/findAll';
  top = '/api/portal/app-crm/customer/page/top';
  export = '/api/portal/app-crm/customer/export';
  importBegin = '/api/portal/app-crm/customer/import/begin';
  importAdd = '/api/portal/app-crm/customer/import/add';
  importCommit = '/api/portal/app-crm/customer/import/commit';
  save = '/api/portal/app-crm/customer/save';
  deleteById = '/api/portal/app-crm/customer/deleteById/';
  findById = '/api/chat/room/findByName/';
  findParticipants = '/api/chat/room/findParticipantsByName/';
}

const api = new Api();

export { api };
