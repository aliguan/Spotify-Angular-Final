import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SpotifyAuthService } from './spotify-auth.service';

@Injectable()
export class UserResolveService implements Resolve<any> {
  private token = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private spotifyauth: SpotifyAuthService ) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.spotifyauth.getUser(this.token.access_token)
  }

}
