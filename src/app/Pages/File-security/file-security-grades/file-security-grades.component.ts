import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-file-security-grades',
  templateUrl: './file-security-grades.component.html',
  styleUrls: ['./file-security-grades.component.css']
})
export class FileSecurityGradesComponent implements OnInit {
  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();


grades: any = [];
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
    // this.authservice.reload();
    this.allGrades()
    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    if(this.authservice.getRole()=="Admin"){
      this.role=true;
    }else{
    this.role= false;
    }
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

  allGrades(): void {
    this.authservice
        .getAllGrades()
        .subscribe((response: any) => {
          console.log(response)
          this.grades = response;

          this.dtTrigger.next();
        });
      }

  logout(){
    this.authservice.logoutuser()
  }

}
