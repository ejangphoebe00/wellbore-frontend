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


  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService
        
  ) { }

  ngOnInit(): void {
    this.authservice.reload();

    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    if(this.authservice.getRole()=="Admin"){
      this.role=true;
    }else{
    this.role= false;
    }

    this.initForm();
 
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
      UserCategory:new FormControl(),
      UserCompany_id:new FormControl(),
      UserPremsUser_id:new FormControl(),
      UserStaff_id:new FormControl(),
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
    console.log("tested")
    if(this.formGroup.valid){
      console.log(this.formGroup.value)
      this.authservice.addWebSecurity(this.formGroup.value).subscribe(result =>{
        console.log(result)

        if(result.message == "Web security level added successfuly."){
          this.toastr.success("Web security level added successfuly.","",{
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
          // this.authservice.CompanyFaliure()
        }
      }
      
      )
    }
  }

  get f(){return this.formGroup.controls}


}
