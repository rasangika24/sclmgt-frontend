// src/app/services/timetable/timetable.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpService } from '../http.service';

export interface TimetableDto {
  id?: number;
  teacherId: string;
  teacherName: string;
  dayOfWeek: string;
  periodNumber: number;
  startTime?: string; // Optional - backend will set based on periodNumber
  endTime?: string;   // Optional - backend will set based on periodNumber
  subject: string;
  grade: string;
  classRoom: string;
  academicYear: string;
  term: string;
  status?: number;
}

export interface TimetableWeeklyDto {
  teacherId: string;
  teacherName: string;
  academicYear: string;
  term: string;
  weeklySchedule: { [key: string]: TimetableDto[] };
}

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  private baseUrl = `${environment.baseUrl}/timetable`;

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

  // CREATE - Add new timetable entry
  addTimetable(timetable: TimetableDto): Observable<TimetableDto> {
    console.log('TimetableService: Adding timetable to URL:', this.baseUrl);
    console.log('TimetableService: Timetable data:', timetable);
    const headers = this.getHeaders();
    console.log('TimetableService: Headers:', headers);
    return this.http.post<TimetableDto>(this.baseUrl, timetable, { headers });
  }

  // READ - Get all timetables
  getAllTimetables(): Observable<TimetableDto[]> {
    const headers = this.getHeaders();
    return this.http.get<TimetableDto[]>(this.baseUrl, { headers });
  }

  // READ - Get timetable by ID
  getTimetableById(id: number): Observable<TimetableDto> {
    const headers = this.getHeaders();
    return this.http.get<TimetableDto>(`${this.baseUrl}/${id}`, { headers });
  }

  // UPDATE - Update existing timetable
  updateTimetable(id: number, timetable: TimetableDto): Observable<TimetableDto> {
    const headers = this.getHeaders();
    return this.http.put<TimetableDto>(`${this.baseUrl}/${id}`, timetable, { headers });
  }

  // DELETE - Delete timetable (soft delete)
  deleteTimetable(id: number): Observable<TimetableDto> {
    const headers = this.getHeaders();
    return this.http.delete<TimetableDto>(`${this.baseUrl}/${id}`, { headers });
  }

  // TEACHER SPECIFIC ENDPOINTS

  // Get all timetables for a specific teacher
  getTimetablesByTeacherId(teacherId: string): Observable<TimetableDto[]> {
    return this.http.get<TimetableDto[]>(`${this.baseUrl}/teacher/${teacherId}`);
  }

  // Get weekly timetable for a specific teacher
  getWeeklyTimetableByTeacherId(teacherId: string): Observable<TimetableWeeklyDto> {
    return this.http.get<TimetableWeeklyDto>(`${this.baseUrl}/teacher/${teacherId}/weekly`);
  }

  // Get timetables by teacher and academic year
  getTimetablesByTeacherIdAndAcademicYear(teacherId: string, academicYear: string): Observable<TimetableDto[]> {
    return this.http.get<TimetableDto[]>(`${this.baseUrl}/teacher/${teacherId}/academic-year/${academicYear}`);
  }

  // Get timetables by teacher, academic year and term
  getTimetablesByTeacherIdAndTerm(teacherId: string, academicYear: string, term: string): Observable<TimetableDto[]> {
    return this.http.get<TimetableDto[]>(`${this.baseUrl}/teacher/${teacherId}/academic-year/${academicYear}/term/${term}`);
  }

  // Get daily timetable for a specific teacher and day
  getDailyTimetableByTeacherId(teacherId: string, dayOfWeek: string): Observable<TimetableDto[]> {
    return this.http.get<TimetableDto[]>(`${this.baseUrl}/teacher/${teacherId}/day/${dayOfWeek}`);
  }

  // SEARCH AND FILTER ENDPOINTS

  // Search timetables by teacher name
  searchTimetablesByTeacherName(teacherName: string): Observable<TimetableDto[]> {
    const params = new HttpParams().set('teacherName', teacherName);
    return this.http.get<TimetableDto[]>(`${this.baseUrl}/search/teacher`, { params });
  }

  // Get timetables by subject
  getTimetablesBySubject(subject: string): Observable<TimetableDto[]> {
    return this.http.get<TimetableDto[]>(`${this.baseUrl}/subject/${subject}`);
  }

  // Get timetables by grade
  getTimetablesByGrade(grade: string): Observable<TimetableDto[]> {
    return this.http.get<TimetableDto[]>(`${this.baseUrl}/grade/${grade}`);
  }

  // Get timetables by academic year and term
  getTimetablesByAcademicYearAndTerm(academicYear: string, term: string): Observable<TimetableDto[]> {
    return this.http.get<TimetableDto[]>(`${this.baseUrl}/academic-year/${academicYear}/term/${term}`);
  }

  // UTILITY ENDPOINTS

  // Check for time conflicts
  checkTimeConflict(teacherId: string, dayOfWeek: string, startTime: string, endTime: string, excludeId?: number): Observable<boolean> {
    let params = new HttpParams()
      .set('teacherId', teacherId)
      .set('dayOfWeek', dayOfWeek)
      .set('startTime', startTime)
      .set('endTime', endTime);
    
    if (excludeId) {
      params = params.set('excludeId', excludeId.toString());
    }
    
    return this.http.get<boolean>(`${this.baseUrl}/conflict-check`, { params });
  }

  // Get available time slots for a teacher on a specific day
  getAvailableTimeSlots(teacherId: string, dayOfWeek: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/teacher/${teacherId}/available-slots/${dayOfWeek}`);
  }
}