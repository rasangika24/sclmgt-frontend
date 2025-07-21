import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LeavingServiceService } from 'src/app/services/leaving/leaving-service.service';

@Component({
  selector: 'app-character',
  standalone: false,
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent {

  characterForm:FormGroup;
    constructor(private fb: FormBuilder,
              private leavingService: LeavingServiceService
    ){
      this.characterForm=this.fb.group({
        pupilsName:new FormControl(''),
        indexNo:new FormControl(''),
        dateofBirth:new FormControl(''),
        religion:new FormControl(''),
        fullnameofthefatherGardian:new FormControl(''),
        addressofthefatherGardian:new FormControl(''),
        dateofAdmission:new FormControl(''),
        causeLeaving:new FormControl(''),
        lastgradePassed:new FormControl(''),
        subjectstudiedinthepresentClass:new FormControl(''),
        progressinacademicField:new FormControl(''),
        sportsabilityandLeadership:new FormControl(''),
        specialSkills:new FormControl(''),
      });
    }
  
  
    onSubmit () {
      console.log("form Submitted"); //for check function call
      console.log(this.characterForm.value); // for check formControllName
  
      this.leavingService.serviceCall(this.characterForm.value);
    }
}
