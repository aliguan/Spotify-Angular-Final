import { Component, OnInit, Input, Output } from '@angular/core';
import { SpotifyAuthService } from '../services/spotify-auth.service';
import { LocatingUserService } from '../services/locating-user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Headers } from '@angular/http';
import { } from '@types/googlemaps';
import { Http, Response } from '@angular/http';

declare var $: any;

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css'],
})
export class ProfileViewComponent implements OnInit {
  public tokens;
  public user;
  public tracks;
  public google: any;
  public matchedUsers;

  private apiUrl = `https://api.spotify.com/v1/me/tracks?offset=0&limit=50`;


  constructor( private spotifyauth: SpotifyAuthService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private locateuser: LocatingUserService,
      private http: Http) { }


  ngOnInit() {
      // Get User Tokens
      this.reload();
      this.tokens = JSON.parse(localStorage.getItem('currentUser'));
      this.createUserandTracks();

  }


  reload() {
        if (!localStorage.justOnce || localStorage.justOnce === 'undefined' ) {
            localStorage.setItem('justOnce', 'true');
            location.reload();
        }
    }

  createUserandTracks() {
      // If there are tokens create user and get their saved Tracks
      if (this.tokens) {
          this.spotifyauth.getUser(this.tokens.access_token)
            .subscribe(res => {
                this.user = res;
                this.spotifyauth.createUser(res);
            } );

      this.readUserTracks();

      }
  }

  apiCall( token, nextUrl ) {
     return this.spotifyauth.getSavedTracks(this.tokens.access_token, nextUrl);
  }

  readUserTracks() {
        this.spotifyauth.getSavedTracks(this.tokens.access_token, this.apiUrl)
                  .subscribe(res => {
                      const arrayofArtists = [];
                      if (res) {
                          for ( let i = 0; i <= res.total; i += 50 ) {
                            const loopUrl = `https://api.spotify.com/v1/me/tracks?offset=${i}&limit=50`;
                            this.apiCall(this.tokens.access_token, loopUrl)
                                .toPromise()
                                .then( response =>  { if ( response !== null ) {
                                    this.tracks = response.items;
                                    this.tracks.forEach((track) => {
                                        arrayofArtists.push(track.track.artists[0].name);
                                    });
                                        if ( arrayofArtists.length === res.total ) {
                                            const trackObject = {
                                                userEmail: this.user.email,
                                                artistNames: arrayofArtists.sort(),
                                            }
                                            this.spotifyauth.pushTracks(trackObject).subscribe(res => this.tracks = res);
                                        }
                                    }
                                });
                            }
                        }

                  }

           );
    }

}
