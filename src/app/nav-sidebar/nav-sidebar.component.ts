import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.css']
})
export class NavSidebarComponent {
  
  activeRoute: string | undefined;


  constructor(private route: ActivatedRoute) {
    this.route.url.subscribe(url => {
      this.activeRoute = url[0].path;
    });
  }
  

 
}
