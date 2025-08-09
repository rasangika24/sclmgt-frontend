import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { 
  ReliefPeriodService, 
  TeacherAbsenceDto, 
  ReliefPeriodDto, 
  TimetableDto, 
  AvailableTeacherDto 
} from '../../services/relief-period.service';
import { AcademicServiceService } from '../../services/academic/academic-service.service';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-relief-period-management',
  standalone: false,
  templateUrl: './relief-period-management.component.html',
  styleUrl: './relief-period-management.component.scss'
})
export class ReliefPeriodManagementComponent implements OnInit {
  
  // View states
  currentView: 'markAbsent' | 'assignRelief' | 'reports' = 'markAbsent';
  isLoading = false;

  // Forms
  markAbsentForm: FormGroup = this.fb.group({});
  assignReliefForm: FormGroup = this.fb.group({});

  // Data
  absentTeachers: TeacherAbsenceDto[] = [];
  selectedTeacherTimetable: TimetableDto[] = [];
  reliefPeriods: ReliefPeriodDto[] = [];
  availableTeachers: AvailableTeacherDto[] = [];
  allTeachers: any[] = []; // Teachers from academic service
  reportData: any = null;

  // Loading states
  isLoadingTimetable = false;
  isLoadingAvailableTeachers = false;
  timetableError: string | null = null;

  // Selection states
  selectedDate: Date | null = null;
  selectedTeacher: string = '';
  selectedPeriod: TimetableDto | null = null;
  selectedReliefTeacher: string = '';

  // Date options
  dateOptions: string[] = [];
  
  constructor(
    private fb: FormBuilder,
    private reliefService: ReliefPeriodService,
    private academicService: AcademicServiceService,
    private messageService: MessageServiceService
  ) {
    this.initializeForms();
    this.generateDateOptions();
  }

  ngOnInit(): void {
    this.loadData();
  }

  private initializeForms(): void {
    this.markAbsentForm = this.fb.group({
      teacherId: ['', Validators.required],
      teacherName: ['', Validators.required],
      absenceDate: ['', Validators.required],
      reason: [''],
      markedBy: ['Admin'] // You can get this from auth service
    });

    this.assignReliefForm = this.fb.group({
      date: ['', Validators.required],
      absentTeacherId: ['', Validators.required],
      periodNumber: ['', Validators.required],
      reliefTeacherId: ['', Validators.required],
      reliefTeacherName: [''],
      assignedBy: ['Admin'], // You can get this from auth service
      remarks: ['']
    });
  }

