import { Component, OnInit } from '@angular/core';
import { ClassGradeGenerateService } from 'src/app/services/class-grade-generate/class-grade-generate.service';

export interface StudentDto {
  id: number;
  indexNo: string;
  fullName: string;
  currentGrade: number;
  currentClass?: string;
  newGrade?: number;
  newClass?: string;
  status: 'ACTIVE' | 'PROMOTED' | 'ASSIGNED';
  dateOfBirth: string;
  gender: 'Male' | 'Female';
}

export interface GradeDto {
  grade: number;
  totalStudents: number;
  classes: ClassDto[];
}

export interface ClassDto {
  className: string;
  grade: number;
  maxStudents: number;
  currentStudents: number;
  students: StudentDto[];
}

@Component({
  selector: 'app-class-grade-generate',
  standalone: false,
  templateUrl: './class-grade-generate.component.html',
  styleUrl: './class-grade-generate.component.scss',
})
export class ClassGradeGenerateComponent implements OnInit {
  fromGrade: number | null = null;
  toGrade: number | null = null;

  // Mock data
  mockStudents: StudentDto[] = [
    {
      id: 1,
      indexNo: 'STU001',
      fullName: 'John Doe',
      currentGrade: 6,
      status: 'ACTIVE',
      dateOfBirth: '2010-03-15',
      gender: 'Male',
    },
    {
      id: 2,
      indexNo: 'STU002',
      fullName: 'Jane Smith',
      currentGrade: 6,
      status: 'ACTIVE',
      dateOfBirth: '2010-07-22',
      gender: 'Female',
    },
    {
      id: 3,
      indexNo: 'STU003',
      fullName: 'Mike Johnson',
      currentGrade: 6,
      status: 'ACTIVE',
      dateOfBirth: '2010-11-08',
      gender: 'Male',
    },
    {
      id: 4,
      indexNo: 'STU004',
      fullName: 'Sarah Williams',
      currentGrade: 6,
      status: 'ACTIVE',
      dateOfBirth: '2010-12-14',
      gender: 'Female',
    },
    {
      id: 5,
      indexNo: 'STU005',
      fullName: 'David Brown',
      currentGrade: 6,
      status: 'ACTIVE',
      dateOfBirth: '2010-05-30',
      gender: 'Male',
    },
    {
      id: 6,
      indexNo: 'STU006',
      fullName: 'Emma Thompson',
      currentGrade: 7,
      status: 'ACTIVE',
      dateOfBirth: '2009-09-18',
      gender: 'Female',
    },
    {
      id: 7,
      indexNo: 'STU007',
      fullName: 'Robert Wilson',
      currentGrade: 7,
      status: 'ACTIVE',
      dateOfBirth: '2009-01-25',
      gender: 'Male',
    },
    {
      id: 8,
      indexNo: 'STU008',
      fullName: 'Lisa Anderson',
      currentGrade: 7,
      status: 'ACTIVE',
      dateOfBirth: '2009-08-12',
      gender: 'Female',
    },
    {
      id: 9,
      indexNo: 'STU009',
      fullName: 'Chris Martin',
      currentGrade: 7,
      status: 'ACTIVE',
      dateOfBirth: '2009-04-03',
      gender: 'Male',
    },
    {
      id: 10,
      indexNo: 'STU010',
      fullName: 'Amy Garcia',
      currentGrade: 7,
      status: 'ACTIVE',
      dateOfBirth: '2009-10-27',
      gender: 'Female',
    },
    {
      id: 11,
      indexNo: 'STU011',
      fullName: 'Kevin Lee',
      currentGrade: 8,
      status: 'ACTIVE',
      dateOfBirth: '2008-06-14',
      gender: 'Male',
    },
    {
      id: 12,
      indexNo: 'STU012',
      fullName: 'Nicole Davis',
      currentGrade: 8,
      status: 'ACTIVE',
      dateOfBirth: '2008-02-09',
      gender: 'Female',
    },
    {
      id: 13,
      indexNo: 'STU013',
      fullName: 'Alex Rodriguez',
      currentGrade: 8,
      status: 'ACTIVE',
      dateOfBirth: '2008-12-01',
      gender: 'Male',
    },
    {
      id: 14,
      indexNo: 'STU014',
      fullName: 'Jessica White',
      currentGrade: 8,
      status: 'ACTIVE',
      dateOfBirth: '2008-07-18',
      gender: 'Female',
    },
    {
      id: 15,
      indexNo: 'STU015',
      fullName: 'Ryan Taylor',
      currentGrade: 8,
      status: 'ACTIVE',
      dateOfBirth: '2008-03-25',
      gender: 'Male',
    },
    {
      id: 16,
      indexNo: 'STU016',
      fullName: 'Hannah Clark',
      currentGrade: 9,
      status: 'ACTIVE',
      dateOfBirth: '2007-11-12',
      gender: 'Female',
    },
    {
      id: 17,
      indexNo: 'STU017',
      fullName: 'Tyler Moore',
      currentGrade: 9,
      status: 'ACTIVE',
      dateOfBirth: '2007-05-08',
      gender: 'Male',
    },
    {
      id: 18,
      indexNo: 'STU018',
      fullName: 'Sophia Jackson',
      currentGrade: 9,
      status: 'ACTIVE',
      dateOfBirth: '2007-09-30',
      gender: 'Female',
    },
    {
      id: 19,
      indexNo: 'STU019',
      fullName: 'Brandon Lewis',
      currentGrade: 9,
      status: 'ACTIVE',
      dateOfBirth: '2007-01-17',
      gender: 'Male',
    },
    {
      id: 20,
      indexNo: 'STU020',
      fullName: 'Olivia Walker',
      currentGrade: 9,
      status: 'ACTIVE',
      dateOfBirth: '2007-08-05',
      gender: 'Female',
    },
  ];

