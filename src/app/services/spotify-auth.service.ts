import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SpotifyAuthService {

  BASE_URL: String = 'http://localhost:8888';

  private tokens: Object;

  constructor(private http: Http) {

  }

 login() {
      return this.http.get(`${this.BASE_URL}/login`)
        .map(res => res.json());
  }

  callback(code, state) {
    this.http.get(`${this.BASE_URL}/callback`, {params: {code: code, state: state}})
        .toPromise()
        .then( res => { this.tokens = res.json() } );
  }


  getUser(token) {
      console.log(token);
      const headers = new Headers();
    //   headers.append('Authorization', 'Bearer' + token);
    //   console.log(headers);
    //   return this.http.get( 'https://api.spotify.com/v1/me', { headers: headers })
    //     .map(res => res.json());
  }

}