  private generateDateOptions(): void {
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      this.dateOptions.push(date.toISOString().split('T')[0]);
    }
  }

  private loadData(): void {
    // Load teachers and initial data
    this.loadTeachers();
    this.loadAbsentTeachers();
  }

  private loadTeachers(): void {
    this.academicService.getTeachersForTimetable().subscribe({
      next: (teachers) => {
        this.allTeachers = teachers;
      },
      error: (error) => {
        console.error('Error loading teachers:', error);
        this.messageService.showError('Failed to load teachers');
      }
    });
  }

  // ============================================
  // VIEW MANAGEMENT
  // ============================================

  setCurrentView(view: 'markAbsent' | 'assignRelief' | 'reports'): void {
    this.currentView = view;
    this.resetSelections();
  }

  private resetSelections(): void {
    this.selectedDate = null;
    this.selectedTeacher = '';
    this.selectedPeriod = null;
    this.selectedReliefTeacher = '';
    this.selectedTeacherTimetable = [];
    this.availableTeachers = [];
    this.isLoadingTimetable = false;
    this.isLoadingAvailableTeachers = false;
    this.timetableError = null;
  }

  // ============================================
  // MARK ABSENT FUNCTIONALITY
  // ============================================

  onMarkTeacherAbsent(): void {
    if (this.markAbsentForm.valid) {
      this.isLoading = true;
      const formData = this.markAbsentForm.value;
      
      // Convert date to string format
      const absenceData: TeacherAbsenceDto = {
        teacherId: formData.teacherId,
        teacherName: formData.teacherName,
        absenceDate: this.formatDateForBackend(formData.absenceDate),
        reason: formData.reason,
        markedBy: formData.markedBy
      };
      
      this.reliefService.markTeacherAbsent(absenceData).subscribe({
        next: (response) => {
          this.messageService.showSuccess('Teacher marked absent successfully');
          this.markAbsentForm.reset();
          this.loadAbsentTeachers();
          this.isLoading = false;
        },
        error: (error) => {
          this.messageService.showError('Failed to mark teacher absent: ' + error.message);
          this.isLoading = false;
        }
      });
    }
  }

  private loadAbsentTeachers(): void {
    if (this.selectedDate) {
      const dateString = this.formatDateForBackend(this.selectedDate);
      this.reliefService.getAbsentTeachers(dateString).subscribe({
        next: (teachers) => {
          this.absentTeachers = teachers;
        },
        error: (error) => {
          console.error('Error loading absent teachers:', error);
          this.messageService.showError('Failed to load absent teachers');
        }
      });
    } else {
      // Load all active absences if no date is selected
      this.reliefService.getAllActiveAbsences().subscribe({
        next: (teachers) => {
          this.absentTeachers = teachers;
        },
        error: (error) => {
          console.error('Error loading active absences:', error);
          this.messageService.showError('Failed to load active absences');
        }
      });
    }
  }

  // ============================================
  // ASSIGN RELIEF FUNCTIONALITY
  // ============================================

  onDateChange(): void {
    if (this.selectedDate) {
      this.loadAbsentTeachers();
      this.selectedTeacher = '';
      this.selectedTeacherTimetable = [];
      this.selectedPeriod = null;
      this.availableTeachers = [];
    }
  }

  onTeacherSelect(): void {
    if (this.selectedTeacher && this.selectedDate) {
      this.loadTeacherTimetable();
    } else {
      this.selectedTeacherTimetable = [];
      this.selectedPeriod = null;
      this.availableTeachers = [];
      this.isLoadingTimetable = false;
      this.timetableError = null;
    }
  }

  loadTeacherTimetable(): void {
    if (this.selectedTeacher && this.selectedDate) {
      this.isLoadingTimetable = true;
      this.timetableError = null;
      
      const dateString = this.formatDateForBackend(this.selectedDate);
      const dayOfWeek = this.getDayOfWeek(dateString).toLowerCase();
      
      // Validate inputs before making API call
      if (!this.selectedTeacher || !dayOfWeek) {
        this.isLoadingTimetable = false;
        this.timetableError = 'Invalid teacher ID or date selected.';
        return;
      }
      
      console.log('Date conversion debug:');
      console.log('Selected Date:', this.selectedDate);
      console.log('Date String:', dateString);
      console.log('Computed Day:', dayOfWeek);
      console.log('API URL will be: /timetable/teacher/' + this.selectedTeacher + '/day/' + dayOfWeek);
      
      this.reliefService.getAbsentTeacherTimetable(this.selectedTeacher, dateString).subscribe({
        next: (timetable) => {
          this.selectedTeacherTimetable = timetable;
          this.selectedPeriod = null;
          this.availableTeachers = [];
          this.isLoadingTimetable = false;
          
          if (timetable.length === 0) {
            this.timetableError = `No timetable found for ${this.getSelectedTeacherName()} on ${dayOfWeek}. This teacher may not have any scheduled classes on this day.`;
          }
        },
        error: (error) => {
          this.isLoadingTimetable = false;
          console.error('Error loading teacher timetable:', error);
          
          // Set user-friendly error message
          if (error.status === 404) {
            this.timetableError = `No timetable found for ${this.getSelectedTeacherName()} on ${dayOfWeek}. This teacher may not have any scheduled classes on this day.`;
          } else if (error.status === 500) {
            this.timetableError = `Server error while loading timetable. Please check if the timetable data exists for teacher ${this.selectedTeacher} on ${dayOfWeek}.`;
          } else if (error.status === 0) {
            this.timetableError = `Cannot connect to server. Please check your internet connection and try again.`;
          } else {
            this.timetableError = `Failed to load timetable: ${error.error?.message || error.message || 'Unknown error'}`;
          }
          
          this.selectedTeacherTimetable = [];
        }
      });
    }
  }

  onPeriodSelect(period: TimetableDto): void {
    this.selectedPeriod = period;
    this.loadAvailableTeachers(period.periodNumber);
  }

  loadAvailableTeachers(periodNumber: number): void {
    if (this.selectedDate) {
      this.isLoadingAvailableTeachers = true;
      const dateString = this.formatDateForBackend(this.selectedDate);
      console.log('Loading available teachers for date:', dateString, 'and period:', periodNumber);
      this.reliefService.getAvailableTeachers(dateString, periodNumber).subscribe({
        next: (teachers) => {
          // Enhance teacher data with names from academic service
          this.availableTeachers = teachers.filter(t => t.isAvailable).map(teacher => {
            const academicTeacher = this.allTeachers.find(at => at.teacherId === teacher.teacherId);
            return {
              ...teacher,
              teacherName: academicTeacher ? academicTeacher.fullName : teacher.teacherName
            };
          });
          this.isLoadingAvailableTeachers = false;
        },
        error: (error) => {
          this.isLoadingAvailableTeachers = false;
          console.error('Error loading available teachers:', error);
          
          // Fallback: show all teachers except the absent one
          this.availableTeachers = this.allTeachers
            .filter(teacher => teacher.teacherId !== this.selectedTeacher)
            .map(teacher => ({
              teacherId: teacher.teacherId,
              teacherName: teacher.fullName,
              isAvailable: true
            }));
        }
      });
    }
  }

  onAssignRelief(reliefTeacherId: string, reliefTeacherName: string): void {
    if (!this.selectedPeriod || !this.selectedDate) return;

    const dateString = this.formatDateForBackend(this.selectedDate);
    const reliefPeriod: ReliefPeriodDto = {
      absentTeacherId: this.selectedTeacher,
      absentTeacherName: this.absentTeachers.find(t => t.teacherId === this.selectedTeacher)?.teacherName || '',
      reliefTeacherId: reliefTeacherId,
      reliefTeacherName: reliefTeacherName,
      date: dateString,
      dayOfWeek: this.getDayOfWeek(dateString),
      periodNumber: this.selectedPeriod.periodNumber,
      subject: this.selectedPeriod.subject,
      grade: this.selectedPeriod.grade,
      classRoom: this.selectedPeriod.classRoom,
      status: 'ASSIGNED',
      assignedBy: 'Admin' // Get from auth service
    };

    this.reliefService.assignReliefTeacher(reliefPeriod).subscribe({
      next: (response) => {
        this.messageService.showSuccess('Relief teacher assigned successfully');
        this.loadReliefPeriods();
        // Remove assigned teacher from available list
        this.availableTeachers = this.availableTeachers.filter(t => t.teacherId !== reliefTeacherId);
      },
      error: (error) => {
        this.messageService.showError('Failed to assign relief teacher: ' + error.message);
      }
    });
  }

  private getDayOfWeek(dateString: string): string {
    // Parse date safely to avoid timezone issues
    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Month is 0-indexed
    const day = parseInt(dateParts[2]);
    const date = new Date(year, month, day);
    
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    return days[date.getDay()];
  }

  // ============================================
  // REPORTS FUNCTIONALITY
  // ============================================

  loadReliefPeriods(): void {
    if (this.selectedDate) {
      const dateString = this.formatDateForBackend(this.selectedDate);
      this.reliefService.getReliefPeriods(dateString).subscribe({
        next: (periods) => {
          this.reliefPeriods = periods;
        },
        error: (error) => {
          this.messageService.showError('Failed to load relief periods');
        }
      });
    }
  }

  generateReport(): void {
    if (!this.selectedDate) return;
    
    const startDate = this.formatDateForBackend(this.selectedDate);
    const endDate = new Date(this.selectedDate);
    endDate.setDate(endDate.getDate() + 7);
    
    this.reliefService.getReliefPeriodReport(startDate, this.formatDateForBackend(endDate)).subscribe({
      next: (report) => {
        this.reportData = report;
      },
      error: (error) => {
        this.messageService.showError('Failed to generate report');
      }
    });
  }

  cancelReliefPeriod(periodId: number): void {
    this.reliefService.cancelReliefPeriod(periodId).subscribe({
      next: (response) => {
        this.messageService.showSuccess('Relief period cancelled successfully');
        this.loadReliefPeriods();
      },
      error: (error) => {
        this.messageService.showError('Failed to cancel relief period');
      }
    });
  }

  // ============================================
  // UTILITY METHODS
  // ============================================

  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING': return 'badge-warning';
      case 'ASSIGNED': return 'badge-success';
      case 'COMPLETED': return 'badge-info';
      case 'CANCELLED': return 'badge-danger';
      default: return 'badge-secondary';
    }
  }

  // Helper method to get teacher name from ID
  getTeacherNameById(teacherId: string): string {
    const teacher = this.allTeachers.find(t => t.teacherId === teacherId);
    return teacher ? teacher.fullName : teacherId;
  }

  // Helper method to get selected absent teacher name
  getSelectedTeacherName(): string {
    const teacher = this.absentTeachers.find(t => t.teacherId === this.selectedTeacher);
    return teacher ? teacher.teacherName : 'Unknown Teacher';
  }

  // Force refresh timetable data
  refreshTimetableData(): void {
    if (this.selectedTeacher && this.selectedDate) {
      this.selectedTeacherTimetable = [];
      this.selectedPeriod = null;
      this.availableTeachers = [];
      this.isLoadingTimetable = false;
      this.timetableError = null;
      this.loadTeacherTimetable();
    }
  }

  // Auto-fill teacher name when teacher ID is selected
  onTeacherIdChange(): void {
    const teacherId = this.markAbsentForm.get('teacherId')?.value;
    if (teacherId) {
      const teacherName = this.getTeacherNameById(teacherId);
      this.markAbsentForm.patchValue({ teacherName });
    }
  }

  formatTime(time: string | number[]): string {
    if (!time) return '';
    
    // Handle array format like [8, 0] from backend
    if (Array.isArray(time)) {
      const hours = time[0].toString().padStart(2, '0');
      const minutes = time[1].toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    
    // Handle string format like "08:00"
    if (typeof time === 'string') {
      return time.substring(0, 5);
    }
    
    return '';
  }

  // Date formatting utility methods
  formatDateForBackend(date: Date): string {
    if (!date) return '';
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
  }

  formatDateFromBackend(dateString: string): Date {
    return new Date(dateString);
  }
}
