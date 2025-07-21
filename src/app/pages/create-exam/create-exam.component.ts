import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-exam',
  standalone: false,
  templateUrl: './create-exam.component.html',
  styleUrl: './create-exam.component.scss'
})
export class CreateExamComponent {

    createExamForm: FormGroup;
    constructor(private fb: FormBuilder,
          private router: Router
    ) {
      this.createExamForm = this.fb.group({
        examCo: new FormControl(''),
        examName: new FormControl(''),
        year: new FormControl(''),
        by: new FormControl(''),
      });
    }

      onSubmit() {
    console.log("form Submitted"); //for check function call
    console.log(this.createExamForm.value); // for check formControllName
  }

    back(): void {
    window.history.back();
  }
}
