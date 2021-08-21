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

  addForm: FormGroup;
  params = { select: { status: [] } };

  constructor(
    private logger: NGXLogger,
    private fb: FormBuilder,
    private service: AddService,
    @Inject(MAT_DIALOG_DATA) public data: Form
  ) {
    this.logger.debug('data:', data);
    this.addForm = this.fb.group(data);
  }

  ngOnInit(): void {
    this.service.params(CRM_API.lead.params).subscribe((r: { data: any }) => {
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
    return this.addForm.get('isCreateFollowUpTask');
  }

  doSave() {
    this.logger.debug('save', this.addForm.value);
    if (!this.addForm.valid) {
      return false;
    }

    this.service.save(this.addForm.value).subscribe(r => {
      this.logger.debug('==>', r);
      this.emitter.emit();
    });
  }
}
