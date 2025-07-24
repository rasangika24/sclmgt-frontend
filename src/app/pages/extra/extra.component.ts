import { T } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { StudentServiceService } from 'src/app/services/student/student-service.service';

@Component({
  selector: 'app-extra',
  standalone: false,
  templateUrl: './extra.component.html',
  styleUrl: './extra.component.scss'
})
export class ExtraComponent implements OnInit {

  studentName: any;

  onSubmit() {
    throw new Error('Method not implemented.');
  }

  extraform: FormGroup;
  constructor(
    private fb: FormBuilder,
    private studentService: StudentServiceService,
    private messageService: MessageServiceService
  ) {
    this.extraform = this.fb.group({
      indexNo: new FormControl(''),
      namewithInitials: new FormControl(''),
      extracurricularActivities: new FormControl(''),
      admissionNumber: new FormControl(''),
      specialAchievements: new FormControl(''),
      leadershipSkills: new FormControl(''),
      medicalRecords: new FormControl(''),
      malBehavior: new FormControl(''),
      goodBehaviour: new FormControl(''),


    });
  }

  ngOnInit(): void {
    const indexNo = this.extraform.get('indexNo')?.value;
    // this.getStudentName(indexNo)

  }

//  public getStudentName(indexNo: any): void {
//     this.studentService.getStudenByIndexNumber(indexNo).subscribe({
//       next: (response) => {
//         this.studentName = response.
//   },
//   error: (err: any) => {
//     this.messageService.showError(err);
//   }
//     });
//   }

onSelected(selectedIndexNo: string): void {
  console.log("IndexNo:", selectedIndexNo);

  if (selectedIndexNo?.trim()) {
    this.getStudentName(selectedIndexNo.trim());
  }
}

getStudentName(indexNo: string): void {
  this.studentService.getStudenByIndexNumber(indexNo).subscribe({
    next: (response) => {
      this.studentName = response;
    },
    error: (err: any) => {
      this.messageService.showError(err);
    }
  });
}


}
