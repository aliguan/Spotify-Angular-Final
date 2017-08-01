import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { } from '@types/googlemaps';
import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarModule} from './shared/navbar/navbar.module';


import { SpotifyAuthService } from './services/spotify-auth.service';
import { LocatingUserService } from './services/locating-user.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UserResolveService } from './services/user-resolve.service';

import { AppComponent } from './app.component';
import { SpotifyLoginComponent } from './spotify-login/spotify-login.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { AppRoutingModule } from './app.routing.module';
import { CallbackComponent } from './callback/callback.component';
import { LocateUserComponent } from './locate-user/locate-user.component';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    SpotifyLoginComponent,
    ProfileViewComponent,
    CallbackComponent,
    LocateUserComponent,
    UserComponent,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    SidebarModule,
    NavbarModule
  ],
  providers: [SpotifyAuthService, LocatingUserService, AuthGuardService, UserResolveService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
