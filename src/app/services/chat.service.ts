import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ChatService {

    // BASE_URL: String = 'https://spotifriend.herokuapp.com';
     BASE_URL: String = 'http://localhost:8888';

  constructor(private http: Http) { }

  getChatByRoom(room) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.BASE_URL}/chat` + room)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  saveChat(data) {
    return new Promise((resolve, reject) => {
        this.http.post(`${this.BASE_URL}/chat`, data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

}
