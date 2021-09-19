import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-dt',
  templateUrl: './dt.component.html',
  styleUrls: ['./dt.component.scss'],
})
export class DtComponent implements OnInit {
  addForm: FormGroup;

  constructor(private logger: NGXLogger, private fb: FormBuilder) {
    this.addForm = this.fb.group({
      name: [''],
      agentId: ['', [Validators.required]],
      appKey: ['', [Validators.required]],
      appSecret: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  onSave() {}
}
