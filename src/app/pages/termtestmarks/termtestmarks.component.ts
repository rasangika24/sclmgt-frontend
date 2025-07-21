import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

const ELEMENT_DATA: any[] = [
  {
    examCo: 1, exam: 'Rasangika', year: 1, by: 'Teacher A'
  }
];

@Component({
  selector: 'app-termtestmarks',
  standalone: false,

  templateUrl: './termtestmarks.component.html',
  styleUrl: './termtestmarks.component.scss'
})
export class TermtestmarksComponent {


  termTestForm: FormGroup;
  constructor(private fb: FormBuilder,
        private router: Router
  ) {
    this.termTestForm = this.fb.group({
      fileNumber: new FormControl(''),
      exam: new FormControl(''),
      admissionNumber: new FormControl(''),
      marks: new FormControl(''),
    });
  }


  onSubmit() {
    console.log("form Submitted"); //for check function call
    console.log(this.termTestForm.value); // for check formControllName
  }

  displayedColumns: string[] = ['examCo', 'exam', 'year', 'by'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  createExam(): void {
    // Navigate to the supplement details page with the selected supplement's ID
    console.log('Viewing supplement:');
    this.router.navigate(['/dashboard/exam-create']);

  }

}
