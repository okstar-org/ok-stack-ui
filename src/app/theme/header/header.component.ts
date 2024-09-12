import { VERSION } from 'environments/version';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import screenfull from 'screenfull';

class Ver {
  branch!: string;
  time!: string;
  abbrev!: string;
  id!: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  @HostBinding('class') class = 'matero-header';

  @Input() showToggle = true;
  @Input() showBranding = false;

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleSidenavNotice = new EventEmitter<void>();

  ver: Ver = new Ver();
  uiVer: Ver = new Ver();

  constructor(private http: HttpClient) {
    this.uiVer.id = VERSION.raw;
    this.uiVer.abbrev = VERSION.tag;
    console.log(`UI version is: `, this.uiVer);
  }

  ngOnInit(): void {
    this.http.get('/api/sys/.well-known/git.json').subscribe(r => {
      if (!r) {
        return;
      }

      for (const k in r) {
        const v = (r as any)[k];
        if (k === 'git.branch') {
          this.ver.branch = v;
        } else if (k === 'git.build.time') {
          this.ver.time = v;
        } else if (k === 'git.commit.id') {
          this.ver.id = v;
        } else if (k === 'git.commit.id.abbrev') {
          this.ver.abbrev = v;
        }
      }

      console.log(`Backend version is:`, this.ver);
    });
  }

  toggleFullscreen() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }
}
