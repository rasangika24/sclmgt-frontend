import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class AddApplicantServiceService {

  constructor(private http: HttpClient,
    private httpService: HttpService) { }

  serviceCall(form_details: any) {
    console.log("In the serviceCall..");
    
    const requestUrl = environment.baseUrl + '/applicant';

    let headers = {};

    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken()
      };
    }
    return this.http.post(requestUrl, form_details, { headers: headers })
  }
}
