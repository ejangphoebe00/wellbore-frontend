import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-file-formats',
  templateUrl: './add-file-formats.component.html',
  styleUrls: ['./add-file-formats.component.css']
})
export class AddFileFormatsComponent implements OnInit {
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
    this.initForm();
    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    if(this.authservice.getRole()=="Admin"){
      this.role=true;
    }else{
    this.role= false;
    }
   this.authservice.reload();
  }

  
  initForm(){
    this.formGroup = new FormGroup({
      FileFormatName:new FormControl(),
      SortOrder:new FormControl(),
      Comments:new FormControl()
  
    });
  }



  logout(){
    this.authservice.logoutuser()

  }


  addFileFormatsProcess(){
    console.log("tested")
    if(this.formGroup.valid){
      console.log(this.formGroup.value)
      this.authservice.addFileGrades(this.formGroup.value).subscribe(result =>{
       
        if(result.message == "File Format added successfuly."){
          this.toastr.success("File Format added successfuly.","",{
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
