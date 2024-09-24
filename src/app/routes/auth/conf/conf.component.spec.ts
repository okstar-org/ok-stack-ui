import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfComponent } from './conf.component';

describe('ConfComponent', () => {
  let component: ConfComponent;
  let fixture: ComponentFixture<ConfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfComponent],
    });
    fixture = TestBed.createComponent(ConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
