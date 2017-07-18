import { Component, OnInit } from '@angular/core';
import { SpotifyAuthService } from '../services/spotify-auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Headers } from '@angular/http';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  private tokens;
  public user;
  public tracks;

  constructor( private spotifyauth: SpotifyAuthService,
      private activatedRoute: ActivatedRoute,
      private router: Router) { }


  ngOnInit() {
      this.tokens = JSON.parse(localStorage.getItem('currentUser'));
      if (this.tokens) {
          this.spotifyauth.getUser(this.tokens.access_token)
            .subscribe(res => {
                this.user = res;
                this.spotifyauth.createUser(res);
            } );

          this.spotifyauth.getSavedTracks(this.tokens.access_token)
            .subscribe(res => { this.tracks = res; console.log(res)} );
      }

  }

}
