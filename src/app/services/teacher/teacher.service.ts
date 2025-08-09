import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { AcademicServiceService } from '../academic/academic-service.service';
import { AcademicStaffDto } from '../../interfaces/academic-staff.interface';

export interface TeacherDto {
  id: string;
  teacherId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  department: string;
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private baseUrl = `${environment.baseUrl}/academic-staff`;

  constructor(
    private http: HttpClient,
    private academicService: AcademicServiceService
  ) {}

  // Get all active teachers (using academic staff)
  getAllTeachers(): Observable<TeacherDto[]> {
    return this.academicService.getAllAcademicStaff().pipe(
      map((teachers: AcademicStaffDto[]) => 
        teachers.map(teacher => ({
          id: teacher.id?.toString() || '',
          teacherId: teacher.teacherNumber?.toString() || '',
          firstName: teacher.nameinFull?.split(' ')[0] || '',
          lastName: teacher.nameinFull?.split(' ').slice(1).join(' ') || '',
          fullName: teacher.nameinFull || '',
          email: teacher.emailAddress || '',
          phone: teacher.telephone?.toString() || '',
          subject: teacher.subjectTeaching1 || '',
          department: '',
          status: 1
        }))
      )
    );
  }

  // Get teacher by ID
  getTeacherById(id: string): Observable<TeacherDto> {
    return this.academicService.getAcademicStaffById(parseInt(id)).pipe(
      map((teacher: AcademicStaffDto) => ({
        id: teacher.id!.toString(),
        teacherId: teacher.teacherNumber?.toString() || '',
        firstName: teacher.nameinFull?.split(' ')[0] || '',
        lastName: teacher.nameinFull?.split(' ').slice(1).join(' ') || '',
        fullName: teacher.nameinFull || '',
        email: teacher.emailAddress || '',
        phone: teacher.telephone?.toString() || '',
        subject: teacher.subjectTeaching1 || '',
        department: '',
        status: 1
      }))
    );
  }

  // Search teachers by name
  searchTeachers(searchTerm: string): Observable<TeacherDto[]> {
    return this.academicService.getAllAcademicStaff().pipe(
      map((teachers: AcademicStaffDto[]) => 
        teachers
          .filter(teacher => 
            teacher.nameinFull?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teacher.teacherNumber?.toString().includes(searchTerm)
          )
          .map((teacher: AcademicStaffDto) => ({
            id: teacher.id!.toString(),
            teacherId: teacher.teacherNumber?.toString() || '',
            firstName: teacher.nameinFull?.split(' ')[0] || '',
            lastName: teacher.nameinFull?.split(' ').slice(1).join(' ') || '',
            fullName: teacher.nameinFull || '',
            email: teacher.emailAddress || '',
            phone: teacher.telephone?.toString() || '',
            subject: teacher.subjectTeaching1 || '',
            department: '',
            status: 1
          }))
      )
    );
  }

  // Create new teacher (delegates to academic service)
  createTeacher(teacher: TeacherDto): Observable<TeacherDto> {
    const academicStaffDto: Partial<AcademicStaffDto> = {
      teacherNumber: parseInt(teacher.teacherId) || 0,
      nameinFull: teacher.fullName,
      nameWithInitials: teacher.fullName, // You might want to handle this differently
      emailAddress: teacher.email,
      telephone: parseInt(teacher.phone) || 0,
      subjectTeaching1: teacher.subject,
      appointmentDateAsEpf: new Date().toISOString().split('T')[0],
      nic: '' // This would need to be provided
    };

    return this.academicService.createAcademicStaff(academicStaffDto as AcademicStaffDto).pipe(
      map((response: AcademicStaffDto) => ({
        id: response.id!.toString(),
        teacherId: response.teacherNumber?.toString() || '',
        firstName: response.nameinFull?.split(' ')[0] || '',
        lastName: response.nameinFull?.split(' ').slice(1).join(' ') || '',
        fullName: response.nameinFull || '',
        email: response.emailAddress || '',
        phone: response.telephone?.toString() || '',
        subject: response.subjectTeaching1 || '',
        department: '',
        status: 1
      }))
    );
  }

  // Update teacher (delegates to academic service)
  updateTeacher(id: string, teacher: TeacherDto): Observable<TeacherDto> {
    const academicStaffDto: Partial<AcademicStaffDto> = {
      teacherNumber: parseInt(teacher.teacherId) || 0,
      nameinFull: teacher.fullName,
      nameWithInitials: teacher.fullName,
      emailAddress: teacher.email,
      telephone: parseInt(teacher.phone) || 0,
      subjectTeaching1: teacher.subject,
      appointmentDateAsEpf: new Date().toISOString().split('T')[0],
      nic: '' // This would need to be retrieved from existing data
    };

    return this.academicService.updateAcademicStaff(parseInt(id), academicStaffDto as AcademicStaffDto).pipe(
      map((response: AcademicStaffDto) => ({
        id: response.id!.toString(),
        teacherId: response.teacherNumber?.toString() || '',
        firstName: response.nameinFull?.split(' ')[0] || '',
        lastName: response.nameinFull?.split(' ').slice(1).join(' ') || '',
        fullName: response.nameinFull || '',
        email: response.emailAddress || '',
        phone: response.telephone?.toString() || '',
        subject: response.subjectTeaching1 || '',
        department: '',
        status: 1
      }))
    );
  }

  // Delete teacher (delegates to academic service)
  deleteTeacher(id: string): Observable<void> {
    return this.academicService.deleteAcademicStaff(parseInt(id));
  }
}
