import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyAuthService {
  BASE_URL: String = 'http://localhost:8888';

  constructor(private http: Http) { }

 login() {
      return this.http.get(`${this.BASE_URL}/login`).map(res => res.json());
  }
  callback(code, state) {
      return this.http.get(`${this.BASE_URL}/callback`, {params: {code: code, state: state}}).map(res => res.json());
  }
}
