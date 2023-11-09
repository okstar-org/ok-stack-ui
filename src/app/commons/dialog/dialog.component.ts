import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, Output } from '@angular/core';

export enum DialogType {
  INFO,
  WARN,
  ERROR,
}

export interface DialogData {
  // type: DialogType ;
  // title: string;
  content: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogComponent {}

@Component({
  selector: 'dialog-delete',
  templateUrl: 'dialog-delete.html',
  styleUrls: ['dialog-delete.scss'],
})
export class DialogDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
