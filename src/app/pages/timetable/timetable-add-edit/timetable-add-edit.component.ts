import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimetableService, TimetableDto } from '../../../services/timetable/timetable.service';
import { TeacherService, TeacherDto } from '../../../services/teacher/teacher.service';
import { MessageServiceService } from '../../../services/message-service/message-service.service';

export interface TimeSlotDto {
  periodNumber: number;
  startTime: string;
  endTime: string;
  name: string;
}

export interface TimetableDialogData {
  isEdit: boolean;
  teacherId?: string;
  dayOfWeek?: string;
  periodNumber?: number;
  timetable?: TimetableDto | null;
}

@Component({
  selector: 'app-timetable-add-edit',
  templateUrl: './timetable-add-edit.component.html',
  styleUrls: ['./timetable-add-edit.component.scss']
})
export class TimetableAddEditComponent implements OnInit {
  timetableForm!: FormGroup;
  teachers: TeacherDto[] = [];
  timeSlots: TimeSlotDto[] = [];
  isEditMode = false;
  
  daysOfWeek = [
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' }
  ];

  periods = Array.from({ length: 10 }, (_, i) => i + 1);
  subjects = ['Mathematics', 'Science', 'English', 'Sinhala', 'History', 'Geography', 'ICT', 'Buddhism', 'Art', 'Music'];
  grades = ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'Grade 13'];

  constructor(
    private fb: FormBuilder,
    private timetableService: TimetableService,
    private teacherService: TeacherService,
    private messageService: MessageServiceService,
    private dialogRef: MatDialogRef<TimetableAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TimetableDialogData
  ) {
    this.isEditMode = data?.isEdit || false;
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadTeachers();
    this.loadTimeSlots();
    this.testBackendConnection(); // Add connectivity test
    if (this.isEditMode) {
      this.patchFormData();
    }
    
    // Trigger period change to set initial times if period is pre-selected
    if (this.data?.periodNumber) {
      setTimeout(() => this.onPeriodChange(), 100);
    }
  }

  private testBackendConnection(): void {
    console.log('Testing backend connection...');
    this.timetableService.getAllTimetables().subscribe({
      next: (timetables) => {
        console.log('✅ Backend connection successful. Existing timetables:', timetables);
      },
      error: (error) => {
        console.error('❌ Backend connection failed:', error);
        if (error.status === 0) {
          console.error('🔥 Backend is not running or CORS issue');
        } else if (error.status === 403) {
          console.error('🔒 Authentication required - make sure you are logged in');
        } else if (error.status === 401) {
          console.error('🔒 Authentication failed - please log in again');
        }
      }
    });
  }

  private initializeForm(): void {
    this.timetableForm = this.fb.group({
      teacherId: [this.data?.teacherId || '', Validators.required],
      grade: ['', Validators.required],
      periodNumber: [this.data?.periodNumber || '', Validators.required],
      subject: ['', Validators.required],
      classRoom: ['', Validators.required],
      dayOfWeek: [this.data?.dayOfWeek || '', Validators.required],
      startTime: [''], // Display only - not sent to backend
      endTime: [''],   // Display only - not sent to backend
      academicYear: ['2025', Validators.required],
      term: ['Term 1', Validators.required]
    });
  }

  private loadTeachers(): void {
    this.teacherService.getAllTeachers().subscribe({
      next: (teachers) => {
        this.teachers = teachers;
      },
      error: (error) => {
        this.messageService.showError('Failed to load teachers: ' + error.message);
      }
    });
  }

  private loadTimeSlots(): void {
    // Create default time slots if service doesn't have them
    this.timeSlots = [
      { periodNumber: 1, startTime: '08:00', endTime: '08:40', name: 'Period 1' },
      { periodNumber: 2, startTime: '08:40', endTime: '09:20', name: 'Period 2' },
      { periodNumber: 3, startTime: '09:20', endTime: '10:00', name: 'Period 3' },
      { periodNumber: 4, startTime: '10:20', endTime: '11:00', name: 'Period 4' },
      { periodNumber: 5, startTime: '11:00', endTime: '11:40', name: 'Period 5' },
      { periodNumber: 6, startTime: '11:40', endTime: '12:20', name: 'Period 6' },
      { periodNumber: 7, startTime: '13:20', endTime: '14:00', name: 'Period 7' },
      { periodNumber: 8, startTime: '14:00', endTime: '14:40', name: 'Period 8' }
    ];
  }

  private patchFormData(): void {
    if (this.data?.timetable) {
      this.timetableForm.patchValue(this.data.timetable);
    }
  }

  onPeriodChange(): void {
    const periodNumber = this.timetableForm.get('periodNumber')?.value;
    if (periodNumber) {
      const selectedSlot = this.timeSlots.find(slot => slot.periodNumber === periodNumber);
      if (selectedSlot) {
        this.timetableForm.patchValue({
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime
        });
      }
    }
  }

  onSubmit(): void {
    console.log('Form valid:', this.timetableForm.valid);
    console.log('Form value before processing:', this.timetableForm.value);
    console.log('Form errors:', this.getFormValidationErrors());
    
    if (this.timetableForm.valid) {
      const formData = { ...this.timetableForm.value }; // Create a copy
      
      // Add teacher name based on selected teacher ID
      const selectedTeacher = this.teachers.find(t => t.teacherId === formData.teacherId);
      if (selectedTeacher) {
        formData.teacherName = selectedTeacher.fullName;
        console.log('Added teacher name:', formData.teacherName);
      } else {
        console.warn('Teacher not found for ID:', formData.teacherId);
        this.messageService.showError('Please select a valid teacher');
        return;
      }

      console.log('Final form data before submission:', formData);

      if (this.isEditMode) {
        this.updateTimetable(formData);
      } else {
        this.createTimetable(formData);
      }
    } else {
      console.log('Form is invalid. Errors:', this.getFormValidationErrors());
      this.markFormGroupTouched();
      this.messageService.showError('Please fill in all required fields');
    }
  }

  private getFormValidationErrors(): any {
    const errors: any = {};
    Object.keys(this.timetableForm.controls).forEach(key => {
      const control = this.timetableForm.get(key);
      if (control && control.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.timetableForm.controls).forEach(key => {
      const control = this.timetableForm.get(key);
      control?.markAsTouched();
    });
  }

  private createTimetable(timetableData: TimetableDto): void {
    console.log('Creating timetable with data:', timetableData);
    
    // Validate required fields before sending
    if (!timetableData.teacherId || !timetableData.subject || !timetableData.grade || !timetableData.periodNumber) {
      this.messageService.showError('Missing required fields: teacherId, subject, grade, or periodNumber');
      return;
    }

    // Create a clean copy of the data without startTime and endTime
    // Backend will handle time slots based on periodNumber
    const cleanTimetableData = {
      teacherId: timetableData.teacherId,
      teacherName: timetableData.teacherName,
      dayOfWeek: timetableData.dayOfWeek,
      periodNumber: timetableData.periodNumber,
      subject: timetableData.subject,
      grade: timetableData.grade,
      classRoom: timetableData.classRoom,
      academicYear: timetableData.academicYear,
      term: timetableData.term
    };

    console.log('Cleaned timetable data (without time fields):', cleanTimetableData);
    
    this.timetableService.addTimetable(cleanTimetableData as TimetableDto).subscribe({
      next: (result) => {
        console.log('Timetable created successfully:', result);
        this.messageService.showSuccess('Timetable entry added successfully');
        this.dialogRef.close(result);
      },
      error: (error) => {
        console.error('Create error:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error details:', error.error);
        
        let errorMessage = 'Failed to create timetable';
        if (error.status === 0) {
          errorMessage = 'Cannot connect to server. Please check if the backend is running.';
        } else if (error.status === 403) {
          errorMessage = 'Access denied. Please make sure you are logged in with proper permissions.';
        } else if (error.status === 401) {
          errorMessage = 'Authentication failed. Please log in again.';
        } else if (error.status === 400) {
          errorMessage = 'Invalid data. Please check all required fields are filled correctly.';
        } else if (error.error?.message) {
          errorMessage = 'Server error: ' + error.error.message;
        } else if (error.message) {
          errorMessage = 'Error: ' + error.message;
        } else if (error.status) {
          errorMessage = `HTTP Error ${error.status}: ${error.statusText || 'Unknown error'}`;
        }
        
        this.messageService.showError(errorMessage);
      }
    });
  }

  private updateTimetable(timetableData: TimetableDto): void {
    if (!this.data?.timetable?.id) {
      this.messageService.showError('Timetable ID is missing for update');
      return;
    }
    
    this.timetableService.updateTimetable(this.data.timetable.id, timetableData).subscribe({
      next: (result) => {
        this.messageService.showSuccess('Timetable updated successfully');
        this.dialogRef.close(result);
      },
      error: (error) => {
        console.error('Update error:', error);
        this.messageService.showError('Failed to update timetable: ' + (error.error?.message || error.message));
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getErrorMessage(fieldName: string): string {
    const control = this.timetableForm.get(fieldName);
    if (control?.hasError('required')) {
      return `${fieldName} is required`;
    }
    return '';
  }
}
