// src/app/pages/timetable/timetable.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { TimetableService, TimetableDto, TimetableWeeklyDto } from '../../services/timetable/timetable.service';
import { TeacherService, TeacherDto } from '../../services/teacher/teacher.service';
import { MessageServiceService } from '../../services/message-service/message-service.service';
import { TimetableAddEditComponent } from './timetable-add-edit/timetable-add-edit.component';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {
  displayedColumns: string[] = [
    'teacherName', 'dayOfWeek', 'periodNumber', 'startTime', 'endTime', 
    'subject', 'grade', 'classRoom', 'actions'
  ];
  
  dataSource!: MatTableDataSource<TimetableDto>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Teacher selection
  teachers: TeacherDto[] = [];
  selectedTeacherControl = new FormControl('');
  selectedTeacher: TeacherDto | null = null;
  selectedTeacherDetails: any = null;

  // Weekly view properties
  weeklyTimetableData: TimetableWeeklyDto | null = null;
  showWeeklyView = false;
  weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  periods = Array.from({length: 8}, (_, i) => i + 1);

  // Filter options
  filterOptions = {
    day: '',
    subject: '',
    grade: '',
    academicYear: '2024',
    term: 'Term 1'
  };

  daysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
  terms = ['Term 1', 'Term 2', 'Term 3'];
  academicYears = ['2024', '2025', '2026'];

  constructor(
    private timetableService: TimetableService,
    private teacherService: TeacherService,
    private messageService: MessageServiceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTeachers();
    this.loadTimetables();
    
    // Subscribe to teacher selection changes
    this.selectedTeacherControl.valueChanges.subscribe(teacherId => {
      if (teacherId) {
        this.selectedTeacher = this.teachers.find(t => t.teacherId === teacherId || t.id === teacherId) || null;
        if (this.selectedTeacher) {
          this.loadTeacherDetails(this.selectedTeacher.id);
          this.loadTeacherTimetables(teacherId);
        }
      } else {
        this.selectedTeacher = null;
        this.selectedTeacherDetails = null;
        this.loadTimetables();
      }
    });
  }

  loadTeachers(): void {
    this.teacherService.getAllTeachers().subscribe({
      next: (teachers) => {
        this.teachers = teachers.filter(t => t.status === 1); // Only active teachers
        console.log('Loaded teachers:', this.teachers);
      },
      error: (error) => {
        console.error('Error loading teachers:', error);
        this.messageService.showError('Failed to load teachers: ' + error.message);
      }
    });
  }

  loadTeacherDetails(teacherId: string): void {
    this.teacherService.getTeacherById(teacherId).subscribe({
      next: (teacherDetails) => {
        this.selectedTeacherDetails = teacherDetails;
        console.log('Loaded teacher details:', teacherDetails);
      },
      error: (error) => {
        console.error('Error loading teacher details:', error);
        this.messageService.showError('Failed to load teacher details: ' + error.message);
      }
    });
  }

  loadTimetables(): void {
    this.timetableService.getAllTimetables().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.setupCustomFilter();
      },
      error: (error) => {
        this.messageService.showError('Failed to load timetables: ' + error.message);
      }
    });
  }

  loadTeacherTimetables(teacherId: string): void {
    this.timetableService.getTimetablesByTeacherId(teacherId).subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.setupCustomFilter();
      },
      error: (error) => {
        this.messageService.showError('Failed to load teacher timetables: ' + error.message);
      }
    });
  }

  setupCustomFilter(): void {
    this.dataSource.filterPredicate = (data: TimetableDto, filter: string) => {
      const searchTerm = filter.toLowerCase();
      return data.teacherName.toLowerCase().includes(searchTerm) ||
             data.dayOfWeek.toLowerCase().includes(searchTerm) ||
             data.subject.toLowerCase().includes(searchTerm) ||
             data.grade.toLowerCase().includes(searchTerm) ||
             data.classRoom.toLowerCase().includes(searchTerm);
    };
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyDayFilter(): void {
    if (this.filterOptions.day) {
      this.dataSource.filter = this.filterOptions.day.toLowerCase();
    } else {
      this.dataSource.filter = '';
    }
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(TimetableAddEditComponent, {
      width: '700px',
      data: { 
        teachers: this.teachers,
        selectedTeacher: this.selectedTeacher,
        selectedTeacherDetails: this.selectedTeacherDetails
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.selectedTeacher) {
          this.loadTeacherTimetables(this.selectedTeacher.teacherId);
        } else {
          this.loadTimetables();
        }
        this.messageService.showSuccess('Timetable entry added successfully!');
      }
    });
  }

  openEditDialog(timetable: TimetableDto): void {
    const dialogRef = this.dialog.open(TimetableAddEditComponent, {
      width: '700px',
      data: { 
        ...timetable,
        teachers: this.teachers,
        selectedTeacher: this.selectedTeacher,
        selectedTeacherDetails: this.selectedTeacherDetails,
        isEdit: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.selectedTeacher) {
          this.loadTeacherTimetables(this.selectedTeacher.teacherId);
        } else {
          this.loadTimetables();
        }
        this.messageService.showSuccess('Timetable entry updated successfully!');
      }
    });
  }

  deleteTimetable(id: number): void {
    if (confirm('Are you sure you want to delete this timetable entry?')) {
      this.timetableService.deleteTimetable(id).subscribe({
        next: () => {
          if (this.selectedTeacher) {
            this.loadTeacherTimetables(this.selectedTeacher.teacherId);
          } else {
            this.loadTimetables();
          }
          this.messageService.showSuccess('Timetable entry deleted successfully!');
        },
        error: (error) => {
          this.messageService.showError('Failed to delete timetable entry: ' + error.message);
        }
      });
    }
  }

  viewWeeklyTimetable(): void {
    if (!this.selectedTeacher) {
      this.messageService.showError('Please select a teacher first');
      return;
    }
    
    this.timetableService.getWeeklyTimetableByTeacherId(this.selectedTeacher.teacherId).subscribe({
      next: (weeklyData) => {
        console.log('Weekly timetable:', weeklyData);
        this.weeklyTimetableData = weeklyData;
        this.showWeeklyView = true;
        this.messageService.showSuccess('Weekly timetable loaded for ' + this.selectedTeacher?.fullName);
      },
      error: (error) => {
        console.error('Error loading weekly timetable:', error);
        this.messageService.showError('Failed to load weekly timetable: ' + error.message);
      }
    });
  }

  // Close weekly view and return to normal view
  closeWeeklyView(): void {
    this.showWeeklyView = false;
    this.weeklyTimetableData = null;
  }

  // Get timetable entry for specific day and period
  getTimetableEntry(day: string, period: number): TimetableDto | null {
    if (!this.weeklyTimetableData || !this.weeklyTimetableData.weeklySchedule[day]) {
      return null;
    }
    return this.weeklyTimetableData.weeklySchedule[day].find(t => t.periodNumber === period) || null;
  }

  // Add new timetable entry
  addTimetableEntry(day?: string, period?: number): void {
    const dialogRef = this.dialog.open(TimetableAddEditComponent, {
      width: '600px',
      data: {
        isEdit: false,
        teacherId: this.selectedTeacher?.teacherId,
        dayOfWeek: day,
        periodNumber: period,
        timetable: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.timetableService.addTimetable(result).subscribe({
          next: (newTimetable) => {
            this.messageService.showSuccess('Timetable entry added successfully');
            this.refreshData();
            if (this.showWeeklyView) {
              this.viewWeeklyTimetable(); // Refresh weekly view
            }
          },
          error: (error) => {
            this.messageService.showError('Failed to add timetable entry: ' + error.message);
          }
        });
      }
    });
  }

  // Edit existing timetable entry
  editTimetableEntry(timetable: TimetableDto): void {
    const dialogRef = this.dialog.open(TimetableAddEditComponent, {
      width: '600px',
      data: {
        isEdit: true,
        timetable: { ...timetable }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && timetable.id) {
        this.timetableService.updateTimetable(timetable.id, result).subscribe({
          next: (updatedTimetable) => {
            this.messageService.showSuccess('Timetable entry updated successfully');
            this.refreshData();
            if (this.showWeeklyView) {
              this.viewWeeklyTimetable(); // Refresh weekly view
            }
          },
          error: (error) => {
            this.messageService.showError('Failed to update timetable entry: ' + error.message);
          }
        });
      }
    });
  }

  checkConflicts(): void {
    if (!this.selectedTeacher) {
      this.messageService.showError('Please select a teacher first');
      return;
    }
    
    // This is a placeholder for conflict checking logic
    this.messageService.showSuccess('Conflict checking for ' + this.selectedTeacher.fullName);
  }

  refreshData(): void {
    if (this.selectedTeacher) {
      this.loadTeacherTimetables(this.selectedTeacher.teacherId);
    } else {
      this.loadTimetables();
    }
  }

  clearTeacherSelection(): void {
    this.selectedTeacherControl.setValue('');
    this.selectedTeacher = null;
    this.selectedTeacherDetails = null;
  }
}