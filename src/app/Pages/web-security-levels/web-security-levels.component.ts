import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


import { WebSecurity } from 'src/app/models/web-security.model';

@Component({
  selector: 'app-web-security-levels',
  templateUrl: './web-security-levels.component.html',
  styleUrls: ['./web-security-levels.component.css']
})
export class WebSecurityLevelsComponent implements OnInit , OnDestroy{

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();


allusers: any;
posts: any = [];



  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.authservice.reload();
    this.posts = [];
    this.users();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  users(): void {
    this.authservice
        .getSecurity()
        .subscribe((response: any) => {
          console.log(response)
          this.posts = response;
          
          this.dtTrigger.next();
        });
      }

  logout(){
    this.authservice.logoutuser()
  }

  getLevels(){
    this.http.get('http://127.0.0.1:8899/apiv1/get_web_security_level')
    .subscribe(posts => {
      this.posts = posts;
      console.log(this.posts)
  });
  }


}


  
