import { Component, OnInit } from '@angular/core';
import { ClassGradeGenerateService } from 'src/app/services/class-grade-generate/class-grade-generate.service';

@Component({
  selector: 'app-class-grade-generate',
  standalone: false,
  templateUrl: './class-grade-generate.component.html',
  styleUrl: './class-grade-generate.component.scss',
})
export class ClassGradeGenerateComponent implements OnInit {
  fromGrade: number | null = null;
  toGrade: number | null = null;

  constructor(private clasGradeGenService: ClassGradeGenerateService) {}

  ngOnInit(): void {}

  generateGrades() {
    console.log(`Generating grades from ${this.fromGrade} to ${this.toGrade}`);

    this.clasGradeGenService
      .generateGrades(this.fromGrade, this.toGrade)
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  generateClasses() {
    console.log('Generating classes...');
  }
}
