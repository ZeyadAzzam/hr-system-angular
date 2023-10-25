  import { Component, OnInit } from '@angular/core';
  import { Employee } from '../classes/employee';
  import { EmployeeService } from '../services/employee.service';
  import { ActivatedRoute, Router } from '@angular/router';


  @Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrls: ['./attendance.component.css']
  })
  export class AttendanceComponent implements OnInit {

    employee:Employee = new Employee();
    employees: Employee[] = [];
    searchQueryName: string = '';
    id: number =0;
    isEditMode: boolean = false;

    
  constructor(private employeeService: EmployeeService,private router:Router,  private activatedRoute: ActivatedRoute,private route:ActivatedRoute,){}

    

    ngOnInit(): void {
      this.getEmployees();  


      this.id=this.route.snapshot.params['id'];

    this.employeeService.getEmployeeById(this.id).subscribe(data =>{
      this.employee=data;
    },
  );
    }


    calculateWorkingHours(employee: Employee): string {
      if (employee.signin && employee.signout) {
        
        const signInTimeISO = new Date().toJSON().slice(0, 10) + 'T' + employee.signin;
        const signOutTimeISO = new Date().toJSON().slice(0, 10) + 'T' + employee.signout;
  
        const signInTime = new Date(signInTimeISO);
        const signOutTime = new Date(signOutTimeISO);
  
        if (!isNaN(signInTime.getTime()) && !isNaN(signOutTime.getTime())) {
          const timeDifference = signOutTime.getTime() - signInTime.getTime();
  
          const hours = Math.floor(timeDifference / (1000 * 60 * 60));
          const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  
          return `${hours} hours ${minutes} minutes`;
        }
      }
  
      return 'N/A';
    }
    


    private getEmployees() {
      this.employeeService.getEmployeeList().subscribe(data => {
        this.employees = data;

        
      });
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

  }
