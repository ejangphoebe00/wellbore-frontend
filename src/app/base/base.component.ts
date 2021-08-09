import { Component, OnInit } from '@angular/core';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
role:any;
userEmail:any;
loggedin:any;



  constructor(
    private authservice: ApiPipeService,
    private router: Router
  ) { }

  ngOnInit(): void { 
    this.authservice.reload();
    this.authservice.viewingStatus();
    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    if(this.authservice.getRole()=="Admin"){
      this.role=true;
    }else{
    this.role=false;
    }
   }

  logout(){
  this.authservice.logoutuser();
  }

}