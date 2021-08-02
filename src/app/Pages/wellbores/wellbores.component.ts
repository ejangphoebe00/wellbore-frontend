import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-wellbores',
  templateUrl: './wellbores.component.html',
  styleUrls: ['./wellbores.component.css']
})
export class WellboresComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

wellbores: any = [];
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
      .getWellbores()
      .subscribe((response: any) => {
        console.log(response)
        this.wellbores = response;
        
        this.dtTrigger.next();
      });
    }

logout(){
  this.authservice.logoutuser()
}

}
