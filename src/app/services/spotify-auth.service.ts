import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyAuthService {
  BASE_URL: String = 'http://localhost:8888';

  constructor(private http: Http) { }

  getAuthenticatedUserInfo() {
      return this.http.get(`${this.BASE_URL}/hi`)
        .map(res  => res.json())
  }
}
