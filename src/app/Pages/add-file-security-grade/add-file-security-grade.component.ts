import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-file-security-grade',
  templateUrl: './add-file-security-grade.component.html',
  styleUrls: ['./add-file-security-grade.component.css']
})
export class AddFileSecurityGradeComponent implements OnInit {
  formGroup!: FormGroup;
  title!: string;
  role:any;
  userEmail:any;
  loggedin:any;


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
      FileSecurityGradeName:new FormControl(),
      SortOrder:new FormControl(),
      Comments:new FormControl()
  
    });
  }



  logout(){
    this.authservice.logoutuser()

  }

  addSecurityGradeProcess(){
    console.log("tested")
    if(this.formGroup.valid){
      console.log(this.formGroup.value)
      this.authservice.addSecurityGrade(this.formGroup.value).subscribe(result =>{
       
        if(result.message == "File Security Grade added successfuly."){
          this.toastr.success("File Security Grade added successfuly.","",{
            timeOut: 2000,
            positionClass: 'toast-top-center',
            progressBar: true,
            progressAnimation:'increasing'
          })
          this.formGroup.reset();
          
        } else{          
          // this.authservice.CompanyFaliure()
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
