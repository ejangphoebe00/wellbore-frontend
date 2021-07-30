import { Component, OnInit } from '@angular/core';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
role:any;
userEmail:any;
loggedin:any;

  constructor(
    private authservice: ApiPipeService,
    private router: Router
  ) { }

  ngOnInit(): void { 
    this.authservice.reload();
    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    if(this.authservice.getRole()=="Admin"){
      this.role=true;
    }else{
    this.role= false;
    }
    
 

 
  }

  logout(){
  this.authservice.logoutuser();
  }

}

