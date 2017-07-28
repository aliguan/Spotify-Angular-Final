import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class LocatingUserService {

  BASE_URL: String = 'http://localhost:8888';

  constructor( private http: Http ) { }

  saveLoc(coordinates) {
      this.http.post(`${this.BASE_URL}/location`, coordinates).subscribe();
  }

  usersNearMe(coordinates) {
     return this.http.post(`${this.BASE_URL}/distance`, coordinates).map(res => res);
  }

  getMatches(user) {
      console.log(user.email);
      return this.http.get(`${this.BASE_URL}/getMatchedUsers`, user).map(res => res.json());
  }
}
