import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpService } from '../http.service';
import { environment } from 'src/app/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentServiceService {

  constructor(private http: HttpClient, private httpService: HttpService) { }

  /* HTTP Client */
  /* Get,Post, Put, Delete */

  serviceCall(form_details: any) {
    console.log('in this service');
    const requestUrl = environment.baseUrl + '/student'; // http://localhost:8080/student

    let headers = {};

    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer' + this.httpService.getAuthToken(),
      };
    }
    return this.http.post(requestUrl, form_details, { headers: headers });
  }

  getData() {
    const requestUrl = environment.baseUrl + '/student'; // http://localhost:8080/student

    let headers = {};

    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer' + this.httpService.getAuthToken(),
      };
    }

    return this.http.get(requestUrl, headers);
  }


  editData(id: any, form_details: any) {
    console.log('in Edit Data');
    const requestUrl = environment.baseUrl + '/student/' + id.toString(); // http://localhost:8080/student

    let headers = {};

    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer' + this.httpService.getAuthToken(),
      };
    }
    return this.http.put(requestUrl, form_details, { headers: headers });
  }

  deleteData(id: number) {
    console.log('in Delete Data');
    const requestUrl = environment.baseUrl + '/student/' + id.toString(); // http://localhost:8080/student

    let headers = {};

    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer' + this.httpService.getAuthToken(),
      };
    }
    return this.http.delete(requestUrl, { headers: headers });
  }

  checkNicExists(nic: string): Observable<boolean> {
    const params = new HttpParams().set('nic', nic);
    return this.http.get<boolean>(`${environment.baseUrl}/check-nic`, { params });
  }

  getStudenByIndexNumber(indexNo: any) {
    const requestUrl = environment.baseUrl + '/student-name' + indexNo.toString(); // http://localhost:8080/student

    let headers = {};

    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer' + this.httpService.getAuthToken(),
      };
    }

    return this.http.get(requestUrl, headers);
  }

}


