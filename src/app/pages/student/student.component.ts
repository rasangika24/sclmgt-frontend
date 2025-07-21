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
  selector: 'app-student',
  standalone: false,

  templateUrl: './student.component.html',
  styleUrl: './student.component.scss',
})
export class StudentComponent implements OnInit {
  
  // formgroup

  // create construtor
  studentForm: FormGroup;

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
    'actions',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  saveButtonLabel = 'Save';
  mode = 'add';
  selectedData: any;
  isButtonDisabled = false;
  nicExists: boolean = false;



  constructor(
    private fb: FormBuilder,
    private studentService: StudentServiceService,
    private messageService: MessageServiceService
  ) {
    this.studentForm = this.fb.group({
      id: new FormControl(''),
      admissionNumber: new FormControl('', [Validators.required]),
      nameinFull: new FormControl(''),
      nameWithInitials: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('',[Validators.required, this.pastDateValidator]),
      address: new FormControl('',[Validators.required]),
      telephone: new FormControl('',[Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      whatsapp: new FormControl('',[Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      emailAddress: new FormControl('',[Validators.email]),
      nic: new FormControl('',[Validators.required ,Validators.minLength(10), Validators.maxLength(12)]),
      schoolStudied: new FormControl('',[Validators.required]),
      //mothers section
      mothersName: new FormControl(''),
      mothersSchool: new FormControl(''),
      mothersEducationLevel: new FormControl(''),
      mothersProfession: new FormControl(''),
      mothersTelephone: new FormControl('',[Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      mothersWhatsapp: new FormControl(''),

      //gardianssection
      fathersName: new FormControl(''),
      fathersSchool: new FormControl(''),
      fathersEducationLevel: new FormControl(''),
      fathersProfession: new FormControl(''),
      fathersTelephone: new FormControl('',[Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      fathersWhatsapp: new FormControl(''),

      //Gardian section
      guardiansName: new FormControl(''),
      guardiansSchool: new FormControl(''),
      guardiansEducationLevel: new FormControl(''),
      guardiansProfession: new FormControl(''),
      guardiansTelephone: new FormControl('',[Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      guardiansWhatsapp: new FormControl(''),
    });
    
  }
  


  ngOnInit(): void {
    //get Data request
    this.populateData();
    this.checkNIC();
  }

  //Date Validator

      pastDateValidator(control: AbstractControl): ValidationErrors | null {
          const inputDate = new Date(control.value);
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Remove time part for accurate comparison

      if (!control.value) {
          return null; // Let 'required' validator handle empty values
       }

          return inputDate >= today ? { futureDate: true } : null;
      }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  public checkNIC(): void {

    this.studentForm.get('nic')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(nic => this.studentService.checkNicExists(nic))
    ).subscribe(exists => {
      this.nicExists = exists;
      if (exists) {
        this.studentForm.get('nic')?.setErrors({ nicExists: true });
      } else {
        this.studentForm.get('nic')?.setErrors(null);
      }
    });
  }

  public populateData(): void {
    //implement get data code
    //ts -> service file function
    // service -> backend call

    try {
      this.studentService.getData().subscribe(
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

  //on submit function
  onSubmit() {

    //Check if form is validate
    if (this.studentForm.invalid) {
    this.studentForm.markAllAsTouched(); // To show errors
    return;
  }

    console.log('Mode is : ' + this.mode);
    console.log('form Submitted: ', this.studentForm.value);
    console.log(this.studentForm.value);

    try {
      if (this.mode === 'add') {
        this.studentService.serviceCall(this.studentForm.value).subscribe((response) => {
           console.log('server response: ', response);

            if (
              this.dataSource && this.selectedData && this.dataSource.data.length > 0) {
              this.dataSource = new MatTableDataSource([response, ...this.dataSource.data]);
            } else {
              this.dataSource = new MatTableDataSource([response]);
              this.messageService.showSuccess('Data Saved Successfully..!');
            }

          });
      } else if (this.mode === 'edit') {
        //edit data
        this.studentService
          .editData(this.selectedData?.id, this.studentForm.value)
          .subscribe((response) => {
            // console.log('server response for update:', response);
            let elementIndex = this.dataSource.data.findIndex(
              (element) => element.id === this.selectedData?.id
            );
            this.dataSource.data[elementIndex] = response;
            this.dataSource = new MatTableDataSource(this.dataSource.data);
            this.messageService.showSuccess('Data Updated Successfully..!');
          });
      }
      this.mode = 'add';
      this.studentForm.disable();
      this.isButtonDisabled = true;
    } catch (error) {
      //console.log(error);
      this.messageService.showError('Action failed with error : ' + error);
    }
  }

  //Clear Fields

  public clearFeild(): void {
    this.studentForm.reset();
    this.studentForm.setErrors(null);
    this.studentForm.updateValueAndValidity();
    this.saveButtonLabel = 'Save';
    this.studentForm.enable();
    this.isButtonDisabled = false;
  }

  //Edit Data

  public editData(data: any): void {
    this.studentForm.patchValue(data);
    this.saveButtonLabel = 'Update';
    this.mode = 'edit';
    this.selectedData = data;
  }

  //Delete Data
  public deleteData(data: any): void {
    // data delete implementation

    const id = data.id;

    try {
      this.studentService.deleteData(id).subscribe((response) => {
        // console.log('server response for delete: ', response);

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

  public refreshData(): void {
    this.populateData();
  }

  
  onNicChange(): void {
    this.nicExists = false; // optional if valueChanges handles it fully
  }
}
