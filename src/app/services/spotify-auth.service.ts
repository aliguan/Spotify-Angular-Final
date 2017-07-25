import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SpotifyAuthService {

  BASE_URL: String = 'http://localhost:8888';

  public tokens;

  constructor(private http: Http) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.tokens = currentUser;
  }

 login() {
      return this.http.get(`${this.BASE_URL}/login`)
        .map(res => res.json());
  }

  callback(code, state) {
    return this.http.get(`${this.BASE_URL}/callback`, {params: {code: code, state: state}})
        .map( (res) => {
            this.tokens = res.json();
            if (this.tokens) {
                localStorage.setItem('currentUser',  JSON.stringify(this.tokens) );
                return true;
            } else {
                return false;
            }
        });
  }


  getUser(token) {
      const headers = new Headers();
      headers.append('Authorization', 'Bearer ' + token);
      return this.http.get( 'https://api.spotify.com/v1/me', { headers: headers })
        .map(res => res.json());
  }

  getSavedTracks(token) {
    const arrayoftracks = [];
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    for ( let i = 0; i < 101; i += 50 ) {
        return this.http.get( `https://api.spotify.com/v1/me/tracks?offset=${i}&limit=50`, { headers: headers })
            .map(res => res.json() );
        }

   }


  pushTracks(trackObject) {
      console.log(trackObject);
      this.http.post(`${this.BASE_URL}/userTracks`, trackObject).subscribe();
  }

  createUser(userInfo) {
      console.log(userInfo);
      this.http.post(`${this.BASE_URL}/newUser`, userInfo).subscribe();
  }

  logout(): void {
       // clear token remove user from local storage to log user out
       this.tokens = null;
       localStorage.removeItem('currentUser');
   }


}
