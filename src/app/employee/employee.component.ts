import { Component, OnInit } from '@angular/core';
import { Employee } from '../classes/employee';
import { EmployeeService } from '../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{

  
    isFormVisible: boolean = false;
  
    employee:Employee = new Employee();
    employees: Employee[] = [];
    searchQueryName: string = '';
    id: number =0;
    isEditMode: boolean = false;
  constructor(private employeeService: EmployeeService,private router:Router,  private activatedRoute: ActivatedRoute,private route:ActivatedRoute){}
  
    ngOnInit(): void {
      this.getEmployees();  


        this.id=this.route.snapshot.params['id'];

      this.employeeService.getEmployeeById(this.id).subscribe(data =>{
        this.employee=data;
      },
);
    }


    private getEmployees() {
      this.employeeService.getEmployeeList().subscribe(data => {
        this.employees = data;
      });
    }
  
   
    deleteEmployee(id:number){
      this.employeeService.deleteEmployee(id).subscribe( data =>{
        this.getEmployees();
      })
    }


    toggleEmployeeForm() {
      this.isFormVisible = !this.isFormVisible;
    }

      editEmployee(employee: Employee) {
    this.isFormVisible = true;
    this.isEditMode = true;
    this.employee = { ...employee }; 
  }
     saveEmployee() {
    this.employeeService.createEmployee(this.employee).subscribe((data) => {
      this.getEmployees();
    });
  }
  
    gotoEmployeeList(){
      this.router.navigate(['/employee'])
    }
  
    onSubmit() {
      this.saveEmployee();
      this.router.navigate(['.'], { relativeTo: this.activatedRoute });
    }



    resetEmployeeList() {
      this.getEmployees();
    }

    searchEmployees() {
      if (this.searchQueryName.trim() === '') {

        this.resetEmployeeList();
      } else {

        this.employees = this.employees.filter(employee => {
          const fullName = `${employee.firstname} ${employee.lastname}`;
          return fullName.toLowerCase().includes(this.searchQueryName.toLowerCase());
        });
      }
    }


    //Update
    onSubmitUpdate(){
      this.employeeService.updateEmployee(this.id,this.employee).subscribe( data =>{
        this.gotoEmployeeList();
        
      })
    }
}


