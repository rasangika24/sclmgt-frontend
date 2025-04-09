import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FormDemoServiceService } from 'src/app/services/form-demo/form-demo-service.service';

@Component({
  selector: 'app-form-demo',
  standalone: false,
  templateUrl: './form-demo.component.html',
  styleUrl: './form-demo.component.scss'
})
export class FormDemoComponent implements OnInit {
  public ngOnInit(): void {
    console.log("oninit");

  }
  /*form group form builder form control*/
  /*first _name, last_name,age,email*/
  /**/

  demoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private demoService: FormDemoServiceService
  ) {
    this.demoForm = this.fb.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      age: new FormControl(''),
      email: new FormControl(''),
    });
  }

  // onsubmit function
  onSubmit() {

    console.log("form Submited");
    console.log(this.demoForm.value);

    this.demoService.serviceCall(this.demoForm.value).subscribe((response)=>{
      console.log('server response:',response);
    })
  }

}
