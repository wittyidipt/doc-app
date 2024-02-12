import { HttpCallsService } from './../../services/http-calls.service';
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { patients } from 'src/app/models/patients';



@Component({
  selector: 'app-search-patient',
  templateUrl: './search-patient.component.html',
  styleUrls: ['./search-patient.component.css']
})
export class SearchPatientComponent implements OnInit {

  constructor(private router: Router, private httpCallsService: HttpCallsService) { }

  ngOnInit(): void {}
  
  noUserFoundError =  false;
  serviceError = false;

  searchPatient(form: NgForm){
    this.noUserFoundError = false;
    this.serviceError = false;
    
    this.httpCallsService.searchPatient(form.value['searchData']).subscribe({
      next: (Search_Result) => {
        let Patient_Data = Search_Result.Patient_Data;
        if(Patient_Data.length === 0){
          this.noUserFoundError = true;
        }
        else {
          this.router.navigate( ['view-patient'], {
            state: {patient: Patient_Data[0]}
          });
        }
      },
      error: (e) => {
        console.log(e);
        this.serviceError = true;
      }
    });
  }

  goToHome(){
    this.router.navigate( ['welcome']);
  }

}
