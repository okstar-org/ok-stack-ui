import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { CRM_API } from 'app/routes/crm/api-url';
import { OkFormResult, OkFormField, ID } from '@shared/api/ok';
import { AddService } from './add.service';

@Component({
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  emitter = new EventEmitter<void>();

  id: ID;
  formGroup: FormGroup;
  fields: OkFormField[] = [];
  names: string[] = [];

  params = { select: { status: [] } };

  constructor(
    private logger: NGXLogger,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: OkFormResult,
    private service: AddService
  ) {
    this.logger.info('formGroup:', this.data);

    this.id = { id: this.data.id, version: this.data.version };

    this.fields = this.data.fields;
    this.names = this.data.names;
    this.formGroup = this.fb.group(this.data.controlsConfig);
    // for(const k in this.formGroup.controls) {
    //   this.formGroup.get(k).setValidators(Validators.required);
    //   console.log('formGroup=>', k, this.formGroup.get(k));
    // };

    this.fields.forEach(field => {
      const required = field.validations.Required;
      if (required) {
        this.formGroup.get(field.name)?.setValidators(Validators.required);
      }
    });
  }

  ngOnInit(): void {
    this.service.params(CRM_API.lead.params).subscribe(r => {
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
    if (!this.formGroup.valid) {
      return;
    }

    const data = { ...this.formGroup.value, ...this.id };
    this.logger.debug('save', data);

    this.service.save(data).subscribe(r => {
      this.logger.debug('==>', r);
      this.emitter.emit();
    });
  }
}
