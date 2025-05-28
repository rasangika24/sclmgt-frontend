import { Component } from '@angular/core';
import { FormBuilder,FormGroup,FormControl } from '@angular/forms';


@Component({
  selector: 'app-leaving',
  standalone: false,  
  templateUrl: './leaving.component.html',
  styleUrl: './leaving.component.scss'
})
export class LeavingComponent {
  /*fomr group form builder form control */
  /*Pupils name in full , data of birth , Religion , full name of fater /guardina , address of father /gardian/
  admission number , data of admission, cause leaving , The last grade passed , subjects studie in the present class, 
  progress in acadamic field / Sports ability and leadership / special skills */

  leavingForm:FormGroup;
  constructor(private fb: FormBuilder){
    this.leavingForm=this.fb.group({
      pupilsName:new FormControl(''),
      indexNo:new FormControl(''),
      dateofBirth:new FormControl(''),
      religion:new FormControl(''),
      fullnameofthefatherGardian:new FormControl(''),
      addressofthefatherGardian:new FormControl(''),
      dateofAdmission:new FormControl(''),
      causeLeaving:new FormControl(''),
      thelastgradePassed:new FormControl(''),
      subjectstudiedinthepresentClass:new FormControl(''),
      progressinacademicField:new FormControl(''),
      sportsabilityandLeadership:new FormControl(''),
      specialSkills:new FormControl(''),





    })
  }
}
