import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesleadComponent } from './saleslead.component';

describe('SalesleadComponent', () => {
  let component: SalesleadComponent;
  let fixture: ComponentFixture<SalesleadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesleadComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesleadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
