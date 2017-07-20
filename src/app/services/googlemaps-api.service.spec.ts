import { TestBed, inject } from '@angular/core/testing';

import { GooglemapsApiService } from './googlemaps-api.service';

describe('GooglemapsApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GooglemapsApiService]
    });
  });

  it('should be created', inject([GooglemapsApiService], (service: GooglemapsApiService) => {
    expect(service).toBeTruthy();
  }));
});
