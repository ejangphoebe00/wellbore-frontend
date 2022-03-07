import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {
  formGroup!: FormGroup;
  title!: string;
  role:any;
  userEmail: any;
  loggedin: any;
  Roles:any = ['App Admin','Data Admin','Staff'];
  securityIds: any;
  submitted:boolean = false
  maxd: any;
  mindate: any;



  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService
        
  ) { }

  ngOnInit(): void {
   
     this.maxd = new Date();
    if (this.maxd.getDate() < 9) {
      this.mindate = this.maxd.getFullYear() + '-' + parseInt(this.maxd.getMonth() + 1) + '-' + 0 + this.maxd.getDate()
    } else {
      this.mindate = this.maxd.getFullYear() + '-' + parseInt(this.maxd.getMonth() + 1) + '-' + this.maxd.getDate()

    }

    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    if(this.authservice.getRole()=="Admin"){
      this.role=true;
    }else{
    this.role= false;
    }

    this.initForm();
    this.getSecurityId();
 
  }

  changeRoles(e:any) {
    console.log(e.value)
    this.Roles.setValue(e.target.value, {
      onlySelf: true
    })
  }

  getRoles() {
    return this.formGroup.get('UserCategory');
  }


  initForm(){
    this.formGroup = new FormGroup({
      FirstName:new FormControl(),
      MiddleName:new FormControl(),
      Surname:new FormControl(),
      LUID:new FormControl(),
      CraneUserName:new FormControl(),
      LoginID:new FormControl(),
      LoginIDAlias:new FormControl(),
      UserCompanyId:new FormControl(),
      UserPremsUserId:new FormControl(),
      UserStaffId:new FormControl(),
      OrganisationName:new FormControl(),
      UserEmailAddress:new FormControl(),
      UserSecurityLevelId:new FormControl(),
      UserWebSecurityLevelId:new FormControl(),
      UserNogtrWebSecurityLevelId:new FormControl(),
      UserPremsWebSecurityLevelId:new FormControl(),
      UserIntranetSecurityLevelId:new FormControl(),
      UserNsdWebSecurityLevelId:new FormControl(),
      Comments:new FormControl(),
      OrganisationUserName:new FormControl(),
      DefaultPassword:new FormControl()
      
    });
  }


  logout(){
    this.authservice.logoutuser()

  }


  addUserProcess(){
    console.log("Clicked")
    if(this.formGroup.valid){
      console.log(this.formGroup.value)
      this.authservice.addUser(this.formGroup.value).subscribe(result =>{
        console.log(result)
        if(result.message == "account created successfully"){
          this.toastr.success("account created successfully","",{
            timeOut: 2000,
            positionClass: 'toast-top-center',
            progressBar: true,
            progressAnimation:'increasing'
          })
          this.formGroup.reset();          
        } else{          
          this.authservice.securityStatus()
        }
      }, error => {
        
        console.log('oops', error.message)
        if(error){
          this.toastr.error(error.error.message,"",{
            timeOut: 2000,
            positionClass: 'toast-top-center',
            progressBar: true,
            progressAnimation:'decreasing'
          })
        }
      }
      
      )
    }
  }

  getSecurityId(){
    this.authservice.getWebSeurityId().subscribe(res =>{
      this.securityIds = res;
      console.log(this.securityIds);
    })
  }

  changeSecurity(e:any) {
    console.log(e.value)
    this.securityIds.setValue(e.target.value, {
      onlySelf: true
    })
  }

  get FirstName(){return this.formGroup.get('FirstName')}

  get f(){return this.formGroup.controls}

}
