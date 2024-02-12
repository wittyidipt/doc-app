import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  rawkijd: string = ' '
  raw3fi1: string = ' '
  raw4m76: string = ' '
  rawvm7w: string = ' '
  rawgtmq: string = ' '
  rawchr7: string = ' '
  rawhmi6: string = ' '
  rawg9k2: string = ' '
  isDoctorLoggedIn = false;

  constructor(private router: Router) { }

  goToHome(){
    this.router.navigate( ['welcome']);
  }

  ngOnInit(): void {
    console.log(localStorage)
    this.isDoctorLoggedIn = localStorage.getItem('isDoctorLoggedIn')?true : false;
  }

}
