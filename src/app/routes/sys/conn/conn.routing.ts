import { FsComponent } from './fs/fs.component';
import { DtComponent } from './dt/dt.component';
import { WxComponent } from './wx/wx.component';
import { Routes, RouterModule } from '@angular/router';
import { ConnComponent } from './conn.component';

const routes: Routes = [
  {
    path: '',
    component: ConnComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'wx',
      },
      {
        path: 'wx',
        component: WxComponent,
      },
      {
        path: 'dt',
        component: DtComponent,
      },
      {
        path: 'fs',
        component: FsComponent,
      },
    ],
  },
];

export const connRoutes = RouterModule.forChild(routes);
