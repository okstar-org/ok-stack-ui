import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddComponent } from './dialog-add.component';

describe('DialogAddComponent', () => {
  let component: DialogAddComponent;
  let fixture: ComponentFixture<DialogAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddComponent],
    });
    fixture = TestBed.createComponent(DialogAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
