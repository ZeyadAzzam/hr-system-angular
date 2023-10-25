import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HR-Project';

  showNavbar: boolean =true;

  constructor(private router: Router) {

    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {

        if (event.url === '/login'|| event.url==='/') {
          this.showNavbar = false;
        } else {
          this.showNavbar = true;
        }
      }
    });
  }


}
