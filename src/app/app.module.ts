import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { } from '@types/googlemaps';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';


import { SpotifyAuthService } from './services/spotify-auth.service';
import { LocatingUserService } from './services/locating-user.service';

import { AppComponent } from './app.component';
import { SpotifyLoginComponent } from './spotify-login/spotify-login.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { AppRoutingModule } from './app.routing.module';
import { CallbackComponent } from './callback/callback.component';

@NgModule({
  declarations: [
    AppComponent,
    SpotifyLoginComponent,
    ProfileViewComponent,
    CallbackComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    SidebarModule,
    FooterModule,
    NavbarModule
  ],
  providers: [SpotifyAuthService, LocatingUserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
