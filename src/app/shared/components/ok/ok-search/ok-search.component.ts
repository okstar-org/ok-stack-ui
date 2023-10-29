import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

enum Type {
  input,
  select,
  date,
  checkbox,
}

@Component({
  selector: 'app-ok-search',
  templateUrl: './ok-search.component.html',
  styleUrls: ['./ok-search.component.scss'],
})
export class OkSearchComponent implements OnInit {
  @Input() controls: {
    type: 'input' | 'select' | 'date' | 'checkbox';
    name: string;
    placeholder?: string;
    label?: string;

    [k: string]: any;
  }[] = [];

  @Input() formGroup = new FormGroup({});

  constructor() {}

  ngOnInit() {}
}
