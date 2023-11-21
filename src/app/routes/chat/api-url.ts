class CrmApi {
  constructor() {}
}

const CRM_API = new CrmApi();
export { CRM_API };

export interface User {
  name: string;
  username: string;
  email: string;
}
