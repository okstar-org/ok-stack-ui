import { OkFormResult, OkFormControl } from './../../../../../shared/api/ok';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddService } from './add.service';
import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { CRM_API } from 'app/routes/crm/api-url';
import { Form } from '../../lead.api';

@Component({
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  emitter = new EventEmitter<void>();

  formGroup: FormGroup;
  fields : OkFormControl[] = [];

  params = { select: { status: [] } };

  constructor(
    private logger: NGXLogger,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: OkFormResult,
    private service: AddService
  ) {
    this.logger.debug('formGroup:', this.data);

    this.formGroup = this.fb.group(this.data.controlsConfig);
    for(const k in this.formGroup.controls) {
      console.log('formGroup=>', k, this.formGroup.get(k).value);
    };

    this.fields = this.data.fields;

  }

  ngOnInit(): void {


    this.service.params(CRM_API.lead.params)
    .subscribe((r: { data: any }) => {
      this.params = r.data;
    });
  }

  get statusSelect(): { name: string; text: string }[] {
    if (!this.params.select) {
      return [];
    }
    return this.params.select.status;
  }

  get isCreateFollowUpTask() {
    return this.formGroup.get('isCreateFollowUpTask');
  }

  doSave() {
    this.logger.debug('save', this.formGroup.value);
    if (!this.formGroup.valid) {
      return false;
    }

    this.service.save(this.formGroup.value).subscribe(r => {
      this.logger.debug('==>', r);
      this.emitter.emit();
    });
  }
}
