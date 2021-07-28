import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();


users: any = [];

  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.userList()
    this.authservice.reload();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  userList(): void {
    this.authservice
        .getAllUsers()
        .subscribe((response: any) => {
          console.log(response)
          this.users = response;
          
          this.dtTrigger.next();
        });
      }

  logout(){
    this.authservice.logoutuser()
  }

}
