import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

// DTOs matching backend
export interface TeacherAbsenceDto {
  id?: number;
  teacherId: string;
  teacherName: string;
  absenceDate: string; // Format: YYYY-MM-DD
  reason?: string;
  status?: string;
  createdAt?: string;
  markedBy?: string;
}

export interface ReliefPeriodDto {
  id?: number;
  absentTeacherId: string;
  absentTeacherName: string;
  reliefTeacherId?: string;
  reliefTeacherName?: string;
  date: string; // Format: YYYY-MM-DD
  dayOfWeek: string;
  periodNumber: number;
  subject?: string;
  grade?: string;
  classRoom?: string;
  status: string;
  remarks?: string;
  createdAt?: string;
  updatedAt?: string;
  assignedBy?: string;
}

export interface TimetableDto {
  id?: number;
  teacherId: string;
  teacherName?: string;
  dayOfWeek: string;
  periodNumber: number;
  startTime: string | number[];
  endTime: string | number[];
  subject: string;
  grade: string;
  classRoom: string;
  academicYear?: string;
  term?: string;
  status?: number;
}

export interface AvailableTeacherDto {
  teacherId: string;
  teacherName: string;
  isAvailable: boolean;
  freePeriods?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReliefPeriodService {
  private readonly baseUrl = `${environment.baseUrl}/relief-period`;

  constructor(private http: HttpClient) {}

  private getHttpOptions() {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    const headers: any = {
      'Content-Type': 'application/json'
    };
    
    // Only add Authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return {
      headers: new HttpHeaders(headers)
    };
  }

  // ============================================
  // TEACHER ABSENCE MANAGEMENT
  // ============================================

  // Mark teacher absent
  markTeacherAbsent(teacherAbsence: TeacherAbsenceDto): Observable<TeacherAbsenceDto> {
    return this.http.post<TeacherAbsenceDto>(
      `${this.baseUrl}/absence`, 
      teacherAbsence, 
      this.getHttpOptions()
    );
  }

  // Get absent teachers for a specific date
  getAbsentTeachers(date: string): Observable<TeacherAbsenceDto[]> {
    return this.http.get<TeacherAbsenceDto[]>(
      `${this.baseUrl}/absence/date/${date}`, 
      this.getHttpOptions()
    );
  }

  // Get all active absences
  getAllActiveAbsences(): Observable<TeacherAbsenceDto[]> {
    return this.http.get<TeacherAbsenceDto[]>(
      `${this.baseUrl}/absence/active`, 
      this.getHttpOptions()
    );
  }

  // ============================================
  // TIMETABLE MANAGEMENT
  // ============================================

  // Get timetable for absent teacher
  getAbsentTeacherTimetable(teacherId: string, date: string): Observable<TimetableDto[]> {
    // Convert date to day of week for timetable API
    const dayOfWeek = this.getDayOfWeekFromDate(date);
    const apiUrl = `${environment.baseUrl}/timetable/teacher/${teacherId}/day/${dayOfWeek}`;
    
    console.log('Loading timetable for teacher:', teacherId, 'on', dayOfWeek);
    
    // Use the timetable endpoint for getting teacher's schedule
    return this.http.get<TimetableDto[]>(apiUrl, this.getHttpOptions()).pipe(
      map((response: TimetableDto[]) => {
        console.log('Timetable loaded successfully. Periods found:', response?.length || 0);
        return response || []; // Ensure we always return an array
      })
    );
  }

  // Helper method to convert date string to day of week
  private getDayOfWeekFromDate(dateString: string): string {
    // Parse date safely to avoid timezone issues
    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Month is 0-indexed
    const day = parseInt(dateParts[2]);
    const date = new Date(year, month, day);
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday','sunday'];
    return days[date.getDay()];
  }

  // ============================================
  // AVAILABLE TEACHERS
  // ============================================

  // Get available teachers for a specific period
  getAvailableTeachers(date: string, periodNumber: number): Observable<AvailableTeacherDto[]> {
    // Use date directly instead of converting to day of week
    const params = new HttpParams()
      .set('date', date)
      .set('periodNumber', periodNumber.toString());
    
    console.log('Requesting available teachers for date:', date, 'period:', periodNumber);
    
    // Use the free-teachers endpoint that expects date parameter
    return this.http.get<any[]>(
      `${environment.baseUrl}/timetable/free-teachers`, 
      { ...this.getHttpOptions(), params }
    ).pipe(
      map((freeTeachers: any[]) => {
        console.log('Free teachers API Response:', freeTeachers);
        // Transform the response to AvailableTeacherDto array
        return freeTeachers.map(teacher => ({
          teacherId: teacher.teacherId || teacher.id || teacher.teacher_id,
          teacherName: teacher.teacherName || teacher.name || teacher.teacher_name || `Teacher ${teacher.teacherId || teacher.id}`,
          isAvailable: true
        }));
      })
    );
  }

  // ============================================
  // RELIEF PERIOD MANAGEMENT
  // ============================================

  // Assign relief teacher
  assignReliefTeacher(reliefPeriod: ReliefPeriodDto): Observable<ReliefPeriodDto> {
    return this.http.post<ReliefPeriodDto>(
      `${this.baseUrl}/assign`, 
      reliefPeriod, 
      this.getHttpOptions()
    );
  }

  // Get relief periods for a specific date
  getReliefPeriods(date: string): Observable<ReliefPeriodDto[]> {
    return this.http.get<ReliefPeriodDto[]>(
      `${this.baseUrl}/date/${date}`, 
      this.getHttpOptions()
    );
  }

  // Get relief periods by teacher
  getReliefPeriodsByTeacher(teacherId: string, date: string): Observable<ReliefPeriodDto[]> {
    return this.http.get<ReliefPeriodDto[]>(
      `${this.baseUrl}/teacher/${teacherId}/date/${date}`, 
      this.getHttpOptions()
    );
  }

  // Update relief period
  updateReliefPeriod(id: number, reliefPeriod: ReliefPeriodDto): Observable<ReliefPeriodDto> {
    return this.http.put<ReliefPeriodDto>(
      `${this.baseUrl}/${id}`, 
      reliefPeriod, 
      this.getHttpOptions()
    );
  }

  // Cancel relief period
  cancelReliefPeriod(id: number): Observable<ReliefPeriodDto> {
    return this.http.put<ReliefPeriodDto>(
      `${this.baseUrl}/${id}/cancel`, 
      {}, 
      this.getHttpOptions()
    );
  }

  // ============================================
  // REPORTS
  // ============================================

  // Get relief period report
  getReliefPeriodReport(startDate: string, endDate: string): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    
    return this.http.get<any>(
      `${this.baseUrl}/report`, 
      { ...this.getHttpOptions(), params }
    );
  }
}
