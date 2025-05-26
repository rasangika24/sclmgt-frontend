import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { FormDemoComponent } from './form-demo/form-demo.component';
import { EmployeeComponent } from './employee/employee.component';
import { RecruitmentSelectionAdmissionComponent } from './recruitment-selection-admission/recruitment-selection-admission.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { ClassGradeGenerateComponent } from './class-grade-generate/class-grade-generate.component';

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
  {
    //set path of employee module
    path: 'employee', // http://localhost:4200/dashboard/employee
    component: EmployeeComponent,
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
];
