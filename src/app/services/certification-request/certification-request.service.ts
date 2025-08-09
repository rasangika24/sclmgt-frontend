import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpService } from '../http.service';

export interface CertificationRequestDto {
  id?: number;
  studentAdmissionNumber: string;
  studentName?: string;
  paymentsCleared?: boolean;
  libraryBooksReturned?: boolean;
  scienceLabCleared?: boolean;
  ictLabCleared?: boolean;
  sportsItemsReturned?: boolean;
  requestDate?: string;
  status?: string;
  approvedBy?: string;
  approvalDate?: string;
  remarks?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CertificationStatistics {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  completedClearances: number;
  incompleteClearances: number;
  approvalRate: number;
  completionRate: number;
}

@Injectable({
  providedIn: 'root'
})
export class CertificationRequestService {
  private baseUrl = `${environment.baseUrl}/certification-request`;

  constructor(private http: HttpClient, private httpService: HttpService) {}

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    const authToken = this.httpService.getAuthToken();
    if (authToken) {
      headers = headers.set('Authorization', 'Bearer ' + authToken);
    }
    
    return headers;
  }

  // CRUD Operations
  addCertificationRequest(request: CertificationRequestDto): Observable<CertificationRequestDto> {
    const headers = this.getHeaders();
    return this.http.post<CertificationRequestDto>(this.baseUrl, request, { headers });
  }

  getAllCertificationRequests(): Observable<CertificationRequestDto[]> {
    const headers = this.getHeaders();
    return this.http.get<CertificationRequestDto[]>(this.baseUrl, { headers });
  }

  getCertificationRequestById(id: number): Observable<CertificationRequestDto> {
    const headers = this.getHeaders();
    return this.http.get<CertificationRequestDto>(`${this.baseUrl}/${id}`, { headers });
  }

  updateCertificationRequest(id: number, request: CertificationRequestDto): Observable<CertificationRequestDto> {
    const headers = this.getHeaders();
    return this.http.put<CertificationRequestDto>(`${this.baseUrl}/${id}`, request, { headers });
  }

  deleteCertificationRequest(id: number): Observable<CertificationRequestDto> {
    const headers = this.getHeaders();
    return this.http.delete<CertificationRequestDto>(`${this.baseUrl}/${id}`, { headers });
  }

  // Search and Filter Operations
  getRequestsByStudentAdmissionNumber(admissionNumber: string): Observable<CertificationRequestDto[]> {
    const headers = this.getHeaders();
    return this.http.get<CertificationRequestDto[]>(`${this.baseUrl}/student/${admissionNumber}`, { headers });
  }

  getRequestsByStatus(status: string): Observable<CertificationRequestDto[]> {
    const headers = this.getHeaders();
    return this.http.get<CertificationRequestDto[]>(`${this.baseUrl}/status/${status}`, { headers });
  }

  searchRequestsByStudentName(studentName: string): Observable<CertificationRequestDto[]> {
    const headers = this.getHeaders();
    const params = new HttpParams().set('studentName', studentName);
    return this.http.get<CertificationRequestDto[]>(`${this.baseUrl}/search`, { headers, params });
  }

  // Approval Operations
  approveRequest(id: number, approvedBy: string, remarks?: string): Observable<CertificationRequestDto> {
    const headers = this.getHeaders();
    let params = new HttpParams().set('approvedBy', approvedBy);
    if (remarks) {
      params = params.set('remarks', remarks);
    }
    return this.http.put<CertificationRequestDto>(`${this.baseUrl}/${id}/approve`, {}, { headers, params });
  }

  rejectRequest(id: number, rejectedBy: string, remarks?: string): Observable<CertificationRequestDto> {
    const headers = this.getHeaders();
    let params = new HttpParams().set('rejectedBy', rejectedBy);
    if (remarks) {
      params = params.set('remarks', remarks);
    }
    return this.http.put<CertificationRequestDto>(`${this.baseUrl}/${id}/reject`, {}, { headers, params });
  }

  // Utility Operations
  checkPendingRequest(admissionNumber: string): Observable<boolean> {
    const headers = this.getHeaders();
    return this.http.get<boolean>(`${this.baseUrl}/check-pending/${admissionNumber}`, { headers });
  }

  getRequestStatistics(): Observable<CertificationStatistics> {
    const headers = this.getHeaders();
    return this.http.get<CertificationStatistics>(`${this.baseUrl}/statistics`, { headers });
  }

  getCompletedClearances(): Observable<CertificationRequestDto[]> {
    const headers = this.getHeaders();
    return this.http.get<CertificationRequestDto[]>(`${this.baseUrl}/completed-clearances`, { headers });
  }

  getIncompleteClearances(): Observable<CertificationRequestDto[]> {
    const headers = this.getHeaders();
    return this.http.get<CertificationRequestDto[]>(`${this.baseUrl}/incomplete-clearances`, { headers });
  }
}
