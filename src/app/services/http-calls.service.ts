import { patients } from 'src/app/models/patients';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {

  patientUrl = "/patient/";
  doctorUrl = "/doctor/";

  constructor(private http: HttpClient) { }

  attemptDoctorLogin(id: string, password: string) {

    let reqUrl = this.doctorUrl + 'login';
    return this.http.post<any>(reqUrl, {'Email_ID': id, 'Password': password})
  }

  searchPatient(Patient_ID: any){

    const headers = new HttpHeaders({
      'AuthToken': sessionStorage.getItem("AuthToken") || ""
    })
    let reqUrl = this.patientUrl + "search-patient";

    return this.http.post<any>(reqUrl, {'Patient_ID': Patient_ID }, {headers: headers});
  }

  createNewPatient(data: any){

    const headers = new HttpHeaders({
      'AuthToken': sessionStorage.getItem("AuthToken") || ""
    })
    let reqUrl = this.patientUrl + 'create';
    return this.http.post<any>(reqUrl,data, {headers: headers});

  }

  updatePatient(data: any){

    const headers = new HttpHeaders({
      'AuthToken': sessionStorage.getItem("AuthToken") || ""
    })
    let reqUrl = this.patientUrl + 'update';
    return this.http.put<any>(reqUrl,data, {headers: headers});
    
  }


}
