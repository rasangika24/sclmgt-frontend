import { NgIfContext } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormControlName } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeServiceService } from 'src/app/services/employee/employee-service.service';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';

const ELEMENT_DATA: any[] = [
  { empNo: 1, empType: 'Hydrogen', nic: 1.0079, fullName: 'H', callingName: 1, dob: 'Hydrogen', age: 1.0079, address: 'H', contactNo: 1, civilStatus: 'Hydrogen', gender: 1.0079 }

];

@Component({
  selector: 'app-employee',
  standalone: false,
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit {

  //emp_no,emp_type,nic,full_name,calling_name,dob,age,address,contact_no,civil_status,gender

  employee: FormGroup;

  registerButtonLabel = "Register";
  mode = "add";
  selectedData: any;
  isDisabled = false;
  submitted = false;


  //this has taken form ts code of antular material table
  displayedColumns: string[] = ['empNo', 'empType', 'nic', 'fullName', 'callingName', 'dob', 'age', 'address', 'contactNo', 'civilStatus', 'gender', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(
    private fb: FormBuilder,
    private empservice: EmployeeServiceService,
    private msgService: MessageServiceService

  ) {
    this.employee = this.fb.group({
      empNo: new FormControl(''),
      empType: new FormControl(''),
      nic: new FormControl(''),
      fullName: new FormControl(''),
      callingName: new FormControl(''),
      dob: new FormControl(''),
      age: new FormControl(''),
      address: new FormControl(''),
      contactNo: new FormControl(''),
      civilStatus: new FormControl(''),
      gender: new FormControl(''),
      relationShip: new FormControl('Mother'),

    })
  }
  ngOnInit(): void {
    //get data request
    this.populateData();

  }
  public populateData(): void {
    try {
      //implement get data code
      //ts->servce file funciton
      //service->backend call
      this.empservice.getData().subscribe((response: any) => {
        console.log('get data response', response)

        this.dataSource = new MatTableDataSource(response);

        // sorting and pagination
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
        (error) => {
          this.msgService.showError('' + error);
        }
      );
    } catch (error) {
      console.log(error);
      this.msgService.showError('Action failed with error' + error);
    }
  }
  onSubmit() {
    try {
      // this function will be called upon clicking register button
      console.log("form submitted");
      console.log(this.employee.value);

      if (this.mode === 'add') {
        this.empservice.serviceCall(this.employee.value).subscribe((Response) => {

          if (this.dataSource && this.dataSource.data && this.dataSource.data.length > 0) {
            this.dataSource = new MatTableDataSource([Response, ...this.dataSource.data]);
          } else {
            this.dataSource = new MatTableDataSource([Response]);
          }
          this.msgService.showSuccess('Record added successfully!');
        });
      } else if (this.mode === 'edit') {
        // Call edit data function 
        this.empservice.editData(this.selectedData?.id, this.employee.value).subscribe((Response) => {

          let elementIndex = this.dataSource.data.findIndex((element) => element.id === this.selectedData?.id);
          this.dataSource.data[elementIndex] = Response;
          this.dataSource = new MatTableDataSource(this.dataSource.data);
          this.msgService.showSuccess('Record updated successfully!');
        });
      }
      this.employee.disable();
      this.isDisabled = true;
      this.mode = "add";
    } catch (error) {
      console.log(error);
      this.msgService.showError('Action failed with error' + error);
    }
  }

  public deleteData(data: any): void {

    // data delete implementation
    const id = data.id;

    try {
      this.empservice.deleteData(id).subscribe((response) => {

        const index = this.dataSource.data.findIndex((element) => element.id === id);

        if (index != -1) {
          this.dataSource.data.splice(index, 1);
        }
        this.dataSource = new MatTableDataSource(this.dataSource.data);
        this.msgService.showSuccess('Record deleted successfully!');
      })
    } catch (error) {
      console.log(error);
      this.msgService.showError('Action failed with error' + error);
    }
  }

  // edit button function
  public editData(data: any): void {
    console.log(new Date(data.dateOfBirth));
    this.employee.patchValue(data);

    // patching date values after formatting
    this.employee.patchValue({
      dateOfBirth: new Date(data.dateOfBirth),
      dateOfJoining: new Date(data.dateOfJoining)
    });

    this.registerButtonLabel = "Update";
    this.mode = "edit";
    this.selectedData = data;
  }

  // table filter function
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // pagination code
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //refresh button function
  public refreshData(): void {
    this.populateData();
  }

  // reset button function
  public resetData(): void {
    this.employee.reset();
    this.employee.updateValueAndValidity();
    this.employee.enable();
    this.isDisabled = false;
    this.submitted = false;
    this.registerButtonLabel = "Register";
  }

}
