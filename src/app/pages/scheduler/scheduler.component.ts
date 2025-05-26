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
import { EmployeeServiceService } from 'src/app/services/employee/employee-service.service';

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
  employees: any = [] /* = [
    { id: 'E001', name: 'John Doe' },
    { id: 'E002', name: 'Jane Smith' },
    { id: 'E003', name: 'Alice Johnson' },
  ]*/;
  selectedEmployers: any = [] /* = this.employees*/;

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
    private employeeService: EmployeeServiceService
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
    this.setTeachersList();
  }

  public setTeachersList(): void {
    this.employeeService.getTeachersList().subscribe((response: any) => {
      if (response && response.length > 0) {
        response.forEach((teacher: any) => {
          const employeeData = {
            id: teacher.id,
            name: teacher.name,
          };

          this.employees.push(employeeData);
        });
      }

      this.selectedEmployers = this.employees;
    });
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
    this.selectedEmployers = this.employees;
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
    return this.employees.filter((option: any) =>
      option.name.toLowerCase().startsWith(filter)
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
