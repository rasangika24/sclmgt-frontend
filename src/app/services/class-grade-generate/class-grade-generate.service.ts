import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClassGradeGenerateService {
  constructor(private http: HttpClient, private httpservice: HttpService) {}

  generateGrades(fromGrade: number | null, toGrade: number | null) {
    console.log('Generating Grades.....');
    const requestUrl = environment.baseUrl + '/generateGrades'; //'http://localhost:8080/employee'

    let headers = {};

    if (this.httpservice.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpservice.getAuthToken(),
      };
    }
    const fromToGrades = {
      fromGrade: fromGrade,
      toGrade: toGrade,
    };
    return this.http.post(requestUrl, fromToGrades, { headers: headers }); // post, put, delete, get .. ctrl + shift + i
  }
}
