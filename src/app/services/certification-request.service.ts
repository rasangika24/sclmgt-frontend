import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface CertificationRequestDto {
  id?: number;
  studentAdmissionNumber: string;
  studentName: string;
  paymentsCleared?: boolean;
  libraryBooksReturned?: boolean;
  scienceLabCleared?: boolean;
  ictLabCleared?: boolean;
  sportsItemsReturned?: boolean;
  requestDate?: string;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
  approvedBy?: string;
  approvalDate?: string;
  remarks?: string;
  type?: string; // NEW FIELD ADDED
  createdAt?: string;
  updatedAt?: string;
}

export interface CertificationStatistics {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  completedRequests: number;
  rejectedRequests: number;
}

@Injectable({
  providedIn: 'root'
})
export class CertificationRequestService {
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

  // Create a new certification request
  addCertificationRequest(request: CertificationRequestDto): Observable<CertificationRequestDto> {
    return this.http.post<CertificationRequestDto>(
      `${this.baseUrl}/certification-request`, 
      request, 
      this.getHttpOptions()
    );
  }

  // Get all certification requests
  getAllCertificationRequests(): Observable<CertificationRequestDto[]> {
    return this.http.get<CertificationRequestDto[]>(
      `${this.baseUrl}/certification-request`, 
      this.getHttpOptions()
    );
  }

  // Get certification request by ID
  getCertificationRequestById(id: number): Observable<CertificationRequestDto> {
    return this.http.get<CertificationRequestDto>(
      `${this.baseUrl}/certification-request/${id}`, 
      this.getHttpOptions()
    );
  }

  // Update certification request
  updateCertificationRequest(id: number, request: CertificationRequestDto): Observable<CertificationRequestDto> {
    return this.http.put<CertificationRequestDto>(
      `${this.baseUrl}/certification-request/${id}`, 
      request, 
      this.getHttpOptions()
    );
  }

  // Delete certification request
  deleteCertificationRequest(id: number): Observable<CertificationRequestDto> {
    return this.http.delete<CertificationRequestDto>(
      `${this.baseUrl}/certification-request/${id}`, 
      this.getHttpOptions()
    );
  }

  // Get requests by student admission number
  getRequestsByStudentAdmissionNumber(admissionNumber: string): Observable<CertificationRequestDto[]> {
    return this.http.get<CertificationRequestDto[]>(
      `${this.baseUrl}/certification-request/student/${admissionNumber}`, 
      this.getHttpOptions()
    );
  }

  // Get requests by status
  getRequestsByStatus(status: string): Observable<CertificationRequestDto[]> {
    return this.http.get<CertificationRequestDto[]>(
      `${this.baseUrl}/certification-request/status/${status}`, 
      this.getHttpOptions()
    );
  }

  // Search requests by student name
  searchRequestsByStudentName(studentName: string): Observable<CertificationRequestDto[]> {
    const params = new HttpParams().set('studentName', studentName);
    return this.http.get<CertificationRequestDto[]>(
      `${this.baseUrl}/certification-request/search`, 
      { ...this.getHttpOptions(), params }
    );
  }

  // Approve request
  approveRequest(id: number, approvedBy: string, remarks?: string): Observable<CertificationRequestDto> {
    let params = new HttpParams().set('approvedBy', approvedBy);
    if (remarks) {
      params = params.set('remarks', remarks);
    }
    return this.http.put<CertificationRequestDto>(
      `${this.baseUrl}/certification-request/${id}/approve`, 
      {}, 
      { ...this.getHttpOptions(), params }
    );
  }

  // Reject request
  rejectRequest(id: number, rejectedBy: string, remarks?: string): Observable<CertificationRequestDto> {
    let params = new HttpParams().set('rejectedBy', rejectedBy);
    if (remarks) {
      params = params.set('remarks', remarks);
    }
    return this.http.put<CertificationRequestDto>(
      `${this.baseUrl}/certification-request/${id}/reject`, 
      {}, 
      { ...this.getHttpOptions(), params }
    );
  }

