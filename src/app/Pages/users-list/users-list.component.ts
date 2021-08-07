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
role:any;
  userEmail:any;
  loggedin:any;
  id: any;


  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.authservice.reload();
    this.userList()
    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    if(this.authservice.getRole()=="Admin"){
      this.role=true;
    }else{
    this.role= false;
    }
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

      onSelect(selectedItem: any) {
        this.id = selectedItem.CraneUser_id
        console.log(this.id);
        // console.log("Selected item Id: ", selectedItem.WebSecurityLevel_id);
        // this.http.delete('http://127.0.0.1:8899/apiv1/delete_web_security_level/' + this.id)
        //   .subscribe(response => {
        //     this.deleteresp = response;
        //     console.log(this.deleteresp.message)
        //     if (this.deleteresp.message == "Web security level successfully deleted.") {
        //       this.toastr.success("Web security level successfully deleted.", "", {
        //         timeOut: 2000,
        //         positionClass: 'toast-top-center',
        //         progressBar: true,
        //         progressAnimation: 'increasing'
        //       })
        //       setTimeout(() => {                           
        //         this.authservice.reload();
        //       }, 1000);
    
        //     } else {
        //       this.authservice.securityStatusUpdate()
        //     }
        //     console.log(this.deleteresp)
        //   });
      }

  logout(){
    this.authservice.logoutuser()
  }

}
