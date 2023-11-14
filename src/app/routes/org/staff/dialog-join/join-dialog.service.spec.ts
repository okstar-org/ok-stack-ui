import { TestBed } from '@angular/core/testing';

import { JoinDialogService } from './join-dialog.service';

describe('JoinDialogService', () => {
  let service: JoinDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JoinDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
