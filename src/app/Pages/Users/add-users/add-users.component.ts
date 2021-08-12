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
  Roles:any = ['Staff','Admin'];
  securityIds: any;
  submitted:boolean = false



  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService
        
  ) { }

  ngOnInit(): void {
    // this.authservice.reload();

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
      FirstName:new FormControl('',Validators.required),
      MiddleName:new FormControl(),
      Surname:new FormControl('',Validators.required),
      LUID:new FormControl(),
      CraneUserName:new FormControl('',Validators.required),
      LoginID:new FormControl(),
      LoginIDAlias:new FormControl(),
      UserCategory:new FormControl('',Validators.required),
      UserCompany_id:new FormControl(),
      UserPremsUser_id:new FormControl(),
      UserStaff_id:new FormControl('',Validators.required),
      OrganisationName:new FormControl('',Validators.required),
      UserEmailAddress:new FormControl('',Validators.required),
      UserSecurityLevel_id:new FormControl(),
      UserWebSecurityLevel_id:new FormControl('',Validators.required),
      UserNogtrWebSecurityLevel_id:new FormControl(),
      UserPremsWebSecurityLevel_id:new FormControl(),
      UserIntranetSecurityLevel_id:new FormControl(),
      UserNsdWebSecurityLevel_id:new FormControl(),
      Comments:new FormControl(),
      OrganisationUserName:new FormControl(),
      DefaultPassword:new FormControl('',Validators.required)
      
    });
  }


  logout(){
    this.authservice.logoutuser()

  }


  addUserProcess(){
    if(this.formGroup.valid){
      // console.log(this.formGroup.value)
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
          // setTimeout(() => {                           
          //   this.router.navigate(['/web-security-levels']);
          // }, 1000);
          
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
          // this.authservice.CompanyFaliure()
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
