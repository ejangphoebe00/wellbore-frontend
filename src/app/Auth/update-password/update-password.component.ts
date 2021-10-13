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
    if ((this.authservice.getRole() == "Data Admin")|| (this.authservice.getRole() == "Staff")) {
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


  // More(item: any) {
  //   this.details = true;
  //   this.id = item.CraneUser_id
  //   console.log(this.id);
  //   localStorage.setItem("update-id", this.id);
  //   this.captureWellsInstance();
  //   this.listuser = {
  //     FirstName:item.FirstName,
  //     MiddleName:item.MiddleName,
  //     Surname:item.Surname,
  //     LUID:item.LUID,
  //     CraneUserName:item.CraneUserName,
  //     LoginID:item.LoginID,
  //     LoginIDAlias:item.LoginIDAlias,
  //     UserCategory:item.UserCategory,
  //     UserCompany_id:item.UserCompany_id,
  //     UserPremsUser_id:item.UserPremsUser_id,
  //     UserStaff_id:item.UserStaff_id,
  //     OrganisationName:item.OrganisationName,
  //     UserEmailAddress:item.UserEmailAddress,
  //     UserSecurityLevel_id:item.UserSecurityLevel_id,
  //     UserWebSecurityLevel_id:item.UserWebSecurityLevel_id,
  //     UserNogtrWebSecurityLevel_id:item.UserNogtrWebSecurityLevel_id,
  //     UserPremsWebSecurityLevel_id:item.UserPremsWebSecurityLevel_id,
  //     UserIntranetSecurityLevel_id:item.UserIntranetSecurityLevel_id,
  //     UserNsdWebSecurityLevel_id:item.UserNsdWebSecurityLevel_id,
  //     Comments:item.Comments,
  //     OrganisationUserName:item.OrganisationUserName,
  //     DefaultPassword: item.DefaultPassword
  //   }
  // }

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


  UpdateUserProcess() {
    if (this.formGroup.valid) {
      // console.log(this.formGroup.value)
      this.authservice.updatePassword(this.formGroup.value).subscribe(result => {
        console.log(result)
        if (result.message == "Details updated successfully") {
          this.toastr.success("Details updated successfully", "", {
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
