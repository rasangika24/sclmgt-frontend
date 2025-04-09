import { HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { HttpService } from '../http.service';
import { environment } from 'src/app/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FormDemoServiceService {
  constructor(
    private http:HttpClient,
    private httpservice:HttpService
  ){}

 //service call function
  serviceCall(form_details: any){
    console.log("in the Service");
    const requestUrl=environment.baseUrl + '/form-demo';//'http://localhost:8080/form-demo'
    
    let headers = {};

    if (this.httpservice.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpservice.getAuthToken(),
      };
    }
    return this.http.post(requestUrl,form_details,{headers:headers}); // post, put, delete, get .. ctrl + shift + i
  }
}
