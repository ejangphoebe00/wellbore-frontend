import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-core-types',
  templateUrl: './core-types.component.html',
  styleUrls: ['./core-types.component.css']
})
export class CoreTypesComponent implements OnInit {
  formGroup!: FormGroup;
  title!: string;

  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
    // this.authservice.reload();
  }

  initForm(){
    this.formGroup = new FormGroup({
      CoreTypeName:new FormControl(),
      SortOrder:new FormControl(),
      Comments:new FormControl(),
    });
  }

  logout(){
    this.authservice.logoutuser()

  }

  addCoreTypeDetails(){
    console.log("tested")
    if(this.formGroup.valid){
      console.log(this.formGroup.value)
      this.authservice.addCoreType(this.formGroup.value).subscribe(result =>{
        console.log(result)

        if(result.message == "Core Type added successfuly."){
          this.toastr.success("Core Type added successfully.","",{
            timeOut: 2000,
            positionClass: 'toast-top-center',
            progressBar: true,
            progressAnimation:'increasing'
          })
          this.formGroup.reset();
        }
        else{
          this.authservice.coreTypesStatus()
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
