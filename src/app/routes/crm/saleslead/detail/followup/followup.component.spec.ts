/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FollowupComponent } from './followup.component';

describe('FollowupComponent', () => {
  let component: FollowupComponent;
  let fixture: ComponentFixture<FollowupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FollowupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
