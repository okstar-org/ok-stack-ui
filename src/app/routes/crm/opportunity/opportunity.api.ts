import { OkApi } from '../../../shared/api/ok';

class OpportunityApi implements OkApi {
  params = '/api/portal/app-crm/opportunity/params';
  page = '/api/portal/app-crm/opportunity/page';
  top = '/api/portal/app-crm/opportunity/page/top';
  export = '/api/portal/app-crm/opportunity/export';
  importBegin = '/api/portal/app-crm/opportunity/import/begin';
  importAdd = '/api/portal/app-crm/opportunity/import/add';
  importCommit = '/api/portal/app-crm/opportunity/import/commit';
  save = '/api/portal/app-crm/opportunity/save';
  deleteById = '/api/portal/app-crm/opportunity/deleteById/';
  findById = '/api/portal/app-crm/opportunity/findById/';

  detail = {
    findById: '/api/portal/app-crm/opportunity/detail/findById/',
  };
}

const opportunityApi = new OpportunityApi();

export { opportunityApi };
