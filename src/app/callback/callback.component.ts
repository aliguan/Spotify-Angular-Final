import { Component, OnInit } from '@angular/core';
import { SpotifyAuthService } from '../services/spotify-auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Headers } from '@angular/http';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

    constructor( private spotifyauth: SpotifyAuthService,
        private activatedRoute: ActivatedRoute,
        private router: Router) { }

  ngOnInit() {
      this.activatedRoute.queryParams
        .subscribe((queryParams) => {
          const code = queryParams['code'];
          const state = queryParams['state'];
          this.spotifyauth.callback(code, state)
            .subscribe(res => {
                this.router.navigate(['dashboard']);
            });
        })
  }

}
