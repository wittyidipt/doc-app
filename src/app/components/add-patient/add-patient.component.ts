import { HttpCallsService } from './../../services/http-calls.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  constructor(private router: Router,  private domSanitizer: DomSanitizer, private httpCallsService: HttpCallsService, private filesService: FilesService) { }

  isSubmitted = false;
  isSuccessful = false;
  topDataAdd = "Please Enter Details Of New Patient"
  topDataDone = "Patient Added Succesfully, Please Return to Home!"
  maxPdfSize = 2000;
  sizeLimitExceededError = "Please upload a PDF with size < " + this.maxPdfSize+ "MB";
  sizeLimitExceededFlag = false;

  @ViewChild('fileUpload') fileUpload!: ElementRef;

  ngOnInit(): void {
  }

  goToHome(){
    this.router.navigate( ['welcome']);
  }

  saveUser(patientData: any){
    console.log(patientData);
    // this.router.navigate( ['view-patient'], {
    //   state: {patient: patientData}
    // });

    this.httpCallsService.createNewPatient(patientData).subscribe ({
      next: (data) => {
        console.log(data);
        this.router.navigate( ['view-patient'], {
          state: {patient: patientData}
        })
      },
      error: (e) => console.log(e)
    });
  }

  createNewPatient(data: any){

    console.log("createnewpatient," ,data);
    this.isSubmitted = true;
    if(data['status'] == "INVALID")return;

    if (this.fileUpload && this.fileUpload.nativeElement.files && this.fileUpload.nativeElement.files.length > 0) {
      const file: File = this.fileUpload.nativeElement.files[0];
      const fileSize = Math.round(file.size/1024); 

      if(fileSize > this.maxPdfSize){
        this.sizeLimitExceededFlag = true;
        
        console.log("file size exceeded " + fileSize);
        return;
      }


      if (file) {
        this.filesService.convertFileToBase64(file)
          .then((bytes: String) => {
            data.value['Patient_File'] = bytes;
            this.saveUser(data.value);
          })
          .catch((error) => {
            console.error('Error reading file:', error);
          });
      }
      else this.saveUser(data.value);
    }
    else this.saveUser(data.value);
  }


}
