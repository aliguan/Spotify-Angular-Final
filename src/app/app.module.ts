import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { SpotifyAuthService } from './services/spotify-auth.service'


import { AppComponent } from './app.component';
import { SpotifyLoginComponent } from './spotify-login/spotify-login.component';

@NgModule({
  declarations: [
    AppComponent,
    SpotifyLoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule
  ],
  providers: [SpotifyAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
