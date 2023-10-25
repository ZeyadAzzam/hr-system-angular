import { HttpClient } from '@angular/common/http';
import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 

model: any={}
getdata:boolean|undefined;
showAlert: boolean = false;


  constructor(private userservice :UserserviceService,
  private router:Router){}

ngOnInit(): void {
    
}
 

loginUser() {
  var email = this.model.email;
  var password = this.model.password;

  this.userservice.getUserdata(email, password).subscribe((res: any) => {
    this.getdata = res;

    if (this.getdata == true) {
      this.router.navigate(["/dashboard"]);
    } else {
      this.showAlert = true;
    }
  });
}
}