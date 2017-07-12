import { TestBed, inject } from '@angular/core/testing';

import { SpotifyAuthService } from './spotify-auth.service';

describe('SpotifyAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotifyAuthService]
    });
  });

  it('should be created', inject([SpotifyAuthService], (service: SpotifyAuthService) => {
    expect(service).toBeTruthy();
  }));
});
