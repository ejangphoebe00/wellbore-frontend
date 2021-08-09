import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { NgPopupsService } from 'ng-popups';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

useredit:any = [];
users: any = [];
role:any;
  userEmail:any;
  loggedin:any;
  id: any;
  deleteresp:any;
  editForm: boolean = true;
  formDetails:boolean = false;


  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private ngPopups: NgPopupsService,
  ) { }

  ngOnInit(): void {
    // this.authservice.reload();
    this.userList()
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

        this.ngPopups.confirm('Are you sure you want to deactivate this account?',{color:'red'})
        .subscribe(res => {
          if (res) {
            console.log(this.id);
            this.http.put('http://127.0.0.1:8899/user/deactivate_account/' + this.id, null)
          .subscribe(response => {
            this.deleteresp = response;
            console.log(this.deleteresp.message)
            if (this.deleteresp.message == "Account successfully Deactivated") {
              this.toastr.success("Account successfully Deactivated", "", {
                timeOut: 2000,
                positionClass: 'toast-top-center',
                progressBar: true,
                progressAnimation: 'increasing'
              })
              setTimeout(() => {
                this.authservice.reload();
              }, 1000);

            } else {
              this.authservice.securityStatusUpdate()
            }
            console.log(this.deleteresp)
          });
          } else {
            console.log('You clicked Cancel. You smart.');
          }
        });

      }

      onEdit(selectedItem: any) {
        this.editForm = false;
        this.formDetails = true;
        this.id = selectedItem.CraneUser_id
        console.log(this.id);
        localStorage.setItem("update-id", this.id);

      }

  logout(){
    this.authservice.logoutuser()
  }

}
