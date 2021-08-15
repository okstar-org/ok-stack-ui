import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { OkPaginatorComponent } from '@shared/components/ok/ok-paginator.component';
import { NGXLogger } from 'ngx-logger';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent extends OkPaginatorComponent implements OnInit {
  constructor(
    protected logger: NGXLogger,
    protected fb: FormBuilder,
    protected cdr: ChangeDetectorRef,
    private translate: TranslateService,
    protected svc: ContactService
  ) {
    super(fb, cdr, logger, svc, {
      keyword: '',
    });
  }

  ngOnInit() {}
}
