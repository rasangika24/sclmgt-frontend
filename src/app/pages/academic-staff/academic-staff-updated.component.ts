import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';
import { AcademicServiceService } from 'src/app/services/academic/academic-service.service';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { AcademicStaffDto } from 'src/app/interfaces/academic-staff.interface';

@Component({
  selector: 'app-academic-staff',
  standalone: false,
  templateUrl: './academic-staff.component.html',
  styleUrl: './academic-staff.component.scss'
})
export class AcademicStaffComponent implements OnInit {
  // Essential columns for display
  displayedColumns: string[] = [
    'teacherNumber',
    'nameinFull', 
    'nameWithInitials',
    'emailAddress',
    'telephone',
    'subjectTeaching1',
    'appointmentDateAsEpf',
    'nic',
    'actions'
  ];

  dataSource!: MatTableDataSource<AcademicStaffDto>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  saveButtonLabel = 'Save';
  mode = 'add';
  selectedData: AcademicStaffDto | null = null;
  isButtonDisabled = false;
  nicExists: boolean = false;
  
  academicStaffForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private academicService: AcademicServiceService, 
    private messageService: MessageServiceService
  ) {
    this.academicStaffForm = this.fb.group({
      // Basic Information
      teacherNumber: new FormControl('', [Validators.required]),
      nameinFull: new FormControl('', [Validators.required]),
      nameWithInitials: new FormControl('', [Validators.required]),
      usingName: new FormControl(''),
      nic: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]),
      dateOfBirth: new FormControl(''),
      address: new FormControl(''),

      // Appointment Information
      appointmentDateAsTemperary: new FormControl(''),
      appointmentDateAsEpf: new FormControl(''),
      appointmentDateAsSlts: new FormControl(''),
      gradeOfSlts: new FormControl(''),

      // Contact Information
      emailAddress: new FormControl('', [Validators.email]),
      telephone: new FormControl('', [Validators.pattern('^[0-9]*$')]),
      whatsapp: new FormControl('', [Validators.pattern('^[0-9]*$')]),
      contactNumber: new FormControl('', [Validators.pattern('^[0-9]*$')]),

      // Educational Information
      schoolStudied: new FormControl(''),
      highestEducationQualification: new FormControl(''),          
      professionalQualification: new FormControl(''),
      otherQualification: new FormControl(''),
      educationQualification: new FormControl(''),
      universityOrInstitute: new FormControl(''),
      year: new FormControl(''),
      subject: new FormControl(''),

      // Teaching Information
      subjectTeaching1: new FormControl(''),
      extraCurricularActivities: new FormControl(''), 
      occupation: new FormControl(''),   

      // Marriage Information
      marriedOrNot: new FormControl(''),
      dateGotMarried: new FormControl(''),
      statusOfMarriage: new FormControl(''),
      nameOfTheSpouse: new FormControl(''),                                   
      spouseSchool: new FormControl(''),
      spouseHighestEducationLevel: new FormControl(''),
      numberOfChildren: new FormControl(''), 

      // Mother's Information
      mothersName: new FormControl(''),
      mothersSchool: new FormControl(''),
      mothersEducationLevel: new FormControl(''),
      mothersProfession: new FormControl(''),
      mothersTelephone: new FormControl('', [Validators.pattern('^[0-9]*$')]),
      mothersWhatsapp: new FormControl('', [Validators.pattern('^[0-9]*$')]),

      // Father's Information
      fathersName: new FormControl(''),
      fathersSchool: new FormControl(''),
      fathersEducationLevel: new FormControl(''),
      fathersProfession: new FormControl('', [Validators.pattern('^[0-9]*$')]),
      fathersTelephone: new FormControl('', [Validators.pattern('^[0-9]*$')]),
      fathersWhatsapp: new FormControl('', [Validators.pattern('^[0-9]*$')]),

      // Spouse Mother's Information
      smothersName: new FormControl(''),
      smothersSchool: new FormControl(''),
      smothersEducationLevel: new FormControl(''),
      smothersProfession: new FormControl(''),
      smothersTelephone: new FormControl('', [Validators.pattern('^[0-9]*$')]),
      smothersWhatsapp: new FormControl('', [Validators.pattern('^[0-9]*$')]),

      // Spouse Father's Information
      sfathersName: new FormControl(''),
      sfathersSchool: new FormControl(''),
      sfathersEducationLevel: new FormControl(''),
      sfathersProfession: new FormControl(''),
      sfathersTelephone: new FormControl('', [Validators.pattern('^[0-9]*$')]),
      sfathersWhatsapp: new FormControl('', [Validators.pattern('^[0-9]*$')])
    });
  }

  ngOnInit(): void {
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
      switchMap(nic => {
        if (nic && nic.length >= 10) {
          return this.academicService.checkNicExists(nic);
        }
        return of(false);
      })
    ).subscribe({
      next: (exists: boolean) => {
        this.nicExists = exists;
        const nicControl = this.academicStaffForm.get('nic');
        if (exists && this.mode === 'add') {
          nicControl?.setErrors({ nicExists: true });
        } else if (!exists) {
          // Remove nicExists error but keep other errors
          const currentErrors = nicControl?.errors;
          if (currentErrors) {
            delete currentErrors['nicExists'];
            nicControl?.setErrors(Object.keys(currentErrors).length > 0 ? currentErrors : null);
          }
        }
      },
      error: (error) => {
        console.error('Error checking NIC:', error);
      }
    });
  }

  public onNicChange(): void {
    // This method is called from the template when NIC input changes
    // The actual checking is handled by the checkNIC() method via valueChanges
  }

  public populateData(): void {
    try {
      this.academicService.getAllAcademicStaff().subscribe({
        next: (response: AcademicStaffDto[]) => {
          console.log('Academic Staff Data:', response);
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error) => {
          console.error('Error fetching data:', error);
          this.messageService.showMessage('Error fetching academic staff data', 'error');
          this.dataSource = new MatTableDataSource([]);
        }
      });
    } catch (error) {
      console.error('Error in populateData:', error);
      this.messageService.showMessage('Error loading data', 'error');
    }
  }

  public onSubmit(): void {
    if (this.academicStaffForm.valid) {
      this.isButtonDisabled = true;
      
      // Convert string numbers to actual numbers for backend
      const formData = this.academicStaffForm.value;
      const processedData: AcademicStaffDto = {
        ...formData,
        teacherNumber: formData.teacherNumber ? Number(formData.teacherNumber) : undefined,
        telephone: formData.telephone ? Number(formData.telephone) : undefined,
        whatsapp: formData.whatsapp ? Number(formData.whatsapp) : undefined,
        contactNumber: formData.contactNumber ? Number(formData.contactNumber) : undefined,
        mothersTelephone: formData.mothersTelephone ? Number(formData.mothersTelephone) : undefined,
        mothersWhatsapp: formData.mothersWhatsapp ? Number(formData.mothersWhatsapp) : undefined,
        fathersProfession: formData.fathersProfession ? Number(formData.fathersProfession) : undefined,
        fathersTelephone: formData.fathersTelephone ? Number(formData.fathersTelephone) : undefined,
        fathersWhatsapp: formData.fathersWhatsapp ? Number(formData.fathersWhatsapp) : undefined,
        smothersTelephone: formData.smothersTelephone ? Number(formData.smothersTelephone) : undefined,
        smothersWhatsapp: formData.smothersWhatsapp ? Number(formData.smothersWhatsapp) : undefined,
        sfathersTelephone: formData.sfathersTelephone ? Number(formData.sfathersTelephone) : undefined,
        sfathersWhatsapp: formData.sfathersWhatsapp ? Number(formData.sfathersWhatsapp) : undefined
      };

      if (this.mode === 'add') {
        this.academicService.createAcademicStaff(processedData).subscribe({
          next: (response) => {
            console.log('Teacher added successfully:', response);
            this.messageService.showMessage('Teacher added successfully!', 'success');
            this.resetForm();
            this.populateData();
            this.isButtonDisabled = false;
          },
          error: (error) => {
            console.error('Error adding teacher:', error);
            this.messageService.showMessage('Error adding teacher: ' + (error.message || 'Unknown error'), 'error');
            this.isButtonDisabled = false;
          }
        });
      } else if (this.mode === 'edit' && this.selectedData?.id) {
        this.academicService.updateAcademicStaff(this.selectedData.id, processedData).subscribe({
          next: (response) => {
            console.log('Teacher updated successfully:', response);
            this.messageService.showMessage('Teacher updated successfully!', 'success');
            this.resetForm();
            this.populateData();
            this.isButtonDisabled = false;
          },
          error: (error) => {
            console.error('Error updating teacher:', error);
            this.messageService.showMessage('Error updating teacher: ' + (error.message || 'Unknown error'), 'error');
            this.isButtonDisabled = false;
          }
        });
      }
    } else {
      this.messageService.showMessage('Please fill in all required fields correctly', 'warning');
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.academicStaffForm.controls).forEach(key => {
      const control = this.academicStaffForm.get(key);
      control?.markAsTouched();
    });
  }

  public editData(data: AcademicStaffDto): void {
    this.mode = 'edit';
    this.selectedData = data;
    this.saveButtonLabel = 'Update';
    
    // Populate form with selected data
    this.academicStaffForm.patchValue({
      ...data,
      // Convert numbers to strings for form controls
      teacherNumber: data.teacherNumber?.toString() || '',
      telephone: data.telephone?.toString() || '',
      whatsapp: data.whatsapp?.toString() || '',
      contactNumber: data.contactNumber?.toString() || '',
      mothersTelephone: data.mothersTelephone?.toString() || '',
      mothersWhatsapp: data.mothersWhatsapp?.toString() || '',
      fathersProfession: data.fathersProfession?.toString() || '',
      fathersTelephone: data.fathersTelephone?.toString() || '',
      fathersWhatsapp: data.fathersWhatsapp?.toString() || '',
      smothersTelephone: data.smothersTelephone?.toString() || '',
      smothersWhatsapp: data.smothersWhatsapp?.toString() || '',
      sfathersTelephone: data.sfathersTelephone?.toString() || '',
      sfathersWhatsapp: data.sfathersWhatsapp?.toString() || ''
    });
    
    // Scroll to form
    document.querySelector('.form-card')?.scrollIntoView({ behavior: 'smooth' });
  }

  public deleteData(data: AcademicStaffDto): void {
    if (confirm('Are you sure you want to delete this teacher?')) {
      if (data.id) {
        this.academicService.deleteAcademicStaff(data.id).subscribe({
          next: (response) => {
            console.log('Teacher deleted successfully:', response);
            this.messageService.showMessage('Teacher deleted successfully!', 'success');
            this.populateData();
          },
          error: (error) => {
            console.error('Error deleting teacher:', error);
            this.messageService.showMessage('Error deleting teacher: ' + (error.message || 'Unknown error'), 'error');
          }
        });
      }
    }
  }

  public resetForm(): void {
    this.mode = 'add';
    this.selectedData = null;
    this.saveButtonLabel = 'Save';
    this.isButtonDisabled = false;
    this.academicStaffForm.reset();
    
    // Reset form validation state
    Object.keys(this.academicStaffForm.controls).forEach(key => {
      this.academicStaffForm.get(key)?.setErrors(null);
      this.academicStaffForm.get(key)?.markAsUntouched();
    });
  }

  public viewDetails(): void {
    // Implement view details functionality
    console.log('View details clicked');
    this.messageService.showMessage('View details functionality to be implemented', 'info');
  }

  public refreshData(): void {
    this.populateData();
    this.messageService.showMessage('Data refreshed successfully!', 'success');
  }
}
