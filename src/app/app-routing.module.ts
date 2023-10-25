import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { DepartmentComponent } from './department/department.component';
import { PayrollComponent } from './payroll/payroll.component';
import { ProjectComponent } from './project/project.component';
// import { authGuard } from './auth.guard';

const routes: Routes = [

    {path:'', redirectTo:'login',pathMatch:'full' },
    {path:'login', component:LoginComponent },
    {path:'dashboard',component:DashboardComponent },
    {path:'department',component:DepartmentComponent },
    {path:'employee',component:EmployeeComponent},
    {path:'attendance',component:AttendanceComponent},
    {path:'project',component:ProjectComponent},
    {path:'payroll',component:PayrollComponent},
    {path:'announcement',component:AnnouncementComponent},


    

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
