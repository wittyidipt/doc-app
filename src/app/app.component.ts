import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'doc-app-frontend';

  isDoctorLoggedIn =  false;

  constructor(private router: Router, private viewportScroller: ViewportScroller){};

  goToHome(){
    this.router.navigate( ['welcome']);
  }

  // goToSection(section: string){

  //   this.viewportScroller.scrollToAnchor(section);

  // }

}
