import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { SpotifyLoginComponent } from './spotify-login/spotify-login.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { CallbackComponent } from './callback/callback.component';
import { LocateUserComponent } from './locate-user/locate-user.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UserResolveService } from './services/user-resolve.service';

const routes: Routes = [
  {
    path: 'login', component: SpotifyLoginComponent
  },
  {
    path: 'callback', component: CallbackComponent
  },
  {
    path: 'dashboard', component: ProfileViewComponent,
    canActivate: [AuthGuardService],
    resolve: {
        user: UserResolveService
    }
  },
  {
    path: 'location', component: LocateUserComponent, canActivate: [AuthGuardService]
  },
  {
    path: '',   redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: '**',   redirectTo: '/login', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { };
