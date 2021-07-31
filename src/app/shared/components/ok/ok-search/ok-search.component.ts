import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

enum Type {
  input,
  select,
  date,
}

@Component({
  selector: 'app-ok-search',
  templateUrl: './ok-search.component.html',
  styleUrls: ['./ok-search.component.scss'],
})
export class OkSearchComponent implements OnInit {
  @Input() controls: {
    type: Type;
    name: string;
    placeholder?: string;
    label?: string;
  }[] = [];
  @Input() formGroup: FormGroup;

  constructor() {}

  ngOnInit() {}
}
