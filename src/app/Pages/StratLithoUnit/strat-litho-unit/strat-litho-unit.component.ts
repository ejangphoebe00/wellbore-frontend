import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-strat-litho-unit',
  templateUrl: './strat-litho-unit.component.html',
  styleUrls: ['./strat-litho-unit.component.css']
})
export class StratLithoUnitComponent implements OnInit {
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
      StratLitho_id:new FormControl(),
      PAUID:new FormControl(),
      StratLithoName:new FormControl(),
      ReserviorUnit:new FormControl(),
      LithoStratAlias:new FormControl(),
      IsReservoirUnit_id:new FormControl(),
      LithoStratAge_id:new FormControl(),
      LithoStratDescriptionSoftcopyPath:new FormControl(),
      LithoStratDescriptionHyperlink:new FormControl(),
      LithoStratMapSoftCopyPath:new FormControl(),
      LithoStratMapHyperlink:new FormControl(),
      MapPortalLithoStratMapLink:new FormControl(),
      LithoStratFactsiteUrl:new FormControl(),
      Comments:new FormControl(),
      CreatedBy_id:new FormControl(),
      DateCreated:new FormControl(),
      ModifiedOn:new FormControl(),
      ModifiedBy:new FormControl(),

    });
  }

  logout(){
    this.authservice.logoutuser()

  }

  addStratLitho(){
    console.log("tested")
    if(this.formGroup.valid){
      console.log(this.formGroup.value)
      this.authservice.addStratLithoUnit(this.formGroup.value).subscribe(result =>{
        console.log(result)

        if(result.message == "Company added successfully."){
          this.toastr.success("Company added successfuly.","",{
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
