import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-wells',
  templateUrl: './wells.component.html',
  styleUrls: ['./wells.component.css']
})
export class WellsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  users: any = [];
  role:any;
    userEmail:any;
    loggedin:any;
  
    constructor(
      private authservice: ApiPipeService,
      private router: Router,
      private toastr: ToastrService,
      private http: HttpClient
    ) { }
  
    ngOnInit(): void {
      this.authservice.reload();
      this.wellboresList()
      this.userEmail = this.authservice.getEmail();
      this.loggedin = this.authservice.getRole();
      // if(this.authservice.getRole()=="Admin"){
      //   this.role=true;
      // }else{
      // this.role= false;
      // }
    }
  
    ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
    }
  
    wellboresList(): void {
      this.authservice
          .getwellboreCores()
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
  