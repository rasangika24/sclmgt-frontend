import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SchedulerService {
  constructor(private httpService: HttpService, private http: HttpClient) {}

  saveSchedule(form_details: any) {
    // console.log(form_details);
    // return null;
    const requestUrl = environment.baseUrl + '/scheduler'; // http://localhost:8080/form-demo

    let headers = {};

    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }
    return this.http.put(requestUrl, form_details, { headers: headers });
  }

  getData(empNo: string) {
    const requestUrl = environment.baseUrl + '/scheduler/' + empNo; // http://localhost:8080/form-demo

    let headers = {};

    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken(),
      };
    }

    return this.http.get(requestUrl, headers);
  }
}
