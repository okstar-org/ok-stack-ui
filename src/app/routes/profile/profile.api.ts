import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  params = '';
  page = '/api/chat/room/findAll';
  update = '/api/chat/room/update';
  save = '/api/chat/room/save';
  deleteById = '/api/chat/room/deleteById/';
  findById = '/api/sys/profile';
  findParticipants = '/api/chat/room/findParticipantsByName/';
  top = '';
  export = '';
}

const api = new Api();
export { api };
