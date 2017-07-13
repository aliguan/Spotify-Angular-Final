import { Component, OnInit } from '@angular/core';
import { SpotifyAuthService } from '../services/spotify-auth.service'

@Component({
  selector: 'app-spotify-login',
  templateUrl: './spotify-login.component.html',
  styleUrls: ['./spotify-login.component.css']
})
export class SpotifyLoginComponent implements OnInit {
    user: Object = {};
  constructor(private spotifyauth: SpotifyAuthService) { }

  ngOnInit() {
      this.spotifyauth.getAuthenticatedUserInfo()
        .subscribe( (user) => this.user = user );
        console.log(this.user);
  }

}
