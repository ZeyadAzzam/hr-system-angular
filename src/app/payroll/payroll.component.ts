import { Component, OnInit } from '@angular/core';
import { Payroll } from '../classes/payroll';
import { PayrollService } from '../services/payroll.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Employee } from '../classes/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {

  employee:Employee = new Employee();
    employees: Employee[] = [];
    combinedData: any[] = [];
  searchQueryName: string = '';

  payroll:Payroll =new Payroll();
  payrolls: Payroll[] = [];
  totalPays: number[] = [];

  
  id: number =0;

  constructor(private payrollService: PayrollService,private employeeService: EmployeeService,private router:Router,  private activatedRoute: ActivatedRoute,private route:ActivatedRoute){}
  
  ngOnInit(): void {
    this.getPayroll();

    this.getEmployees(); 

    this.alignData();

    this.id=this.route.snapshot.params['id'];

    this.payrollService.getPayrollById(this.id).subscribe(data =>{
      this.payroll=data;
    })

    this.employeeService.getEmployeeById(this.id).subscribe(data =>{
      this.employee=data;
    },
  );
    
  }

  private getPayroll() {
    this.payrollService.getPayrollList().subscribe(data => {
      this.payrolls = data;
    })
  }

  private getEmployees() {
    this.employeeService.getEmployeeList().subscribe(data => {
      this.employees = data;

      
    });
  }


  alignData() {
    const maxItems = Math.max(this.employees.length, this.payrolls.length);

    for (let i = 0; i < maxItems; i++) {
      const employee = this.employees[i] || {};
      const payroll = this.payrolls[i] || {};

      this.combinedData.push({
        employeeId: employee.id || '',
        employeeName: `${employee.firstname || ''} ${employee.lastname || ''}`,
        payrollMonth: payroll.month || '',
        payrollLoan: payroll.loan || '',
        payrollStatus: payroll.status || '',

        
      });
    }
  }

  
  editPayroll(payroll: Payroll) {
    this.payroll={...payroll};
    
  }

  onSubmitUpdate(){
    this.payrollService.updatePayroll(this.id,this.payroll).subscribe(data =>{
      this.getPayroll();
    })
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


  // working 
calculateTotalPay(employee: Employee, payroll: Payroll): number {
  if (
    employee &&
    typeof employee.salary === 'number' &&
    payroll &&
    typeof payroll.loan === 'number'
  ) {
    return employee.salary - payroll.loan;
  } else {
    return 0;
  }
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