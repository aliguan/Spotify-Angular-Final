import { Component, OnInit, Renderer, ViewChild, ElementRef, Input } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { SpotifyAuthService } from '../../services/spotify-auth.service';
import { LocatingUserService } from '../../services/locating-user.service';

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;
    private tokens;
    public user;

    @ViewChild("navbar-cmp") button;

    constructor(location: Location, private renderer: Renderer,
        private element: ElementRef,
        private spotifyauth: SpotifyAuthService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private locateuser: LocatingUserService) {

        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit(){
        this.tokens = JSON.parse(localStorage.getItem('currentUser'));
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.getUser();
    }
    getUser() {
        if (this.tokens) {
            this.spotifyauth.getUser(this.tokens.access_token)
              .subscribe(res => {
                  this.user = res;
              } );
          }
    }

    getTitle(){
        var titlee = window.location.pathname;
        titlee = titlee.substring(1);
        for(var item = 0; item < this.listTitles.length; item++){
            if(this.listTitles[item].path === titlee){
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }
    sidebarToggle(){
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];

        if (this.sidebarVisible == false) {
            setTimeout(function(){
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }

    logOut() {
        localStorage.setItem('justOnce', undefined);
        this.spotifyauth.logout();
        this.router.navigate(['/']);
    }
}
