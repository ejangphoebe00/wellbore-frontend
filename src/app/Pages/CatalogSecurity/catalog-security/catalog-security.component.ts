import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr'


@Component({
  selector: 'app-catalog-security',
  templateUrl: './catalog-security.component.html',
  styleUrls: ['./catalog-security.component.css']
})
export class CatalogSecurityComponent implements OnInit {
  formGroup!: FormGroup;
  title!: string;

  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formGroup = new FormGroup({
      CatalogSecurityFlagName:new FormControl(),
      SortOrder:new FormControl(),
      Comments:new FormControl(),
    });
  }

  logout(){
    this.authservice.logoutuser()

  }


  addCatalogSecurity(){
    console.log("tested")
    if(this.formGroup.valid){
      console.log(this.formGroup.value)
      this.authservice.addCatalogSecurityFlag(this.formGroup.value).subscribe(result =>{
        console.log(result)

        if(result.message == "Catalog Security added successfully."){
          this.toastr.success("Catalog Security successfuly.","",{
            timeOut: 2000,
            positionClass: 'toast-top-center',
            progressBar: true,
            progressAnimation:'increasing'
          })
          this.formGroup.reset();
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

