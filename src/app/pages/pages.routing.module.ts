import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { FormDemoComponent } from './form-demo/form-demo.component';
import { EmployeeComponent } from './employee/employee.component';
import { RecruitmentSelectionAdmissionComponent } from './recruitment-selection-admission/recruitment-selection-admission.component';
import { LeavingComponent } from './leaving/leaving.component';
import { CharacterComponent } from './character/character.component';
import { StudentComponent } from './student/student.component';

export const PagesRoutes: Routes = [
  {
    path: '',  // http://localhost:4200/dashboard
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
  {//set path of employee module
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
  {//set path to character certificates
    path: 'student',  // http://localhost:4200/dashboard
    component: StudentComponent,
  },
];
