import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SpotifyAuthService {
  //
  // BASE_URL: String = 'https://spotifriend.herokuapp.com';
  BASE_URL: String = 'http://localhost:8888';

  public tokens;

  constructor(private http: Http) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.tokens = currentUser;
  }

 login() {
      return this.http.get(`${this.BASE_URL}/spotifylogin`)
        .map(res => res.json());
  }

  callback(code, state) {
      return this.http.get(`${this.BASE_URL}/callback2`, {params: {code: code, state: state}})
        .map( (res) => {
            this.tokens = res.json();
            if (this.tokens) {
                localStorage.setItem('currentUser',  JSON.stringify(this.tokens) );
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

  getSavedTracks(token, apiUrl) {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    return this.http.get( apiUrl , { headers: headers })
        .map(res => res.json() );

   }


  pushTracks(trackObject) {
    //   console.log(trackObject);
      return this.http.post(`${this.BASE_URL}/userTracks`, trackObject).map(res => res);
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
