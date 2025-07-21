import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpService } from '../http.service';
import { environment } from 'src/app/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentDetailsServiceService {
  constructor(private http:HttpClient, private httpService: HttpService) {}

getData() {
    const requestUrl = environment.baseUrl + '/student'; // http://localhost:8080/student

    let headers = {};

    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer'+this.httpService.getAuthToken(),
      };
    }

    return this.http.get(requestUrl,headers);
  }



}