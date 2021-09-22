import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-cuttings',
  templateUrl: './add-cuttings.component.html',
  styleUrls: ['./add-cuttings.component.css']
})
export class AddCuttingsComponent implements OnInit {

  formGroup!: FormGroup;
  title!: string;
  wellboreIds: any;
  WBCoringContractor_id: any;
  today : any;
  cuttings:any = ['Washed_Dried','Washed_Wet','Wet_Unwashed','Dry_Unwashed'];

  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService
  ) { 
  }

  ngOnInit(): void {
    this.initForm();
    this.getWelboreId();
    this.getWBCoringContractorId();
  }

  initForm(){
    this.formGroup = new FormGroup({
      Wellbore_id:new FormControl(),
      Sample_box_number:new FormControl(),
      Cutting_category:new FormControl(),
      Sample_type:new FormControl(),
      Minimum_depth:new FormControl(),
      Maximum_depth:new FormControl(),
      Sample_interval:new FormControl(),
      Date_received:new FormControl(),
      Other_description:new FormControl(),
    });
  }

  logout(){
    this.authservice.logoutuser()

  }

  addCutting(){
    console.log("tested")
    if(this.formGroup.valid){
      this.authservice.addCuts(this.formGroup.value).subscribe(result =>{
        console.log(result)

        if(result.message == "Cutting added successfuly."){
          this.toastr.success("Cutting added successfuly.","",{
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

  getWelboreId(){
    this.authservice.getWelboreIds().subscribe(res =>{
      this.wellboreIds = res;
      console.log(this.wellboreIds);
    })
  }

  changeContractingId(e:any) {
    console.log(e.value)
    this.WBCoringContractor_id.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeWellboreId(e:any) {
    console.log(e.value)
    this.wellboreIds.setValue(e.target.value, {
      onlySelf: true
    })
  }

  getWBCoringContractorId(){
    this.authservice.getCompanies().subscribe(res =>{
      this.WBCoringContractor_id = res;
      console.log(this.WBCoringContractor_id);
    })
  }

  changeFluids(e:any) {
    console.log(e.value)
    this.cuttings.setValue(e.target.value, {
      onlySelf: true
    })
  }

  get f(){return this.formGroup.controls}

}


