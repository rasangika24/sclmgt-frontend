import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesRoutes } from './pages.routing.module';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { AddRemoveTableComponent } from './add-remove-table/add-remove-table.component';
import { FormDemoComponent } from './form-demo/form-demo.component';
import { EmployeeComponent } from './employee/employee.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RecruitmentSelectionAdmissionComponent } from './recruitment-selection-admission/recruitment-selection-admission.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { ClassGradeGenerateComponent } from './class-grade-generate/class-grade-generate.component';
import { LeavingComponent } from './leaving/leaving.component';
import { CharacterComponent } from './character/character.component';
import { StudentComponent } from './student/student.component';
import { NoneAcademicStaffComponent } from './none-academic-staff/none-academic-staff.component';
import { ApplicationToStaffComponent } from './application-to-staff/application-to-staff.component';
import { ReliefPeriodManagementComponent } from './relief-period-management/relief-period-management.component';
import { AcademicStaffComponent } from './academic-staff/academic-staff.component';
import { SbamarksComponent } from './sbamarks/sbamarks.component';
import { ClassmanagementComponent } from './classmanagement/classmanagement.component';
import { TermtestmarksComponent } from './termtestmarks/termtestmarks.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { CreateExamComponent } from './create-exam/create-exam.component';
import { AcademicStaffDetailsComponent } from './academic-staff-details/academic-staff-details.component';
import { NoneAcademicStaffDetailsComponent } from './none-academic-staff-details/none-academic-staff-details.component';
import { ExtraComponent } from './extra/extra.component';
import { RequestcertificateComponent } from './requestcertificate/requestcertificate.component';
import { PaymentsComponent } from './payments/payments.component';

@NgModule({
  declarations: [AppDashboardComponent,
    AddRemoveTableComponent,
    FormDemoComponent,
    EmployeeComponent,
    RecruitmentSelectionAdmissionComponent,
    TermtestmarksComponent,
    SchedulerComponent,
    ClassGradeGenerateComponent,
    LeavingComponent,
    CharacterComponent,
    StudentComponent,
    NoneAcademicStaffComponent,
    ApplicationToStaffComponent,
    ReliefPeriodManagementComponent,
    AcademicStaffComponent,
    SbamarksComponent,
    ClassmanagementComponent,
    StudentDetailsComponent,
    CreateExamComponent,
    AcademicStaffDetailsComponent,
    NoneAcademicStaffDetailsComponent,
    ExtraComponent,
    RequestcertificateComponent,
    PaymentsComponent
  ],

  imports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    RouterModule.forChild(PagesRoutes),
    TablerIconsModule.pick(TablerIcons),
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule
  ],
  exports: [],
})
export class PagesModule { }
