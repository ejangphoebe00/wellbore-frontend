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
  maxd: any;
  mindate: any;

  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.maxd = new Date(); 
    this.mindate = this.maxd.getFullYear()+'-'+parseInt(this.maxd.getMonth()+1)+'-'+ 0+this.maxd.getDate()
    this.initForm();
  }

  initForm(){
    this.formGroup = new FormGroup({
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

    });
  }

  logout(){
    this.authservice.logoutuser()

  }

  addStratLitho(){
    console.log("tested")
    if(this.formGroup.valid){
      Object.keys(this.formGroup.value).forEach((key) => (this.formGroup.value[key] == null) && this.formGroup.value[key] == "");
      console.log(this.formGroup.value)
      this.authservice.addStratLithoUnit(this.formGroup.value).subscribe(result =>{
        console.log(result)

        if(result.message == "Strat Litho Unit added successfuly."){
          this.toastr.success("Strat Litho Unit added successfuly.","",{
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
        }
      }

      )
    }
  }

  get f(){return this.formGroup.controls}

}
