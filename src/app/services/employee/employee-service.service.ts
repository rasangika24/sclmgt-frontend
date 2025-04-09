  import { HttpContext } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { HttpService } from '../http.service';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(
    private http:HttpClient,
    private httpservice:HttpService,
  ) { }

  //service Call function
  serviceCall(form_details:any){
    console.log("in the service");
    const requestUrl=environment.baseUrl + '/employee';//'http://localhost:8080/employee'
        
        let headers = {};
    
        if (this.httpservice.getAuthToken() !== null) {
          headers = {
            Authorization: 'Bearer ' + this.httpservice.getAuthToken(),
          };
        }
        return this.http.post(requestUrl,form_details,{headers:headers}); // post, put, delete, get .. ctrl + shift + i
  }
  //getData
  getData(){
    const requestUrl=environment.baseUrl + '/employee';//'http://localhost:8080/employee'
    let headers = {};
    
        if (this.httpservice.getAuthToken() !== null) {
          headers = {
            Authorization: 'Bearer ' + this.httpservice.getAuthToken(),
          };
        }
        return this.http.get(requestUrl,headers);
  }

  //editData
  editData(id: any, form_details: any) {
    console.log("in the editData");
    const requestUrl=environment.baseUrl + '/employee/' + id.toString();//'http://localhost:8080/employee'
        
        let headers = {};
    
        if (this.httpservice.getAuthToken() !== null) {
          headers = {
            Authorization: 'Bearer ' + this.httpservice.getAuthToken(),
          };
        }
        return this.http.put(requestUrl,form_details,{headers:headers}); // post, put, delete, get .. ctrl + shift + i
  }

  //deleteData
  deleteData(id: number) {
    console.log("in the editData");
    const requestUrl=environment.baseUrl + '/employee/' + id.toString();//'http://localhost:8080/employee'
        
        let headers = {};
    
        if (this.httpservice.getAuthToken() !== null) {
          headers = {
            Authorization: 'Bearer ' + this.httpservice.getAuthToken(),
          };
        }
        return this.http.delete(requestUrl,{headers:headers}); // post, put, delete, get .. ctrl + shift + i
  }
}
