import { Component, OnInit } from '@angular/core';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authservice: ApiPipeService,
    private router: Router
  ) { }

  ngOnInit(): void {
//  this.authservice.reload();
 
  }

  logout(){
  this.authservice.logoutuser();
  }

}

