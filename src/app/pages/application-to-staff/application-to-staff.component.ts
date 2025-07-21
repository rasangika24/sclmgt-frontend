import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-to-staff',
  standalone: false,
  templateUrl: './application-to-staff.component.html',
  styleUrl: './application-to-staff.component.scss'
})
export class ApplicationToStaffComponent {

  // formgroup
      
        // create construtor
        noneAcademicStaffForm: FormGroup;
        constructor(private fb: FormBuilder,
          private router: Router
          // private leavingService: LeavingServiceService
        ) {
          this.noneAcademicStaffForm = this.fb.group({
            teacherNumber: new FormControl(''),
            firstAppointDate: new FormControl(''),
            nameInFull: new FormControl(''),
            nameWithInitials: new FormControl(''),
            usingName: new FormControl(''),
            appointmentDateAsTemperary: new FormControl(''),
            appointmentDateAsEpf: new FormControl(''),
            dateOfBirth: new FormControl(''),
            address: new FormControl(''),
            telephone: new FormControl(''),
            whatsapp: new FormControl(''),
            emailAddress: new FormControl(''),
            nic: new FormControl(''),
            schoolStudied: new FormControl(''),
            highestEducationQualification: new FormControl([]),          
            professionalQualification: new FormControl(''),
            otherQualification: new FormControl(''),
            extraCurricularActivities: new FormControl(''), 
            subjectTeaching1: new FormControl(''),   
            // subjectTeaching2: new FormControl(''), 
            marriedOrNot: new FormControl(''),
            dateGotMarried: new FormControl(''),
            
            //spouse detail                  
            statusOfMarriage: new FormControl(''),
            nameOfTheSpouse: new FormControl(''),                                   
            spouseSchool: new FormControl(''),
            spouseHighestEducationLevel: new FormControl(''),
            contactNumber: new FormControl(''), 
            occupation: new FormControl(''),   
            numberOfChildren: new FormControl(''), 
            educationQualification: new FormControl(''),
            universityOrInstitute: new FormControl(''),
            year: new FormControl(''),
            subject: new FormControl(''),
             
            
    
            //mothers section
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
      
        //on submit function
        onSubmit() {
          console.log("form Submitted: " , this.noneAcademicStaffForm.value);
          
        }
    
        // view details function
        viewDetails() {
          console.log("view details: ");
          this.router.navigate(['/dashboard/view-none-academic-staff-details']);
        }
}
