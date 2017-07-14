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

  constructor( private spotifyauth: SpotifyAuthService,
      private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
      this.activatedRoute.queryParams
      .subscribe((queryParams) => {
          const code = queryParams['code'];
          const state = queryParams['state'];
          this.spotifyauth.callback(code, state)
            // .subscribe(res => { this.tokens = res;
            //     this.spotifyauth.getUser(this.tokens.access_token)
            //         .subscribe( response => console.log(response))
            // });
        })
    }

}
