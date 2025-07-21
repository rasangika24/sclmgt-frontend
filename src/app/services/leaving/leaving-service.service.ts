import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class LeavingServiceService {
  
  constructor(private http: HttpClient,
    private httpService:HttpService
  ) {
   }

  serviceCall(formDetails: any) {
    console.log("inthe service call")
   const requestUrl = environment.baseUrl + '/leaving'; // http://localhost:8080/form-demo

    let headers = {};

    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken()
      };
    }
    return this.http.post(requestUrl, formDetails, {headers:headers})
  }
}
