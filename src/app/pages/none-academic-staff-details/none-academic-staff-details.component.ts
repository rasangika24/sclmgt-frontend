import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { NonacademicServiceService } from 'src/app/services/nonacademic/nonacademic-service.service';
import { NonacademicStaffDetailsServiceService } from 'src/app/services/nonacademicstaff-details/nonacademic-staff-details.service.service';


const ELEMENT_DATA: any[] = [
  {

    id:1,
teacherNumber : 1,
firstAppointDate : 'A',
nameInFull : 'A',
nameWithInitials : 'A',
usingName : 'A',
appointmentDateAsTemperary : 'A',
appointmentDateAsEpf : 'A',
dateOfBirth : 'A',
address : 'A',
telephone : 2,
whatsapp : 3,
emailAddress : 'A',
nic : 'A',
schoolStudied : 'A',
highestEducationQualification : 'A',
professionalQualification : 'A',
otherQualification : 'A',
extraCurricularActivities : 'A',
subjectTeaching1 : 'A',
marriedOrNot : 'A',
dateGotMarried : 'A',
statusOfMarriage : 'A',
nameOfTheSpouse : 'A',
spouseSchool : 'A',
spouseHighestEducationLevel : 'A',
contactNumber : 4,
occupation : 'A',
numberOfChildren : 'A',
educationQualification : 'A',
universityOrInstitute : 'A',
year : 'A',
subject : 'A',
mothersName : 'A',
mothersSchool : 'A',
mothersEducationLevel : 'A',
mothersProfession : 'A',
mothersTelephone : 5,
mothersWhatsapp : 6,
fathersName : 'A',
fathersSchool : 'A',
fathersEducationLevel : 'A',
fathersProfession : 'A',
fathersTelephone : 7,
fathersWhatsapp : 8,
smothersName : 'A',
smothersSchool : 'A',
smothersEducationLevel : 'A',
smothersProfession : 'A',
smothersTelephone : 9,
smothersWhatsapp : 10,
sfathersName : 'A',
sfathersSchool : 'A',
sfathersEducationLevel : 'A',
sfathersProfession : 'A',
sfathersTelephone : 11,
sfathersWhatsapp : 12,

  },

];

@Component({
  selector: 'app-none-academic-staff-details',
  standalone: false,

  templateUrl: './none-academic-staff-details.component.html',
  styleUrl: './none-academic-staff-details.component.scss'
})

export class NoneAcademicStaffDetailsComponent implements OnInit{

  displayedColumns: string[] = [

    'id',
'teacherNumber',
'firstAppointDate',
'nameInFull',
'nameWithInitials',
'usingName',
'appointmentDateAsTemperary',
'appointmentDateAsEpf',
'dateOfBirth',
'address',
'telephone',
'whatsapp',
'emailAddress',
'nic',
'schoolStudied',
'highestEducationQualification',
'professionalQualification',
'otherQualification',
'extraCurricularActivities',
'subjectTeaching1',
'marriedOrNot',
'dateGotMarried',
'statusOfMarriage',
'nameOfTheSpouse',
'spouseSchool',
'spouseHighestEducationLevel',
'contactNumber',
'occupation',
'numberOfChildren',
'educationQualification',
'universityOrInstitute',
'year',
'subject',
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
'smothersName',
'smothersSchool',
'smothersEducationLevel',
'smothersProfession',
'smothersTelephone',
'smothersWhatsapp',
'sfathersName',
'sfathersSchool',
'sfathersEducationLevel',
'sfathersProfession',
'sfathersTelephone',
'sfathersWhatsapp',

   ];

    dataSource!: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


   constructor (
    private router: Router,
    private nonacademicstaffdetailsService:NonacademicStaffDetailsServiceService,
    private messageService: MessageServiceService) {}

    ngOnInit(): void {
    //get data request
   // throw new Error('Method not implemented.');
    this.populateData();
  }


    applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

    public populateData(): void {
    //implement get data code

try {

       this.nonacademicstaffdetailsService.getData().subscribe((response: any) => {
      console.log('get data response: ',response);
      this.dataSource = new MatTableDataSource(response);

      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    },
        (error) => {
          this.messageService.showError('Action failed with error : ' + error);
        });

 } catch (error) {
console.log(error);
      this.messageService.showError('Action failed with error : ' + error);
}

  }

    refreshData(): void{
      this.populateData();
    }


}