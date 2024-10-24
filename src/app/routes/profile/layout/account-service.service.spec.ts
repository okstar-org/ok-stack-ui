/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AccountServiceService } from './account.service';

describe('Service: AccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountServiceService],
    });
  });

  it('should ...', inject([AccountServiceService], (service: AccountServiceService) => {
    expect(service).toBeTruthy();
  }));
});
