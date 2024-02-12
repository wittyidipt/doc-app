import { HttpCallsService } from './../../services/http-calls.service';
import { FilesService } from './../../services/files.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { patients } from 'src/app/models/patients';
import { retry } from 'rxjs';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css']
})
export class ViewPatientComponent implements OnInit {

  patientDetails!: patients;
  hasPatientFile = true;
  patientFile: any;
  errorInPdf = false;
  maxPdfSize = 2000;
  sizeLimitExceededError = "Please upload a PDF with size < " + this.maxPdfSize+ "MB";
  sizeLimitExceededFlag = false;
  

  constructor(private router: Router, private httpCallsService: HttpCallsService, private domSanitizer: DomSanitizer, private route: ActivatedRoute, private filesService: FilesService) {}

  ngOnInit(): void {

    if(history.state.patient == null)this.goToHome();
    
    this.patientDetails = history.state.patient;
    console.log(this.patientDetails);
    if(this.patientDetails.Patient_File.length == 0){
      this.hasPatientFile = false;
      return;
    }

     // create blobUrl from patient file and then create file from that URL.
     const blobUrl = this.filesService.convertToFile(this.patientDetails.Patient_File);
     this.patientFile = this.domSanitizer.bypassSecurityTrustResourceUrl(blobUrl);
  }


  updateData(){

    this.httpCallsService.updatePatient(this.patientDetails).subscribe ({
      next: (data) => {
        console.log(data);
        window.alert("Data saved successfully...")
      },
      error: (e) => {
        console.log(e);
        window.alert("There was some error in saving the data, Please try again later");
      }
    });
  }
 

  async addNewPdf(event: any){
    const file = event.target.files[0];
    const fileSize = Math.round(file.size/1024); 

    if(fileSize > this.maxPdfSize){
      this.sizeLimitExceededFlag = true;
      console.log("file size exceeded " + fileSize);
      return;
    }

    try{
      this.filesService.convertFileToBase64(file).then( (base64) => {

        this.filesService.combinePdfFiles(( this.hasPatientFile? this.patientDetails.Patient_File: null), base64).then( (data) => {

          data = data.slice(this.hasPatientFile? 28 : 0);
          this.hasPatientFile = true;
          this.patientDetails.Patient_File = data;
          const blobUrl = this.filesService.convertToFile(data);
          this.patientFile = this.domSanitizer.bypassSecurityTrustResourceUrl(blobUrl);
        })
      })
    }
    catch(er){
      console.log("error in displaying file");
      this.errorInPdf = true;
    }
  }

  goToHome(){
    console.log(this.patientDetails);
    this.router.navigate( ['welcome']);
  }

  pdfSrc =  this.domSanitizer.bypassSecurityTrustResourceUrl('https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf');

}
