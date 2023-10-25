import { Component, OnInit } from '@angular/core';
import { Department } from '../classes/department';
import { DepartmentService } from '../services/department.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  department: Department =new Department();
  departments: Department[] = [];
  id: number = 0;
  constructor(private departmentService: DepartmentService,private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
      
    this.getDepartments();

    this.updateEmployeeNumber();

    this.id=this.route.snapshot.params['id'];
    this.departmentService.getDepartmentById(this.id).subscribe(data =>{
      this.department=data;
    })
  }


  private getDepartments(){
    this.departmentService.getDepartmentList().subscribe(data => {
      this.departments = data;
    });
  }

  private updateEmployeeNumber() {
    this.employeeService.getEmployeeList().subscribe((employees) => {
      this.department.employeeNumber = employees.length;
    });
  }

  deleteDepartment(id:number){
    this.departmentService.deleteDepartment(id).subscribe( data =>{
      this.getDepartments();
    })
  }

  saveDepartment(){
    this.departmentService.createDepartment(this.department).subscribe(data =>{
      this.getDepartments();
    })
  }

  onSubmit(){
    this.saveDepartment();
    this.router.navigate(['/departments']);
  }

}
