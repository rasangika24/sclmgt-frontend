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
import { LeavingComponent } from './leaving/leaving.component';
import { CharacterComponent } from './character/character.component';
import { StudentComponent } from './student/student.component';



@NgModule({
  declarations: [AppDashboardComponent, AddRemoveTableComponent,FormDemoComponent,EmployeeComponent, RecruitmentSelectionAdmissionComponent, LeavingComponent, CharacterComponent,StudentComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    RouterModule.forChild(PagesRoutes),
    TablerIconsModule.pick(TablerIcons),
    MatFormFieldModule, MatInputModule, MatDatepickerModule
  ],
  exports: []
})
export class PagesModule {}
