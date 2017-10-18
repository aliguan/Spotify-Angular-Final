import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class LocatingUserService {
  //
  BASE_URL: String = 'https://spotifriend.herokuapp.com';
   // BASE_URL: String = 'http://localhost:8888';
  constructor( private http: Http ) { }

  saveLoc(coordinates) {
      this.http.post(`${this.BASE_URL}/location`, coordinates).subscribe();
  }
  // Find users within a 25 mile radiusatom
  usersNearMe(coordinates) {
     return this.http.post(`${this.BASE_URL}/distance`, coordinates).map(res => res);
  }

  getMatches(user) {
      return this.http.post(`${this.BASE_URL}/getMatchedUsers`, user).map(res => res.json());
  }

  addFriend(friendId, currentUserEmail) {
     const stuff = {
        friendId: friendId,
        userEmail: currentUserEmail
     }
     return this.http.post(`${this.BASE_URL}/addFriend`, stuff).map(res => res);
  }

  getFriends(email) {
    //  console.log(email)
    return this.http.post(`${this.BASE_URL}/chat/getFriends`, { 'email': email} ).map(res => res.json());
  }
}
