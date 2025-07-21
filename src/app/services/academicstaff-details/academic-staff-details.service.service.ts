import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { environment } from 'src/app/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcademicStaffDetailsServiceService {

   constructor(private http:HttpClient, private httpService:HttpService) { }


   getData(){

   const requestUrl = environment.baseUrl+'/academic-staff'; // http://localhost:8080/academic-staff
   let headers = {};

    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer'+this.httpService.getAuthToken(),
      };
    }
    return this.http.get(requestUrl,headers);
  }

}
