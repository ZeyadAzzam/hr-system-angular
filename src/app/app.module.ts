import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavSidebarComponent } from './nav-sidebar/nav-sidebar.component';
import { DepartmentComponent } from './department/department.component';
import { EmployeeComponent } from './employee/employee.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ProjectComponent } from './project/project.component';
import { PayrollComponent } from './payroll/payroll.component';
import { AnnouncementComponent } from './announcement/announcement.component';


@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, NavSidebarComponent, DepartmentComponent, EmployeeComponent, AttendanceComponent, ProjectComponent, PayrollComponent, AnnouncementComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
