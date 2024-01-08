import { TestBed } from '@angular/core/testing';

import { AppmgtService } from './appmgt.service';

describe('AppmgtService', () => {
  let service: AppmgtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppmgtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
