
import { Component, OnInit } from '@angular/core';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  constructor(
    private authservice: ApiPipeService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  logout(){
  this.authservice.logoutuser();
  }

}
