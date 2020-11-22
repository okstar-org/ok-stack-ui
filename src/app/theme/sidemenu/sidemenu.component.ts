import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MenuService } from '@core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidemenuComponent {
  // NOTE: Ripple effect make page flashing on mobile
  @Input() ripple = false;

  menus = this.menuSrv.getAll();
  buildRoute = this.menuSrv.buildRoute;

  constructor(private menuSrv: MenuService) {}
}
