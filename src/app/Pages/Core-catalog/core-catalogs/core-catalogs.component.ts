import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-core-catalogs',
  templateUrl: './core-catalogs.component.html',
  styleUrls: ['./core-catalogs.component.css']
})
export class CoreCatalogsComponent implements OnInit {
  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
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
      this. coreCatalogList();
      this.userEmail = this.authservice.getEmail();
      this.loggedin = this.authservice.getRole();
      // if(this.authservice.getRole()=="Admin"){
      //   this.role=true;
      // }else{
      // this.role= false;
      // }

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

    coreCatalogList(): void {
      this.authservice
          .getCatalogList()
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
