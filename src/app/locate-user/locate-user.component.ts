import { Component, OnInit, Input } from '@angular/core';
import { SpotifyAuthService } from '../services/spotify-auth.service';
import { LocatingUserService } from '../services/locating-user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Headers } from '@angular/http';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-locate-user',
  templateUrl: './locate-user.component.html',
  styleUrls: ['./locate-user.component.css']
})
export class LocateUserComponent implements OnInit {
    private user;
    private tokens;
    private city;
    private state;
    private google: any;
    private matchedUsers;

    constructor( private spotifyauth: SpotifyAuthService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private locateuser: LocatingUserService) { }

    ngOnInit() {
        this.tokens = JSON.parse(localStorage.getItem('currentUser'));
        if (this.tokens) {
            this.spotifyauth.getUser(this.tokens.access_token)
              .subscribe(res => {
                  this.user = res;
             } );
        }
    }

    getUserLoc() {

        const geocoder = new google.maps.Geocoder();
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition( pos => {
                // request to geocoder for Google maps
                const request = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }
                // display on angular
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


            }, this.errorCallback, {timeout: 20000});
        }
    }

    errorCallback(error) {
        console.log(error);
    }

    saveUserLoc() {

        const geocoder = new google.maps.Geocoder();
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition( pos => {
                // request to geocoder for Google maps
                const request = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }

                // Request sent to use in GeoLib calculations
                const nearMeObject = {
                    userEmail: this.user.email,
                    latitude: request.lat,
                    longitude: request.lng
                }

                const locationObject = {
                    userEmail: this.user.email,
                    coordinates: {
                        latitude: request.lat,
                        longitude: request.lng
                    }
                }

                this.saveLoc(locationObject);
                this.locateuser.usersNearMe(nearMeObject).subscribe(res => this.matchedUsers = res );
            });
          }
      };


   saveLoc(request) {
      this.locateuser.saveLoc(request);
   }

   usersNearMe() {
       navigator.geolocation.getCurrentPosition( pos => {
          const nearMeObject = {
               userEmail: this.user.email,
               latitude: pos.coords.latitude,
               longitude: pos.coords.longitude
           }

       });

   }

}