  grades: GradeDto[] = [];
  isLoading = false;
  showStudentsList = false;
  studentsForGrade: StudentDto[] = [];
  selectedGrade: number | null = null;

  constructor(private clasGradeGenService: ClassGradeGenerateService) {}

  ngOnInit(): void {
    this.initializeGrades();
  }

  initializeGrades(): void {
    // Initialize grades 6-13
    for (let i = 6; i <= 13; i++) {
      const studentsInGrade = this.mockStudents.filter(
        (s) => s.currentGrade === i
      );
      this.grades.push({
        grade: i,
        totalStudents: studentsInGrade.length,
        classes: [],
      });
    }
  }

  generateGrades() {
    if (!this.fromGrade || !this.toGrade) {
      alert('Please enter both from and to grade values');
      return;
    }

    if (this.fromGrade > this.toGrade) {
      alert('From grade should be less than or equal to To grade');
      return;
    }

    console.log(`Generating grades from ${this.fromGrade} to ${this.toGrade}`);
    this.isLoading = true;

    // Simulate API delay
    setTimeout(() => {
      this.promoteStudents();
      this.isLoading = false;
      alert(
        `Successfully promoted students from grade ${this.fromGrade} to ${this.toGrade}`
      );
    }, 1500);
  }

  promoteStudents(): void {
    // Promote students within the specified grade range
    this.mockStudents.forEach((student) => {
      if (
        student.currentGrade >= this.fromGrade! &&
        student.currentGrade <= this.toGrade!
      ) {
        if (student.currentGrade < 13) {
          // Don't promote grade 13 students
          student.newGrade = student.currentGrade + 1;
          student.status = 'PROMOTED';
        }
      }
    });

    // Update grades array
    this.updateGradesAfterPromotion();
  }

