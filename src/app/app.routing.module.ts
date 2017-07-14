import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { SpotifyLoginComponent } from './spotify-login/spotify-login.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';


const routes: Routes = [
  {
    path: 'login', component: SpotifyLoginComponent
  },
  {
    path: 'callback', component: ProfileViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { };
