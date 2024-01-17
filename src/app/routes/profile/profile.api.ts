import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  params = '';
  page = '/api/sys/profile/findAll';
  save = '/api/sys/profile/save';
  deleteById = '/api/sys/profile/deleteById/';
  findById = '/api/sys/profile';
  update = '/api/sys/profile';
  top = '';
  export = '';
  updatePassword = '/api/auth/password/update';
}

const api = new Api();
export { api };

export interface PasswordUpdateForm {
  username: string;
  newPassword: string;
  confirmPassword: string;
}
