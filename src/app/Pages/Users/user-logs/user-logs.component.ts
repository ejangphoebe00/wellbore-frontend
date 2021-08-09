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

  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
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
    // this.authservice.reload();
    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    if(this.authservice.getRole()=="Admin"){
      this.role=true;
    }else{
    this.role= false;
    }
    this.userLogs()
    this.dtOptions = {
      dom:'Bfrtip',
      // dom:'Btp',
      buttons: [
        // 'columnsToggle',
        // 'colvis',
        {
          extend:'copy',
          tag: 'button',
          className: "btn blue btn-outline"
        },
        {
          extend:'print',
          tag: 'button',
          className: "btn yellow btn-outline"
        },
        {
          extend:'excel',
          tag: 'button',
          className: "btn green btn-outline"
        },
        {
          extend:'pdf',
          tag: 'button',
          className: "btn red btn-outline"
        },
      ]
    }
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
