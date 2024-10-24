/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BusServiceService } from './BusService.service';

describe('Service: BusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusServiceService],
    });
  });

  it('should ...', inject([BusServiceService], (service: BusServiceService) => {
    expect(service).toBeTruthy();
  }));
});
