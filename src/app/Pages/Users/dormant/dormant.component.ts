import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { NgPopupsService } from 'ng-popups';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dormant',
  templateUrl: './dormant.component.html',
  styleUrls: ['./dormant.component.css']
})
export class DormantComponent implements OnInit {
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
        // {
        //   extend: 'copy',
        //   tag: 'button',
        //   className: "btn blue btn-outline"
        // },
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
      .getInactiveUsers()
      .subscribe((response: any) => {
        console.log("Inactive users List")
        console.log(response.length)
        this.users = response;

        this.dtTrigger.next();
      });
  }

  onSelect(selectedItem: any) {
    this.id = selectedItem.CraneUserId

    this.ngPopups.confirm('Are you sure you want to activate this account?', { color: 'blue' })
      .subscribe(res => {
        if (res) {
          console.log(this.id);
          this.http.put('http://127.0.0.1:8899/user/reactivate_account/' + this.id, null)
            .subscribe(response => {
              this.deleteresp = response;
              console.log(this.deleteresp.message)
              if (this.deleteresp.message == "Account successfully Reactivated") {
                this.toastr.success("Account Successfully Reactivated", "", {
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
    // this.id = selectedItem.CraneUserId
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
    //       UserCompanyId: this.authservice.stripFormValue(this.updatevalue.UserCompanyId),
    //       UserPremsUserId: this.authservice.stripFormValue(this.updatevalue.UserPremsUserId),
    //       UserStaffId: this.authservice.stripFormValue(this.updatevalue.UserStaffId),
    //       OrganisationName: this.authservice.stripFormValue(this.updatevalue.OrganisationName),
    //       UserEmailAddress: this.authservice.stripFormValue(this.updatevalue.UserEmailAddress),
    //       UserSecurityLevelId: this.authservice.stripFormValue(this.updatevalue.UserSecurityLevelId),
    //       UserWebSecurityLevelId: this.authservice.stripFormValue(this.updatevalue.UserWebSecurityLevelId),
    //       UserNogtrWebSecurityLevelId: this.authservice.stripFormValue(this.updatevalue.UserNogtrWebSecurityLevelId),
    //       UserPremsWebSecurityLevelId: this.authservice.stripFormValue(this.updatevalue.UserPremsWebSecurityLevelId),
    //       UserIntranetSecurityLevelId: this.authservice.stripFormValue(this.updatevalue.UserIntranetSecurityLevelId),
    //       UserNsdWebSecurityLevelId: this.authservice.stripFormValue(this.updatevalue.UserNsdWebSecurityLevelId),
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
    this.id = item.CraneUserId
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
      UserCompanyId:item.UserCompanyId,
      UserPremsUserId:item.UserPremsUserId,
      UserStaffId:item.UserStaffId,
      OrganisationName:item.OrganisationName,
      UserEmailAddress:item.UserEmailAddress,
      UserSecurityLevelId:item.UserSecurityLevelId,
      UserWebSecurityLevelId:item.UserWebSecurityLevelId,
      UserNogtrWebSecurityLevelId:item.UserNogtrWebSecurityLevelId,
      UserPremsWebSecurityLevelId:item.UserPremsWebSecurityLevelId,
      UserIntranetSecurityLevelId:item.UserIntranetSecurityLevelId,
      UserNsdWebSecurityLevelId:item.UserNsdWebSecurityLevelId,
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
