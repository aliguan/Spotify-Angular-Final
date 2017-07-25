import { Component, OnInit } from '@angular/core';
import { SpotifyAuthService } from '../services/spotify-auth.service';
import { LocatingUserService } from '../services/locating-user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Headers } from '@angular/http';
import { } from '@types/googlemaps';

declare var $: any;

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css'],
})
export class ProfileViewComponent implements OnInit {
  private tokens;
  private user;
  private tracks;
  private google: any;
  private matchedUsers;

  constructor( private spotifyauth: SpotifyAuthService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private locateuser: LocatingUserService) { }


  ngOnInit() {
      // Get User Tokens
      this.tokens = JSON.parse(localStorage.getItem('currentUser'));
      this.createUserandTracks();

  }

  createUserandTracks() {
      // If there are tokens create user and get their saved Tracks
      if (this.tokens) {
          this.spotifyauth.getUser(this.tokens.access_token)
            .subscribe(res => {
                this.user = res;
                this.spotifyauth.createUser(res);
            } );

          this.spotifyauth.getSavedTracks(this.tokens.access_token)
            .subscribe(res => {
                    const arrayofArtists = [];
                    console.log(res);
                    this.tracks = res.items;
                    this.tracks.forEach((track) => {
                        arrayofArtists.push(track.track.artists[0].name);

                    });
                    const trackObject = {
                        userEmail: this.user.email,
                        artistNames: arrayofArtists,
                    }
                    this.spotifyauth.pushTracks(trackObject);
                }
            );
      }
  }
}
