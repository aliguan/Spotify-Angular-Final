import { Component, OnInit } from '@angular/core';
import { SpotifyAuthService } from '../services/spotify-auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Headers } from '@angular/http';
import { } from '@types/googlemaps';


@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  private tokens;
  public user;
  public tracks;
  public city;
  public state;
  public google: any;


  constructor( private spotifyauth: SpotifyAuthService,
      private activatedRoute: ActivatedRoute,
      private router: Router) { }


  ngOnInit() {

      // Get User Tokens
      this.tokens = JSON.parse(localStorage.getItem('currentUser'));

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

      this.getUserLoc();
  }

  getUserLoc() {
      const geocoder = new google.maps.Geocoder();
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition( pos => {
              const request = {
                  lat: pos.coords.latitude,
                  lng: pos.coords.longitude
              }

              geocoder.geocode( { 'location': request },
                 (results, status) => {

                    if ( status === google.maps.GeocoderStatus.OK ) {
                        if (results[0]) {
                            console.log( results[0] );
                            const component = results[0].address_components;
                            for ( let i = 0; i < component.length; i++ ) {
                                if (component[i].types[0] === 'locality') {
                                    this.city = component[i].short_name;
                                }
                                if (component[i].types[0] === 'administrative_area_level_1') {
                                    this.state = component[i].short_name;
                                }
                            }
                        } else {
                            console.log( 'No reverse geocode results.' );
                        }
                    } else {
                        window.alert('Geocoder failed due to: ' + status);
                    }
               });
          });


        }
    };

  logOut() {
      this.spotifyauth.logout();
      this.router.navigate(['/login']);
  }

}