  updateGradesAfterPromotion(): void {
    this.grades.forEach((grade) => {
      const studentsInGrade = this.mockStudents.filter(
        (s) =>
          (s.newGrade && s.newGrade === grade.grade) ||
          (!s.newGrade && s.currentGrade === grade.grade)
      );
      grade.totalStudents = studentsInGrade.length;
    });
  }

  generateClasses() {
    console.log('Generating classes...');
    this.isLoading = true;

    // Simulate API delay
    setTimeout(() => {
      this.autoAssignStudentsToClasses();
      this.isLoading = false;
      alert('Successfully generated classes and assigned students!');
    }, 2000);
  }

  autoAssignStudentsToClasses(): void {
    const studentsPerClass = 25; // Maximum students per class

    this.grades.forEach((grade) => {
      // Get students for this grade (including newly promoted)
      const studentsForGrade = this.mockStudents.filter(
        (s) =>
          (s.newGrade && s.newGrade === grade.grade) ||
          (!s.newGrade && s.currentGrade === grade.grade)
      );

      if (studentsForGrade.length === 0) {
        grade.classes = [];
        return;
      }

      // Calculate number of classes needed
      const numClasses = Math.ceil(studentsForGrade.length / studentsPerClass);
      const classes: ClassDto[] = [];

      // Create classes (A, B, C, etc.)
      for (let i = 0; i < numClasses; i++) {
        const className = String.fromCharCode(65 + i); // A, B, C, etc.
        const startIndex = i * studentsPerClass;
        const endIndex = Math.min(
          startIndex + studentsPerClass,
          studentsForGrade.length
        );
        const assignedStudents = studentsForGrade.slice(startIndex, endIndex);

        // Update student records with new class assignment
        assignedStudents.forEach((student) => {
          student.newClass = `Grade ${grade.grade}${className}`;
          student.status = 'ASSIGNED';
          // Update current grade if promoted
          if (student.newGrade) {
            student.currentGrade = student.newGrade;
            student.currentClass = student.newClass;
          } else {
            student.currentClass = student.newClass;
          }
        });

        classes.push({
          className: `Grade ${grade.grade}${className}`,
          grade: grade.grade,
          maxStudents: studentsPerClass,
          currentStudents: assignedStudents.length,
          students: assignedStudents,
        });
      }

      grade.classes = classes;
    });
  }

  viewStudents(grade: number): void {
    this.selectedGrade = grade;
    this.studentsForGrade = this.mockStudents.filter(
      (s) =>
        (s.newGrade && s.newGrade === grade) ||
        (!s.newGrade && s.currentGrade === grade)
    );
    this.showStudentsList = true;
  }

  closeStudentsList(): void {
    this.showStudentsList = false;
    this.studentsForGrade = [];
    this.selectedGrade = null;
  }

  getGradeInfo(grade: number): GradeDto | undefined {
    return this.grades.find((g) => g.grade === grade);
  }

  getTotalStudentsInGrade(grade: number): number {
    return this.mockStudents.filter(
      (s) =>
        (s.newGrade && s.newGrade === grade) ||
        (!s.newGrade && s.currentGrade === grade)
    ).length;
  }

  getClassesForGrade(grade: number): ClassDto[] {
    const gradeInfo = this.getGradeInfo(grade);
    return gradeInfo ? gradeInfo.classes : [];
  }

  resetAllData(): void {
    if (
      confirm(
        'Are you sure you want to reset all data? This will clear all promotions and class assignments.'
      )
    ) {
      // Reset students to original state
      this.mockStudents.forEach((student) => {
        student.newGrade = undefined;
        student.newClass = undefined;
        student.currentClass = undefined;
        student.status = 'ACTIVE';
      });

      // Reset grades
      this.initializeGrades();

      // Reset form
      this.fromGrade = null;
      this.toGrade = null;
      this.showStudentsList = false;

      alert('All data has been reset successfully!');
    }
  }

  hasAnyClass(): boolean {
    return this.grades?.some((g) => g.classes?.length > 0);
  }
}
