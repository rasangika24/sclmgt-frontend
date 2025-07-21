import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { AcademicServiceService } from 'src/app/services/academic/academic-service.service';
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
  selector: 'app-academic-staff',
  standalone: false,
  
  templateUrl: './academic-staff.component.html',
  styleUrl: './academic-staff.component.scss'
})
export class AcademicStaffComponent implements OnInit{
  // formgroup
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
'actions',

  ];
dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  saveButtonLabel = 'Save';
  mode='add';
  selectedData:any;
  isButtonDisabled = false;
  nicExists: boolean = false;
  
    // create construtor
    academicStaffForm: FormGroup;
    constructor (private fb: FormBuilder, private router: Router, private academicService: AcademicServiceService, private messageService: MessageServiceService) {
      this.academicStaffForm = this.fb.group({
        
        teacherNumber: new FormControl('', [Validators.required]),
        nameinFull: new FormControl('', [Validators.required]),
        nameWithInitials: new FormControl('', [Validators.required]),
        usingName: new FormControl(''),
        appointmentDateAsTemperary: new FormControl(''),
        appointmentDateAsEpf: new FormControl('', [Validators.required]),
        appointmentDateAsSlts: new FormControl(''),
        gradeOfSlts: new FormControl(''),
        dateOfBirth: new FormControl(''),
        address: new FormControl(''),
        telephone: new FormControl('',[Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
        whatsapp: new FormControl('',[Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
        emailAddress: new FormControl('',[Validators.email]),
        nic: new FormControl('',[Validators.required ,Validators.minLength(10), Validators.maxLength(12)]),
        schoolStudied: new FormControl(''),
        highestEducationQualification: new FormControl(''),          
        professionalQualification: new FormControl(''),
        otherQualification: new FormControl(''),
        extraCurricularActivities: new FormControl(''), 
        subjectTeaching1: new FormControl(''),
        marriedOrNot: new FormControl(''),
        dateGotMarried: new FormControl(''),
        statusOfMarriage: new FormControl(''),
        nameOfTheSpouse: new FormControl(''),                                   
        spouseSchool: new FormControl(''),
        spouseHighestEducationLevel: new FormControl(''),
        contactNumber: new FormControl('',[Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]), 
        occupation: new FormControl(''),   
        numberOfChildren: new FormControl(''), 
        educationQualification: new FormControl(''),
        universityOrInstitute: new FormControl(''),
        year: new FormControl(''),
        subject: new FormControl(''),
        mothersName: new FormControl(''),
        mothersSchool: new FormControl(''),
        mothersEducationLevel: new FormControl(''),
        mothersProfession: new FormControl(''),
        mothersTelephone: new FormControl(''),
        mothersWhatsapp: new FormControl(''),
  
        //gardianssection
        fathersName: new FormControl(''),
        fathersSchool: new FormControl(''),
        fathersEducationLevel: new FormControl(''),
        fathersProfession: new FormControl(''),
        fathersTelephone: new FormControl(''),
        fathersWhatsapp: new FormControl(''),
  
       //spouse mothers section
        smothersName: new FormControl(''),
        smothersSchool: new FormControl(''),
        smothersEducationLevel: new FormControl(''),
        smothersProfession: new FormControl(''),
        smothersTelephone: new FormControl(''),
        smothersWhatsapp: new FormControl(''),
  
        //spouse gardianssection
        sfathersName: new FormControl(''),
        sfathersSchool: new FormControl(''),
        sfathersEducationLevel: new FormControl(''),
        sfathersProfession: new FormControl(''),
        sfathersTelephone: new FormControl(''),
        sfathersWhatsapp: new FormControl(''),
      });
    }
  ngOnInit(): void {
    //get data request
   // throw new Error('Method not implemented.');
    this.populateData();
    this.checkNIC();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public checkNIC(): void {
  
      this.academicStaffForm.get('nic')?.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(nic => this.academicService.checkNicExists(nic))
      ).subscribe(exists => {
        this.nicExists = exists;
        if (exists) {
          this.academicStaffForm.get('nic')?.setErrors({ nicExists: true });
        } else {
          this.academicStaffForm.get('nic')?.setErrors(null);
        }
      });
    }


  public populateData(): void {
    
try {

    //implement get data code

    this.academicService.getData().subscribe((response: any) => {
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
  
    //on submit function
    onSubmit() {
      console.log("form Submitted: ");
      console.log(this.academicStaffForm.value);


try {

      if (this.mode ==='add'){
          this.academicService.serviceCall(this.academicStaffForm.value).subscribe((response) => {
          console.log('server response: ', response);
          if (
              this.dataSource && this.selectedData && this.dataSource.data.length > 0) {
              this.dataSource = new MatTableDataSource([response, ...this.dataSource.data]);
            } else {
              this.dataSource = new MatTableDataSource([response]);
            }

            this.messageService.showSuccess('Data Saved Successfully..!');
      });
      } else if (this.mode === 'edit'){
        //edit data
        this.academicService.editData(this.selectedData?.id,this.academicStaffForm.value).subscribe((response)=>{
          console.log('server response: ', response);
          let elementIndex = this.dataSource.data.findIndex((element) => element.id === this.selectedData?.id);
          this.dataSource.data[elementIndex] = response;
          this.dataSource = new MatTableDataSource(this.dataSource.data);
          this.messageService.showSuccess('Data Updated Successfully..!');
        });

      }
      this.mode='add'
      this.academicStaffForm.disable();
      this.isButtonDisabled = true;

 } catch (error) {
//console.log(error);
      this.messageService.showError('Action failed with error : ' + error);
}   
      
    }

    public editData(data: any): void{
      this.academicStaffForm.patchValue(data);
      this.saveButtonLabel='Update';
      this.mode='edit';
      this.selectedData = data;
      

    }

    public deleteData(data: any): void{
      this.selectedData = data;
      const id=data.id

try {

         this.academicService.deleteData(id).subscribe((response) => {
        console.log('server response for delete: ', response);
         const index = this.dataSource.data.findIndex((element) => element, id === id );
        
        if (index !== -1) {
          this.dataSource.data.splice(index, 1);
        }

        this.dataSource = new MatTableDataSource(this.dataSource.data);
        this.messageService.showSuccess('Data Deleted Successfully..!');
      });

 } catch (error) {
//console.log(error);
      this.messageService.showError('Action failed with error : ' + error);
}

    }

    public clearFields(): void{
      this.academicStaffForm.reset();
      this.saveButtonLabel='Save';
      this.academicStaffForm.enable();
      this.isButtonDisabled = false;

    }


    // view details function
    viewDetails() {
      console.log("view details: ");
      this.router.navigate(['/dashboard/view-academic-staff-details']);
    }

    refreshData(): void{
      this.populateData();
    }

    onNicChange(): void {
    this.nicExists = false; // optional if valueChanges handles it fully
  }

}
