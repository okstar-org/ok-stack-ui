import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { OkDetailComponent } from '@shared/components/ok/ok-detail.component';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent extends OkDetailComponent implements OnInit {
  id: string = '';
  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('chat.contact.name'),
      field: 'jid',
      sortable: true,
    },
    {
      header: this.translate.stream('chat.contact.role'),
      field: 'role',
      sortable: true,
    },
  ];

  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    private activedRoute: ActivatedRoute,
    protected cdr: ChangeDetectorRef,
    private translate: TranslateService,
    protected svc: ContactService
  ) {
    super(logger, fb, svc, {});
    this.activedRoute.parent?.params.subscribe(p => {
      this.id = p.id;
    });
  }

  ngOnInit() {
    this.svc.getParticipants(this.id).subscribe(r => {
      this.list = r;
      this.isLoading = false;
    });
  }
}
