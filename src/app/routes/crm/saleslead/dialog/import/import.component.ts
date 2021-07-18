import { ImportService } from './import.service';
import { NGXLogger } from 'ngx-logger';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter } from '@angular/core';
import * as XLSX from 'xlsx';
import { DTO, Status } from './import.model';
import { ReturnStatement } from '@angular/compiler';

@Component({
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent implements OnInit {
  emitter = new EventEmitter<void>();

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  processed = 0;

  max = 3000;
  files = [];

  data: DTO[];
  displayedColumns: string[] = [
    '客户名称',
    '联系人姓名',
    '手机号码',
    '固定电话',
    '邮箱',
    '线索来源',
    '线索状态',
    '备注',
  ];
  status: Status;
  interval: any;

  constructor(
    private logger: NGXLogger,
    private formBuilder: FormBuilder,
    private service: ImportService
  ) {}

  ngOnInit() {}

  clear() {
    this.data = null;
  }

  doImport() {
    if (!(this.data && this.data.length)) {
      return;
    }

    if (this.isUploading()) {
      return;
    }

    this.status = Status.UPLOADING;

    this.service.importBegin().subscribe(r => {
      this.logger.info('begin', r);
    });

    this.interval = window.setTimeout(() => {
      this.addHandler();
    }, 100);
  }

  addHandler() {
    const row = this.data[this.processed];
    if (!row) {
      return;
    }

    this.service
      .importAdd(row)
      .pipe(r => {
        row._isUploaded = true;
        this.processed += 1;

        return r;
      })
      .subscribe(r => {
        this.logger.info('add {}=>{}', row, r);

        if (this.isCanceled()) {
          return;
        }

        this.interval = window.setTimeout(() => {
          this.addHandler();
        }, 100);

        if (this.processed >= this.data.length) {
          this.status = Status.FINISHED;
          this.doSubmit();
        }
      });
  }

  doCancel() {
    this.status = Status.CANCELED;
  }

  doSubmit() {
    this.status = Status.SUBMITING;
    this.service.importCommit().subscribe(r => {
      this.logger.info('doSubmit', r);
      this.status = Status.COMPLETED;
      this.emitter.emit();
    });
  }

  updateFile($event) {
    console.log('updateFile', $event);

    const target: DataTransfer = $event.target as DataTransfer;
    if (target.files.length < 1) {
      this.clear();
      return;
    }

    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }

    const file = target.files[0];
    this.logger.info('file:{}', file);

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const buf = JSON.stringify(XLSX.utils.sheet_to_json(ws));
      // console.log('buf', buf);

      this.data = JSON.parse(buf);
      // console.log(this.data);
      this.status = Status.READY;
      this.processed = 0;
    };
    reader.readAsBinaryString(file);
  }

  isReady() {
    return this.status === Status.READY;
  }

  isUploading() {
    return this.status === Status.UPLOADING;
  }

  isFinished() {
    return this.status === Status.FINISHED;
  }

  isSubmiting() {
    return this.status === Status.SUBMITING;
  }

  isCompleted() {
    return this.status === Status.COMPLETED;
  }

  isCanceled() {
    return this.status === Status.CANCELED;
  }

  canUpload() {
    return this.status !== Status.UPLOADING;
  }
}
