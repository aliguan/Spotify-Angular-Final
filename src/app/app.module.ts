import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
    FormsModule
  ],
  providers: [SpotifyAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
