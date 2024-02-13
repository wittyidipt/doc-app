import { HttpResponse } from '@angular/common/http';
import { HttpCallsService } from './../../services/http-calls.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doc-login',
  templateUrl: './doc-login.component.html',
  styleUrls: ['./doc-login.component.css']
})
export class DocLoginComponent implements OnInit {


  rawvrxe: string = ' '
  errorCode = 401;
  attemptedLogin = false;
  text401 = "Invalid Email-ID or Password!"
  text5xx = "Service Unavailable right now. Please try again later!"

  constructor(private router: Router, private httpCallsService: HttpCallsService) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  attemptLogin(form: NgForm){
    console.log("form submitted with EMAIL_ID :{}, password: {}", form.value['Email_ID'], form.value['Password']);
   
    this.httpCallsService.attemptDoctorLogin(form.value['Email_ID'], form.value['Password']).subscribe({

      next: (res) => {
        this.attemptedLogin = true;
        console.log(res);
        sessionStorage.setItem('AuthToken', res['jwtToken']);
        sessionStorage.setItem('isDoctorLoggedIn', "true");
        this.router.navigate(['welcome']);
      },
      error: (e) =>{
        this.attemptedLogin = true;
        this.errorCode = e.status;
      }
    })
  }

  goToHome(){
    this.router.navigate(['welcome']);
  }

}
