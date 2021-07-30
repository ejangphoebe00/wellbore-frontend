import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-wellbore',
  templateUrl: './add-wellbore.component.html',
  styleUrls: ['./add-wellbore.component.css']
})
export class AddWellboreComponent implements OnInit {
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

    this.initForm();
    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    if(this.authservice.getRole()=="Admin"){
      this.role=true;
    }else{
    this.role= false;
    }
  }

  initForm(){
    this.formGroup = new FormGroup({
      WebSecurityLevelName:new FormControl(),
      WebSecurityLevelDescription:new FormControl(),
      WebSecurityLevelAbbreviation:new FormControl(),
      Comments:new FormControl(),
  
    });
  }


  logout(){
    this.authservice.logoutuser()

  }


  addSecurityProcess(){
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
