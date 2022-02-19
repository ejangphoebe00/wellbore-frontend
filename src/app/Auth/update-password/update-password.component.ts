import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgPopupsService } from 'ng-popups';


@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  formGroup!: FormGroup;
  title!: string;
  updatevalue: any;
  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  useredit: any = [];
  users: any = [];
  Roles:any = ['App Admin','Data Admin','Staff'];
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
  updaterole: boolean = false;
  password_update: boolean = false;

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
    this.captureWellsInstance();
    this.getSecurityId();
    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    if ((this.authservice.getRole() == "Data Admin")|| (this.authservice.getRole() == "Staff")||(this.authservice.getRole() == "Application Admin")) {
      this.password_update = false;
    } else {
      this.password_update = true;
    }
   
  }

 

  
  getSecurityId() {
    this.authservice.getWebSeurityId().subscribe(res => {
      this.securityIds = res;
      console.log(this.securityIds);
    })
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
      UserCompanyId: new FormControl(),
      UserPremsUserId: new FormControl(),
      UserStaffId: new FormControl(),
      OrganisationName: new FormControl(),
      UserEmailAddress: new FormControl(),
      UserSecurityLevelId: new FormControl(),
      UserWebSecurityLevelId: new FormControl(),
      UserNogtrWebSecurityLevelId: new FormControl(),
      UserPremsWebSecurityLevelId: new FormControl(),
      UserIntranetSecurityLevelId: new FormControl(),
      UserNsdWebSecurityLevelId: new FormControl(),
      Comments: new FormControl(),
      ActivationChangeComment: new FormControl(),
      OrganisationUserName: new FormControl(),
      UserPassword: new FormControl()

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




  captureWellsInstance() {
    this.http.get('http://127.0.0.1:8899/user/get_user/' + this.authservice.getUserId())
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
          UserCompanyId: this.authservice.stripFormValue(this.updatevalue.UserCompanyId),
          UserPremsUserId: this.authservice.stripFormValue(this.updatevalue.UserPremsUserId),
          UserStaffId: this.authservice.stripFormValue(this.updatevalue.UserStaffId),
          OrganisationName: this.authservice.stripFormValue(this.updatevalue.OrganisationName),
          UserEmailAddress: this.authservice.stripFormValue(this.updatevalue.UserEmailAddress),
          UserSecurityLevelId: this.authservice.stripFormValue(this.updatevalue.UserSecurityLevelId),
          UserWebSecurityLevelId: this.authservice.stripFormValue(this.updatevalue.UserWebSecurityLevelId),
          UserNogtrWebSecurityLevelId: this.authservice.stripFormValue(this.updatevalue.UserNogtrWebSecurityLevelId),
          UserPremsWebSecurityLevelId: this.authservice.stripFormValue(this.updatevalue.UserPremsWebSecurityLevelId),
          UserIntranetSecurityLevelId: this.authservice.stripFormValue(this.updatevalue.UserIntranetSecurityLevelId),
          UserNsdWebSecurityLevelId: this.authservice.stripFormValue(this.updatevalue.UserNsdWebSecurityLevelId),
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


  UpdateUserProcess() {
    if (this.formGroup.valid) {
      // console.log(this.formGroup.value)
      this.authservice.updatePassword(this.formGroup.value).subscribe(result => {
        console.log(result)
        if (result.message == "Details updated successfully") {
          this.toastr.success("Details updated successfully. Please login again", "", {
            timeOut: 2000,
            positionClass: 'toast-top-center',
            progressBar: true,
            progressAnimation: 'increasing'
          })
          this.formGroup.reset();
          this.authservice.logoutuser();
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

  updateUserRole(){
    console.log("Clicked on user role")
    if (true) {
      console.log("Clicked on user role Again")

     console.log(this.formGroup.value)
      this.authservice.updateRole(this.formGroup.value).subscribe(result => {
        console.log(result)
        if (result.message == "User Role successfully Updated") {
          this.toastr.success("User Role successfully Updated", "", {
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
