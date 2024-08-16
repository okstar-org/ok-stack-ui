import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { DetailService } from '../detail/detail.service';
import { OrderResultEntity } from '../work.api';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss'],
})
export class PayComponent implements OnInit {
  url;

  constructor(
    @Inject(MAT_DIALOG_DATA) private result: OrderResultEntity,
    public dialogRef: MatDialogRef<PayComponent>,
    private sanitizer: DomSanitizer,
    private svc: DetailService
  ) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://cloud.okstar.org.cn/api' + result.url
    );
  }

  ngOnInit(): void {}

  onClose() {
    this.svc.close(this.result.no).subscribe(r => {
      if (r) {
        this.dialogRef.close();
      }
    });
  }
}
