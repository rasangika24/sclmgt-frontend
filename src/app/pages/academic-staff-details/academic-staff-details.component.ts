import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AcademicStaffDetailsServiceService } from 'src/app/services/academicstaff-details/academic-staff-details.service.service';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';




const ELEMENT_DATA: any[] = [
  {

    id:1,
teacherNumber : 1,
nameinFull : 'A',
nameWithInitials : 'A',
usingName : 'A',
appointmentDateAsTemperary : 'A',
appointmentDateAsEpf : 'A',
appointmentDateAsSlts : 'A',
gradeOfSlts : 'A',
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
  selector: 'app-academic-staff-details',
  standalone: false,
  
  templateUrl: './academic-staff-details.component.html',
  styleUrl: './academic-staff-details.component.scss'
})

export class AcademicStaffDetailsComponent implements OnInit{


displayedColumns: string[] = [
'id',
'teacherNumber',
'nameinFull',
'nameWithInitials',
'usingName',
'appointmentDateAsTemperary',
'appointmentDateAsEpf',
'appointmentDateAsSlts',
'gradeOfSlts',
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


  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor (
    private router: Router, 
    private academicstaffdetailsService: AcademicStaffDetailsServiceService, 
    private messageService: MessageServiceService) 
    {}

  ngOnInit(): void {
    //get data request
   // throw new Error('Method not implemented.');
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
    
  try {

    //implement get data code

    this.academicstaffdetailsService.getData().subscribe((response: any) => {
      console.log('get data response: ', response);

    this.dataSource = new MatTableDataSource(response);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    },
        (error) => {
          this.messageService.showError('Action failed with error : ' + error);
        });

  } catch (error) {

      this.messageService.showError('Action failed with error : ' + error);
    }
    
  }

  refreshData(): void{
      this.populateData();
    }

  

}