import { OkApi, OkPageApi } from '@shared/api/ok';

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

class Api implements OkPageApi {
  params = '';
  page = '/api/chat/room/findAll';
  update = '/api/chat/room/update';
  save = '/api/chat/room/save';
  deleteById = '/api/chat/room/deleteById/';
  findById = '/api/chat/room/findByName/';
  findParticipants = '/api/chat/room/findParticipantsByName/';
  top = '';
  export = '';
}

const api = new Api();

export { api };
