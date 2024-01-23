import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermComponent } from './perm.component';

describe('PermComponent', () => {
  let component: PermComponent;
  let fixture: ComponentFixture<PermComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PermComponent],
    });
    fixture = TestBed.createComponent(PermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
