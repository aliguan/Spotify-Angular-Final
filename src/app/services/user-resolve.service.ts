import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SpotifyAuthService } from './spotify-auth.service';

@Injectable()
export class UserResolveService implements Resolve<any> {
  private token = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private spotifyauth: SpotifyAuthService, private router: Router ) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.spotifyauth.getUser(this.token.access_token)
  }

}
