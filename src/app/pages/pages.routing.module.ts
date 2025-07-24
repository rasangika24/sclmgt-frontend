import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { FormDemoComponent } from './form-demo/form-demo.component';
import { EmployeeComponent } from './employee/employee.component';
import { RecruitmentSelectionAdmissionComponent } from './recruitment-selection-admission/recruitment-selection-admission.component';
import { LeavingComponent } from './leaving/leaving.component';
import { CharacterComponent } from './character/character.component';
import { StudentComponent } from './student/student.component';
import { NoneAcademicStaffComponent } from './none-academic-staff/none-academic-staff.component';
import { ApplicationToStaffComponent } from './application-to-staff/application-to-staff.component';
import { TimetableComponent } from './timetable/timetable.component';
import { AcademicStaffComponent } from './academic-staff/academic-staff.component';
import { ReliefPeriodManagementComponent } from './relief-period-management/relief-period-management.component';
import { SbamarksComponent } from './sbamarks/sbamarks.component';
import { ClassmanagementComponent } from './classmanagement/classmanagement.component';
import { TermtestmarksComponent } from './termtestmarks/termtestmarks.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { CreateExamComponent } from './create-exam/create-exam.component';
import { AcademicStaffDetailsComponent } from './academic-staff-details/academic-staff-details.component';
import { NoneAcademicStaffDetailsComponent } from './none-academic-staff-details/none-academic-staff-details.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { ClassGradeGenerateComponent } from './class-grade-generate/class-grade-generate.component';
import { ExtraComponent } from './extra/extra.component';
import { RequestcertificateComponent } from './requestcertificate/requestcertificate.component';
import { PaymentsComponent } from './payments/payments.component';

export const PagesRoutes: Routes = [
  {
    path: '', // http://localhost:4200/dashboard
    component: AppDashboardComponent,
    data: {
      title: 'Starter Page',
    },
  },
  {
    path: '',
    component: AppDashboardComponent,
    data: {
      title: 'Starter Page',
    },
  },
  {
    path: 'form-demo', // http://localhost:4200/dashboard/form-demo
    component: FormDemoComponent,
  },
  {//set path to character certificates
    path: 'student',  // http://localhost:4200/dashboard
    component: StudentComponent,
  },
  {//set path to student details
    path: 'student-details',  // http://localhost:4200/dashboard/student-details
    component: StudentDetailsComponent,
  },
  {
    //set path of employee module
    path: 'employee', // http://localhost:4200/dashboard/employee
    component: EmployeeComponent,
  },
    {//set path of employee module
      path: 'applicant', // http://localhost:4200/dashboard/employee
      component: RecruitmentSelectionAdmissionComponent,
      
    },
    {//set path to leaving certificates
    path: 'leaving',  // http://localhost:4200/dashboard
    component: LeavingComponent,
  },
    {//set path to character certificates
    path: 'character',  // http://localhost:4200/dashboard
    component: CharacterComponent,
  },
  {//set path to noneAcademicStaffCompone
    path: 'academic-staff',  // http://localhost:4200/dashboard
    component: AcademicStaffComponent,
  },
  
  {//set path to noneAcademicStaffCompone
    path: 'none-academic-staff',  // http://localhost:4200/dashboard
    component: NoneAcademicStaffComponent,
  },
   {//set path to application to staff
    path: 'application-to-staff',  // http://localhost:4200/dashboard
    component: ApplicationToStaffComponent,
  },
  {//set path to application to time table
    path: 'timetable',  // http://localhost:4200/dashboard
    component: TimetableComponent,
  },
  {//set path to application to time table
    path: 'relief-period-management',  // http://localhost:4200/dashboard
    component: ReliefPeriodManagementComponent,
  },
  {//set path to application to time table
    path: 'sbamarks',  // http://localhost:4200/dashboard
    component: SbamarksComponent,
  },
   {//set path to application to time table
    path: 'classmanagement',  // http://localhost:4200/dashboard
    component: ClassmanagementComponent,
  },
   {//set path to application to time table
    path: 'termtestmarks',  // http://localhost:4200/dashboard
    component: TermtestmarksComponent,
  },
   {//set path to application to time table
    path: 'exam-create',  // http://localhost:4200/dashboard
    component: CreateExamComponent,
  },
   {//set path to application to time table
    path: 'view-academic-staff-details',  // http://localhost:4200/dashboard
    component: AcademicStaffDetailsComponent,
  },
  {//set path to application to time table
    path: 'view-none-academic-staff-details',  // http://localhost:4200/dashboard
    component: NoneAcademicStaffDetailsComponent,
  },
  {
    //set path of employee module
    path: 'applicant', // http://localhost:4200/dashboard/employee
    component: RecruitmentSelectionAdmissionComponent,
  },
  {
    //set path of employee module
    path: 'time-table', // http://localhost:4200/dashboard/employee
    component: SchedulerComponent,
  },
  {
    //set path of employee module
    path: 'class-grade-gen', // http://localhost:4200/dashboard/employee
    component: ClassGradeGenerateComponent,
  },
  {
    //set path of extra module
    path: 'extra', // http://localhost:4200/dashboard/employee
    component: ExtraComponent,
  },
  {
    //set path of request certificate module
    path: 'request-certificate', // http://localhost:4200/dashboard/employee
    component :RequestcertificateComponent ,
  },
  {
    //set path of payments module
    path: 'payments', // http://localhost:4200/dashboard/employee
    component : PaymentsComponent ,
  },

];