  // Check if student has pending request
  checkPendingRequest(admissionNumber: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.baseUrl}/certification-request/check-pending/${admissionNumber}`, 
      this.getHttpOptions()
    );
  }

  // Get request statistics
  getRequestStatistics(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/certification-request/statistics`, 
      this.getHttpOptions()
    );
  }

  // Get completed clearances
  getCompletedClearances(): Observable<CertificationRequestDto[]> {
    return this.http.get<CertificationRequestDto[]>(
      `${this.baseUrl}/certification-request/completed-clearances`, 
      this.getHttpOptions()
    );
  }

  // Get incomplete clearances
  getIncompleteClearances(): Observable<CertificationRequestDto[]> {
    return this.http.get<CertificationRequestDto[]>(
      `${this.baseUrl}/certification-request/incomplete-clearances`, 
      this.getHttpOptions()
    );
  }

  // NEW TYPE-BASED METHODS

  // Get requests by type
  getRequestsByType(type: string): Observable<CertificationRequestDto[]> {
    return this.http.get<CertificationRequestDto[]>(
      `${this.baseUrl}/certification-request/type/${type}`, 
      this.getHttpOptions()
    );
  }

  // Get requests by status and type
  getRequestsByStatusAndType(status: string, type: string): Observable<CertificationRequestDto[]> {
    return this.http.get<CertificationRequestDto[]>(
      `${this.baseUrl}/certification-request/status/${status}/type/${type}`, 
      this.getHttpOptions()
    );
  }

  // Search requests by student name and type
  searchRequestsByStudentNameAndType(studentName: string, type: string): Observable<CertificationRequestDto[]> {
    const params = new HttpParams().set('studentName', studentName);
    return this.http.get<CertificationRequestDto[]>(
      `${this.baseUrl}/certification-request/search/type/${type}`, 
      { ...this.getHttpOptions(), params }
    );
  }

  // Get completed clearances by type
  getCompletedClearancesByType(type: string): Observable<CertificationRequestDto[]> {
    return this.http.get<CertificationRequestDto[]>(
      `${this.baseUrl}/certification-request/completed-clearances/type/${type}`, 
      this.getHttpOptions()
    );
  }

  // Get incomplete clearances by type
  getIncompleteClearancesByType(type: string): Observable<CertificationRequestDto[]> {
    return this.http.get<CertificationRequestDto[]>(
      `${this.baseUrl}/certification-request/incomplete-clearances/type/${type}`, 
      this.getHttpOptions()
    );
  }

  // Get all certification types
  getAllCertificationTypes(): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.baseUrl}/certification-request/types`, 
      this.getHttpOptions()
    );
  }

  // Get statistics by type
  getStatisticsByType(type: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/certification-request/statistics/type/${type}`, 
      this.getHttpOptions()
    );
  }

  // Get request count by type
  getRequestCountByType(): Observable<{[key: string]: number}> {
    return this.http.get<{[key: string]: number}>(
      `${this.baseUrl}/certification-request/count-by-type`, 
      this.getHttpOptions()
    );
  }

  // Check if student has pending request by type
  checkPendingRequestByType(admissionNumber: string, type: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.baseUrl}/certification-request/check-pending/${admissionNumber}/type/${type}`, 
      this.getHttpOptions()
    );
  }

  // Helper method to get approved leaving certificate requests specifically
  getApprovedLeavingCertificateRequests(): Observable<CertificationRequestDto[]> {
    return this.getRequestsByStatusAndType('APPROVED', 'LEAVING_CERTIFICATE');
  }

  // Helper method to get approved character certificate requests specifically
  getApprovedCharacterCertificateRequests(): Observable<CertificationRequestDto[]> {
    return this.getRequestsByStatusAndType('APPROVED', 'CHARACTER_CERTIFICATE');
  }

  // Helper method to get approved requests of any type (for backward compatibility)
  getApprovedRequestsAllTypes(): Observable<CertificationRequestDto[]> {
    return this.getRequestsByStatus('APPROVED');
  }
}
