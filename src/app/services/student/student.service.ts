import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface StudentDto {
  id?: number;
  admissionNumber: string;
  indexNumber?: string;
  fullName: string;
  nameWithInitials: string;
  dateOfBirth: string;
  nic?: string;
  address: string;
  religion?: string;
  grade?: string;
  class?: string;
  fatherName?: string;
  motherName?: string;
  guardianName?: string;
  contactNumber?: string;
  email?: string;
  admissionDate?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly baseUrl = `${environment.baseUrl}`;

  constructor(private http: HttpClient) {}

  private getHttpOptions() {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    const headers: any = {
      'Content-Type': 'application/json'
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return {
      headers: new HttpHeaders(headers)
    };
  }

  // Get all students
  getAllStudents(): Observable<StudentDto[]> {
    return this.http.get<StudentDto[]>(
      `${this.baseUrl}/student`, 
      this.getHttpOptions()
    );
  }

  // Get student by admission number
  getStudentByAdmissionNumber(admissionNumber: string): Observable<StudentDto> {
    const params = new HttpParams().set('admissionNumber', admissionNumber);
    return this.http.get<StudentDto>(
      `${this.baseUrl}/student/by-admission`, 
      { ...this.getHttpOptions(), params }
    );
  }

  // Add new student
  addStudent(student: StudentDto): Observable<StudentDto> {
    return this.http.post<StudentDto>(
      `${this.baseUrl}/student`, 
      student, 
      this.getHttpOptions()
    );
  }

  // Update student
  updateStudent(id: number, student: StudentDto): Observable<StudentDto> {
    return this.http.put<StudentDto>(
      `${this.baseUrl}/student/${id}`, 
      student, 
      this.getHttpOptions()
    );
  }

  // Delete student
  deleteStudent(id: number): Observable<StudentDto> {
    return this.http.delete<StudentDto>(
      `${this.baseUrl}/student/${id}`, 
      this.getHttpOptions()
    );
  }

  // Check if NIC exists
  checkNICExists(nic: string): Observable<boolean> {
    const params = new HttpParams().set('nic', nic);
    return this.http.get<boolean>(
      `${this.baseUrl}/check-nic`, 
      { ...this.getHttpOptions(), params }
    );
  }

  // Search students by name
  searchStudents(searchTerm: string): Observable<StudentDto[]> {
    const params = new HttpParams().set('search', searchTerm);
    return this.http.get<StudentDto[]>(
      `${this.baseUrl}/student/search`, 
      { ...this.getHttpOptions(), params }
    );
  }

  // Get students by grade
  getStudentsByGrade(grade: string): Observable<StudentDto[]> {
    return this.http.get<StudentDto[]>(
      `${this.baseUrl}/student/grade/${grade}`, 
      this.getHttpOptions()
    );
  }
}
