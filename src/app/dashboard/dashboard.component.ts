import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Project } from '../classes/project';
import { ProjectService } from '../services/project.service';

import { Employee } from '../classes/employee';
import { EmployeeService } from '../services/employee.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  employee:Employee = new Employee();
  employees: Employee[] = [];
  combinedData: any[] = [];
  id: number =0;

  project:Project = new Project();
  projects: Project[] = [];

  constructor(private employeeService: EmployeeService,private projectService: ProjectService,private router:Router,  private activatedRoute: ActivatedRoute,private route:ActivatedRoute){}
  

  ngOnInit(): void {
      
    this.getProject();
    this.getEmployees(); 

    this.alignData();
  }

  private getEmployees() {
    this.employeeService.getEmployeeList().subscribe(data => {
      this.employees = data;

      
    });
  }

  private getProject() {
    this.projectService.getProjectList().subscribe(data => {
      this.projects = data;
    })
  }


  alignData() {
    const maxItems = Math.max(this.employees.length, this.projects.length);

    for (let i = 0; i < maxItems; i++) {
      const employee = this.employees[i] || {};
      const project = this.projects[i] || {};

      this.combinedData.push({
        employeeId: employee.id || '',
        employeeName: `${employee.firstname || ''} ${employee.lastname || ''}`,
        projectName: project.projectName || '',
        projectFinish: project.endDate || '',
        projectPriority: project.priority || '',
      });

    }
  }


}