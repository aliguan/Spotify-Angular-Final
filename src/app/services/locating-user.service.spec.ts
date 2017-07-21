import { TestBed, inject } from '@angular/core/testing';

import { LocatingUserService } from './locating-user.service';

describe('LocatingUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocatingUserService]
    });
  });

  it('should be created', inject([LocatingUserService], (service: LocatingUserService) => {
    expect(service).toBeTruthy();
  }));
});
