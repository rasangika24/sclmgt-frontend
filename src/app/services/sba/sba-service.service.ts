import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class SbaServiceService {

   constructor(private http:HttpClient, private httpService: HttpService) {}
  
    /* HTTP Client */
    /* Get,Post, Put, Delete */
  
    serviceCall(form_details:any) {
      console.log('in this service');
      const requestUrl = environment.baseUrl+'/sbamarks'; // http://localhost:8080//sbamarks
  
      let headers = {};
  
      if (this.httpService.getAuthToken() !== null) {
        headers = {
          Authorization:'Bearer'+this.httpService.getAuthToken(),
        };
      }
      return this.http.post(requestUrl,form_details,{headers:headers});
    }

    getData() {
    const requestUrl = environment.baseUrl + '/sbamarks'; // http://localhost:8080/sbamarks

    let headers = {};

    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer'+this.httpService.getAuthToken(),
      };
    }

    return this.http.get(requestUrl,headers);
  }

  editData(id: any, form_details: any) {
    console.log('in Edit Data');
    const requestUrl = environment.baseUrl + '/sbamarks/' + id.toString(); // http://localhost:8080/sbamarks

    let headers = {};

    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer'+this.httpService.getAuthToken(),
      };
    }
    return this.http.put(requestUrl, form_details, { headers:headers });
  }

   deleteData(id: number) {
    console.log('in Delete Data');
    const requestUrl = environment.baseUrl + '/sbamarks/' + id.toString(); // http://localhost:8080/sbamarks

    let headers = {};

    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer' + this.httpService.getAuthToken(),
      };
    }
    return this.http.delete(requestUrl, { headers:headers });
  }


}
