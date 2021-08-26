import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { NgPopupsService } from 'ng-popups';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  formGroup!: FormGroup;
  title!: string;
  updatevalue: any;
  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  useredit: any = [];
  users: any = [];
  Roles: any = ['Staff', 'Admin'];
  securityIds: any;
  role: any;
  listuser: any;
  userEmail: any;
  loggedin: any;
  id: any;
  deleteresp: any;
  editForm: boolean = true;
  formDetails: boolean = false;
  details: boolean = false;


  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private ngPopups: NgPopupsService,
  ) { }

  ngOnInit(): void {
    // this.authservice.reload();
    this.initForm();
    this.userList();
    this.getSecurityId();

    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    if (this.authservice.getRole() == "Admin") {
      this.role = true;
    } else {
      this.role = false;
    }
    this.dtOptions = {
      dom: 'Bfrtip',
      // dom:'Btp',
      buttons: [
        // 'columnsToggle',
        // 'colvis',
        {
          extend: 'copy',
          tag: 'button',
          className: "btn blue btn-outline"
        },
        {
          extend: 'print',
          tag: 'button',
          className: "btn yellow btn-outline"
        },
        {
          extend: 'excel',
          tag: 'button',
          className: "btn green btn-outline"
        },
        {
          extend: 'pdf',
          tag: 'button',
          className: "btn red btn-outline"
        },
      ]
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getSecurityId() {
    this.authservice.getWebSeurityId().subscribe(res => {
      this.securityIds = res;
      console.log(this.securityIds);
    })
  }



  userList(): void {
    this.authservice
      .getAllUsers()
      .subscribe((response: any) => {
        console.log("users List")
        console.log(response.length)
        this.users = response;

        this.dtTrigger.next();
      });
  }

  onSelect(selectedItem: any) {
    this.id = selectedItem.CraneUser_id

    this.ngPopups.confirm('Are you sure you want to deactivate this account?', { color: 'red' })
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
    this.details= false;
    this.formDetails = true;
    // this.id = selectedItem.CraneUser_id
    // console.log(this.id);
    // localStorage.setItem("update-id", this.id);

    // this.http.get('http://127.0.0.1:8899/user/get_user/' + this.id)
    //   .subscribe(response => {
    //     this.updatevalue = response;
    //     this.formGroup.patchValue({
    //       FirstName: this.authservice.stripFormValue(this.updatevalue.FirstName),
    //       MiddleName: this.authservice.stripFormValue(this.updatevalue.MiddleName),
    //       Surname: this.authservice.stripFormValue(this.updatevalue.Surname),
    //       LUID: this.authservice.stripFormValue(this.updatevalue.LUID),
    //       CraneUserName: this.authservice.stripFormValue(this.updatevalue.CraneUserName),
    //       LoginID: this.authservice.stripFormValue(this.updatevalue.LoginID),
    //       LoginIDAlias: this.authservice.stripFormValue(this.updatevalue.LoginIDAlias),
    //       UserCategory: this.authservice.stripFormValue(this.updatevalue.UserCategory),
    //       UserCompany_id: this.authservice.stripFormValue(this.updatevalue.UserCompany_id),
    //       UserPremsUser_id: this.authservice.stripFormValue(this.updatevalue.UserPremsUser_id),
    //       UserStaff_id: this.authservice.stripFormValue(this.updatevalue.UserStaff_id),
    //       OrganisationName: this.authservice.stripFormValue(this.updatevalue.OrganisationName),
    //       UserEmailAddress: this.authservice.stripFormValue(this.updatevalue.UserEmailAddress),
    //       UserSecurityLevel_id: this.authservice.stripFormValue(this.updatevalue.UserSecurityLevel_id),
    //       UserWebSecurityLevel_id: this.authservice.stripFormValue(this.updatevalue.UserWebSecurityLevel_id),
    //       UserNogtrWebSecurityLevel_id: this.authservice.stripFormValue(this.updatevalue.UserNogtrWebSecurityLevel_id),
    //       UserPremsWebSecurityLevel_id: this.authservice.stripFormValue(this.updatevalue.UserPremsWebSecurityLevel_id),
    //       UserIntranetSecurityLevel_id: this.authservice.stripFormValue(this.updatevalue.UserIntranetSecurityLevel_id),
    //       UserNsdWebSecurityLevel_id: this.authservice.stripFormValue(this.updatevalue.UserNsdWebSecurityLevel_id),
    //       Comments: this.authservice.stripFormValue(this.updatevalue.Comments),
    //       OrganisationUserName: this.authservice.stripFormValue(this.updatevalue.OrganisationUserName),
    //       DefaultPassword: this.authservice.stripFormValue(this.updatevalue.DefaultPassword)

    //     });
    //     console.log(this.updatevalue)
    //   });

  }

  initForm() {
    this.formGroup = new FormGroup({
      FirstName: new FormControl(),
      MiddleName: new FormControl(),
      Surname: new FormControl(),
      LUID: new FormControl(),
      CraneUserName: new FormControl(),
      LoginID: new FormControl(),
      LoginIDAlias: new FormControl(),
      UserCategory: new FormControl(),
      UserCompany_id: new FormControl(),
      UserPremsUser_id: new FormControl(),
      UserStaff_id: new FormControl(),
      OrganisationName: new FormControl(),
      UserEmailAddress: new FormControl(),
      UserSecurityLevel_id: new FormControl(),
      UserWebSecurityLevel_id: new FormControl(),
      UserNogtrWebSecurityLevel_id: new FormControl(),
      UserPremsWebSecurityLevel_id: new FormControl(),
      UserIntranetSecurityLevel_id: new FormControl(),
      UserNsdWebSecurityLevel_id: new FormControl(),
      Comments: new FormControl(),
      OrganisationUserName: new FormControl(),
      DefaultPassword: new FormControl('', Validators.required)

    });
  }



  logout() {
    this.authservice.logoutuser()
  }

  changeSecurity(e: any) {
    console.log(e.value)
    this.securityIds.setValue(e.target.value, {
      onlySelf: true
    })
  }


  More(item: any) {
    this.details = true;
    this.id = item.CraneUser_id
    console.log(this.id);
    localStorage.setItem("update-id", this.id);
    this.captureWellsInstance();
    this.listuser = {
      FirstName:item.FirstName,
      MiddleName:item.MiddleName,
      Surname:item.Surname,
      LUID:item.LUID,
      CraneUserName:item.CraneUserName,
      LoginID:item.LoginID,
      LoginIDAlias:item.LoginIDAlias,
      UserCategory:item.UserCategory,
      UserCompany_id:item.UserCompany_id,
      UserPremsUser_id:item.UserPremsUser_id,
      UserStaff_id:item.UserStaff_id,
      OrganisationName:item.OrganisationName,
      UserEmailAddress:item.UserEmailAddress,
      UserSecurityLevel_id:item.UserSecurityLevel_id,
      UserWebSecurityLevel_id:item.UserWebSecurityLevel_id,
      UserNogtrWebSecurityLevel_id:item.UserNogtrWebSecurityLevel_id,
      UserPremsWebSecurityLevel_id:item.UserPremsWebSecurityLevel_id,
      UserIntranetSecurityLevel_id:item.UserIntranetSecurityLevel_id,
      UserNsdWebSecurityLevel_id:item.UserNsdWebSecurityLevel_id,
      Comments:item.Comments,
      OrganisationUserName:item.OrganisationUserName,
      DefaultPassword: item.DefaultPassword
    }
  }

  captureWellsInstance() {
    this.http.get('http://127.0.0.1:8899/user/get_user/' + this.id)
      .subscribe(response => {
        this.updatevalue = response;
        this.formGroup.patchValue({
          FirstName: this.authservice.stripFormValue(this.updatevalue.FirstName),
          MiddleName: this.authservice.stripFormValue(this.updatevalue.MiddleName),
          Surname: this.authservice.stripFormValue(this.updatevalue.Surname),
          LUID: this.authservice.stripFormValue(this.updatevalue.LUID),
          CraneUserName: this.authservice.stripFormValue(this.updatevalue.CraneUserName),
          LoginID: this.authservice.stripFormValue(this.updatevalue.LoginID),
          LoginIDAlias: this.authservice.stripFormValue(this.updatevalue.LoginIDAlias),
          UserCategory: this.authservice.stripFormValue(this.updatevalue.UserCategory),
          UserCompany_id: this.authservice.stripFormValue(this.updatevalue.UserCompany_id),
          UserPremsUser_id: this.authservice.stripFormValue(this.updatevalue.UserPremsUser_id),
          UserStaff_id: this.authservice.stripFormValue(this.updatevalue.UserStaff_id),
          OrganisationName: this.authservice.stripFormValue(this.updatevalue.OrganisationName),
          UserEmailAddress: this.authservice.stripFormValue(this.updatevalue.UserEmailAddress),
          UserSecurityLevel_id: this.authservice.stripFormValue(this.updatevalue.UserSecurityLevel_id),
          UserWebSecurityLevel_id: this.authservice.stripFormValue(this.updatevalue.UserWebSecurityLevel_id),
          UserNogtrWebSecurityLevel_id: this.authservice.stripFormValue(this.updatevalue.UserNogtrWebSecurityLevel_id),
          UserPremsWebSecurityLevel_id: this.authservice.stripFormValue(this.updatevalue.UserPremsWebSecurityLevel_id),
          UserIntranetSecurityLevel_id: this.authservice.stripFormValue(this.updatevalue.UserIntranetSecurityLevel_id),
          UserNsdWebSecurityLevel_id: this.authservice.stripFormValue(this.updatevalue.UserNsdWebSecurityLevel_id),
          Comments: this.authservice.stripFormValue(this.updatevalue.Comments),
          OrganisationUserName: this.authservice.stripFormValue(this.updatevalue.OrganisationUserName),
          DefaultPassword: this.authservice.stripFormValue(this.updatevalue.DefaultPassword)

        });
        console.log(this.updatevalue)
      });
  }


  changeRoles(e: any) {
    console.log(e.value)
    this.Roles.setValue(e.target.value, {
      onlySelf: true
    })
  }

  getRoles() {
    return this.formGroup.get('UserCategory');
  }


  addUserProcess() {
    if (this.formGroup.valid) {
      // console.log(this.formGroup.value)
      this.authservice.addUser(this.formGroup.value).subscribe(result => {
        console.log(result)
        if (result.message == "account created successfully") {
          this.toastr.success("account created successfully", "", {
            timeOut: 2000,
            positionClass: 'toast-top-center',
            progressBar: true,
            progressAnimation: 'increasing'
          })
          this.formGroup.reset();
          // setTimeout(() => {                           
          //   this.router.navigate(['/web-security-levels']);
          // }, 1000);

        } else {
          this.authservice.securityStatus()
        }
      }, error => {

        console.log('oops', error.message)
        if (error) {
          this.toastr.error(error.error.message, "", {
            timeOut: 2000,
            positionClass: 'toast-top-center',
            progressBar: true,
            progressAnimation: 'decreasing'
          })
          // this.authservice.CompanyFaliure()
        }
      }

      )
    }
  }

  back() {
    // this.router.navigate(['/web-security-levels']);
    this.authservice.reload();

  }
}
