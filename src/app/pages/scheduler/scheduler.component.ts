import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormArray,
} from '@angular/forms';
import { SchedulerService } from 'src/app/services/scheduler/scheduler.service';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { AcademicServiceService } from 'src/app/services/academic/academic-service.service';

interface EmployeeRow {
  // empNo: string;
  periodNo: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
}

@Component({
  selector: 'app-scheduler',
  standalone: false,
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.scss',
})
export class SchedulerComponent implements OnInit {
  scheduleForm: FormGroup;
  teachers: any[] = [];
  selectedEmployers: any[] = [];
  selectedTeacherControl = new FormControl('');
  selectedTeacher: any = null;
  selectedTeacherDetails: any = null;

  selectedEmployee: string = '';
  displayedColumns: string[] = [
    'id',
    'periodNo',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
  ]; //  'actions'
  dataSource = new MatTableDataSource<EmployeeRow>([]);
  noOfRows = 0;
  disableSaveButton = true;
  disableRefreshButton = true;

  constructor(
    private fb: FormBuilder,
    private schedulerService: SchedulerService,
    private messageService: MessageServiceService,
    private teacherService: TeacherService,
    private academicService: AcademicServiceService
  ) {
    // required, min, max, minL, maxL, pattern, customValidation
    this.scheduleForm = this.fb.group({
      empNo: new FormControl(''),
      rowData: this.fb.array([]),
    });

    for (let i = 0; i < 8; i++) {
      this.rowData.push(
        this.fb.group({
          id: new FormControl(''),
          periodNo: new FormControl(i + 1),
          monday: new FormControl(''),
          tuesday: new FormControl(''),
          wednesday: new FormControl(''),
          thursday: new FormControl(''),
          friday: new FormControl(''),
        })
      );
    }
  }

  ngOnInit(): void {
    this.loadTeachers();
    this.setupTeacherSelection();
  }

  private loadTeachers(): void {
    this.teacherService.getAllTeachers().subscribe({
      next: (teachers: any[]) => {
        this.teachers = teachers;
        this.selectedEmployers = teachers;
        console.log('Teachers loaded:', teachers);
      },
      error: (error) => {
        console.error('Error loading teachers:', error);
        this.messageService.showError('Failed to load teachers');
      }
    });
  }

  private setupTeacherSelection(): void {
    this.selectedTeacherControl.valueChanges.subscribe(teacherId => {
      if (teacherId) {
        this.loadTeacherDetails(teacherId);
      } else {
        this.selectedTeacher = null;
        this.selectedTeacherDetails = null;
      }
    });
  }

  private loadTeacherDetails(teacherId: string): void {
    this.selectedTeacher = this.teachers.find(t => t.teacherId === teacherId);
    if (this.selectedTeacher) {
      // Load full teacher details from academic service
      this.academicService.getAllAcademicStaff().subscribe({
        next: (academicStaff: any[]) => {
          const teacherDetails = academicStaff.find(staff => staff.id === teacherId);
          if (teacherDetails) {
            this.selectedTeacherDetails = teacherDetails;
            console.log('Teacher details loaded:', teacherDetails);
          }
        },
        error: (error) => {
          console.error('Error loading teacher details:', error);
          this.messageService.showError('Failed to load teacher details');
        }
      });
    }
  }

  public setTeachersList(): void {
    // This method is now replaced by loadTeachers()
    this.loadTeachers();
  }

  get rowData() {
    return this.scheduleForm.get('rowData') as FormArray;
  }

  refreshData() {
    try {
      this.schedulerService
        .getData(this.scheduleForm.get('empNo')?.value)
        .subscribe({
          next: (response: any) => {
            if (response) {
              const rowData = response.rowData;

              if (response.rowData && response.rowData.length > 0) {
                this.scheduleForm.patchValue({
                  rowData: rowData,
                });
                return;
              }

              if (!response.empNo) {
                this.messageService.showError(
                  'User data not available in the DB'
                );
              }
              this.scheduleForm.get('rowData')?.reset();
            }
          },
          error: (error) => {
            this.messageService.showError('Action failed with error' + error);
          },
        });
    } catch (error) {
      this.messageService.showError('Action failed with error' + error);
    }
  }

  saveData() {
    try {
      // console.log(this.scheduleForm.value);
      // return;

      this.schedulerService.saveSchedule(this.scheduleForm.value).subscribe({
        next: (response: any) => {
          this.dataSource = new MatTableDataSource([response]);

          this.messageService.showSuccess('Data saved successfully!');
        },
        error: (error) => {
          this.messageService.showError('Action failed with error' + error);
        },
      });
    } catch (error) {
      this.messageService.showError('Action failed with error' + error);
    }
  }

  cancel() {}
  reset() {
    this.scheduleForm.reset();
    this.selectedEmployers = this.teachers;
  }

  deleteRow(index: number) {
    const formArray: any = this.scheduleForm.get('rowData');
    const formControls = formArray.controls[index].controls;

    Object.keys(formControls).forEach((key) => {
      if (key !== 'id') {
        formControls.get(key).reset();
      }
    });
  }

  updateRow(index: number) {
    console.log('Updating row', index);
  }

  onKey(eventTarget: any) {
    this.selectedEmployers = this.search(eventTarget.value);
  }

  search(value: string) {
    let filter = value.toLowerCase();
    return this.teachers.filter((option: any) =>
      option.fullName.toLowerCase().startsWith(filter)
    );
  }

  // rows: EmployeeRow[] = [];
  // addRow() {
  //   this.rows.unshift({
  //     empNo: '',
  //     periodNo: '',
  //     monday: '',
  //     tuesday: '',
  //     wednesday: '',
  //     thursday: '',
  //     friday: ''
  //   });
  // }
}
