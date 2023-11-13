import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingComponent } from './employed.component';

describe('PendingComponent', () => {
  let component: PendingComponent;
  let fixture: ComponentFixture<PendingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingComponent],
    });
    fixture = TestBed.createComponent(PendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
