import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { environment } from 'src/app/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NonacademicServiceService {

  constructor(private http:HttpClient, private httpService:HttpService) { }

  serviceCall(form_details:any){
  console.log('In The Service');
  const requestUrl = environment.baseUrl+'/none-academic-staff'; // http://localhost:8080/none-academic-staff

  let headers = {};

    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer'+this.httpService.getAuthToken(),
      };
    }

    return this.http.post(requestUrl,form_details,headers);
}

getData(){

   const requestUrl = environment.baseUrl+'/none-academic-staff'; // http://localhost:8080/none-academic-staff
   let headers = {};

    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer'+this.httpService.getAuthToken(),
      };
    }
    return this.http.get(requestUrl,headers);
  }

  editData(id: any, form_details: any){

   console.log('In Edit Data');

   const requestUrl = environment.baseUrl + '/none-academic-staff/'+id.toString(); // http://localhost:8080/noneacademic-staff

   let headers = {};

    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization:'Bearer' +this.httpService.getAuthToken(),
      };
    }

    return this.http.put(requestUrl,form_details,headers);

  }

    deleteData(id: number){
       console.log('In The deleteData');

   const requestUrl = environment.baseUrl + '/none-academic-staff/'+id.toString(); // http://localhost:8080/noneacademic-staff

   let headers = {};

    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization:'Bearer' +this.httpService.getAuthToken(),
      };
    }

    return this.http.delete(requestUrl,headers);
  }

  checkNicExists(nic: string): Observable<boolean> {
        const params = new HttpParams().set('nic', nic);
        return this.http.get<boolean>(`${environment.baseUrl}/nacheck-nic`, { params });
      }

}
