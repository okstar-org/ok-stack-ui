import { OkApi } from '../../../shared/api/ok';

class ContactApi implements OkApi {
  params = '/api/portal/app-crm/contact/params';
  page = '/api/portal/app-crm/contact/page';
  top = '/api/portal/app-crm/contact/page/top';
  export = '/api/portal/app-crm/contact/export';
  importBegin = '/api/portal/app-crm/contact/import/begin';
  importAdd = '/api/portal/app-crm/contact/import/add';
  importCommit = '/api/portal/app-crm/contact/import/commit';
  save = '/api/portal/app-crm/contact/save';
  deleteById = '/api/portal/app-crm/contact/deleteById/';
  findById = '/api/portal/app-crm/contact/findById/';

  detail = {
    findById: '/api/portal/app-crm/contact/detail/findById/',
  };
}

const contactApi = new ContactApi();

export { contactApi };
