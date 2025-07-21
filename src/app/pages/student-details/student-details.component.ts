import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { StudentServiceService } from 'src/app/services/student/student-service.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { StudentDetailsServiceService } from 'src/app/services/student-details/student-details.service.service';

const ELEMENT_DATA: any[] = [
  {
    id: 1,
    admissionNumber: 1,
    nameinFull: 'A',
    nameWithInitials: 'A',
    dateOfBirth: 'A',
    address: 'A',
    telephone: 2,
    whatsapp: 3,
    emailAddress: 'A',
    nic: 'A',
    schoolStudied: 'A',
    mothersName: 'A',
    mothersSchool: 'A',
    mothersEducationLevel: 'A',
    mothersProfession: 'A',
    mothersTelephone: 4,
    mothersWhatsapp: 5,
    fathersName: 'A',
    fathersSchool: 'A',
    fathersEducationLevel: 'A',
    fathersProfession: 'A',
    fathersTelephone: 6,
    fathersWhatsapp: 7,
    guardiansName: 'A',
    guardiansSchool: 'A',
    guardiansEducationLevel: 'A',
    guardiansProfession: 'A',
    guardiansTelephone: 8,
    guardiansWhatsapp: 9,
  },
];

@Component({
  selector: 'app-student-details',
  standalone: false,
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.scss',
})
export class StudentDetailsComponent implements OnInit {
 


  displayedColumns: string[] = [
    'id',
    'admissionNumber',
    'nameinFull',
    'nameWithInitials',
    'dateOfBirth',
    'address',
    'telephone',
    'whatsapp',
    'emailAddress',
    'nic',
    'schoolStudied',
    'mothersName',
    'mothersSchool',
    'mothersEducationLevel',
    'mothersProfession',
    'mothersTelephone',
    'mothersWhatsapp',
    'fathersName',
    'fathersSchool',
    'fathersEducationLevel',
    'fathersProfession',
    'fathersTelephone',
    'fathersWhatsapp',
    'guardiansName',
    'guardiansSchool',
    'guardiansEducationLevel',
    'guardiansProfession',
    'guardiansTelephone',
    'guardiansWhatsapp',
    
  ];


  dataSource!: MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
    private fb: FormBuilder,
    private StudentDetailsServiceService: StudentDetailsServiceService,
    private messageService: MessageServiceService
  ) { }



   ngOnInit(): void {
    //get Data request
    this.populateData();
  }

    applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

    public populateData(): void {
    //implement get data code
    //ts -> service file function
    // service -> backend call

    try {
      this.StudentDetailsServiceService.getData().subscribe(
        (response: any) => {
          console.log('get data response', response);

          this.dataSource = new MatTableDataSource(response);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error) => {
          this.messageService.showError('Action failed with error : ' + error);
        }
      );
    } catch (error) {
      this.messageService.showError('Action failed with error : ' + error);
    }
  }

  public refreshData(): void {
    this.populateData();
  }

}
