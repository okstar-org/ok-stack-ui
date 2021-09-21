enum ConnType {
  WX = 'WX',
  DT = 'DT',
  FS = 'FS',
}

export { ConnType };

export class AppInfo {
  id: string;
  name: string;
  certKey: string;
  certSecret: string;
  type: ConnType;
}
