import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AcademicStaffDto } from '../../interfaces/academic-staff.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcademicServiceService {
  private baseUrl = `${environment.baseUrl}/academic-staff`;

  constructor(private http: HttpClient) {}

  checkNicExists(nic: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check-nic/${nic}`).pipe(
      catchError(() => of(false))
    );
  }

  getAllAcademicStaff(): Observable<AcademicStaffDto[]> {
    return this.http.get<AcademicStaffDto[]>(this.baseUrl);
  }

  getAcademicStaffById(id: number): Observable<AcademicStaffDto> {
    return this.http.get<AcademicStaffDto>(`${this.baseUrl}/${id}`);
  }

  createAcademicStaff(academicStaff: AcademicStaffDto): Observable<AcademicStaffDto> {
    return this.http.post<AcademicStaffDto>(this.baseUrl, academicStaff);
  }

  updateAcademicStaff(id: number, academicStaff: AcademicStaffDto): Observable<AcademicStaffDto> {
    return this.http.put<AcademicStaffDto>(`${this.baseUrl}/${id}`, academicStaff);
  }

  deleteAcademicStaff(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // For timetable integration
  getTeachersForTimetable(): Observable<any[]> {
    return this.getAllAcademicStaff().pipe(
      map(teachers => teachers.map(teacher => ({
        id: teacher.id?.toString(),
        teacherId: teacher.teacherNumber || '',
        firstName: teacher.nameinFull?.split(' ')[0] || '',
        lastName: teacher.nameinFull?.split(' ').slice(1).join(' ') || '',
        fullName: teacher.nameinFull,
        email: teacher.emailAddress || '',
        phone: teacher.telephone?.toString() || '',
        subject: teacher.subjectTeaching1 || ''
      })))
    );
  }
}
