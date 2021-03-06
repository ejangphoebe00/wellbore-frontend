import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-user-logs',
  templateUrl: './user-logs.component.html',
  styleUrls: ['./user-logs.component.css']
})
export class UserLogsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  role:any;


allusers: any;
posts: any = [];
  userEmail:any;
  loggedin: any;

  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient
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
    this.userLogs()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  userLogs(): void {
    this.authservice
        .getLogs()
        .subscribe((response: any) => {
          console.log(response)
          this.posts = response;
          
          this.dtTrigger.next();
        });
      }

  logout(){
    this.authservice.logoutuser()
  }

}
