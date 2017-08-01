import { Component, OnInit } from '@angular/core';
import { SpotifyAuthService } from '../services/spotify-auth.service';


@Component({
  selector: 'app-spotify-login',
  templateUrl: './spotify-login.component.html',
  styleUrls: ['./spotify-login.component.css']
})
export class SpotifyLoginComponent implements OnInit {
  loginUrl: string;
  constructor(private spotifyauth: SpotifyAuthService) { }

  ngOnInit() {

  }
  getLoginString() {
    this.spotifyauth.login()
    .subscribe(
     (res) => { if (res) {
        this.loginUrl = res;
        window.location.href = this.loginUrl;
    }} );
  }
}
