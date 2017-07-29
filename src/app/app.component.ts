import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'SpotiFriend';

  public loggedIn: boolean;

  ngOnInit() {
      if (localStorage.getItem('currentUser') === null ) {
          this.loggedIn = false;
      } else {
          this.loggedIn = true;
      }
  }

}
