import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-fluids',
  templateUrl: './add-fluids.component.html',
  styleUrls: ['./add-fluids.component.css']
})
export class AddFluidsComponent implements OnInit {

  formGroup!: FormGroup;
  title!: string;
  wellboreIds: any;
  WBCoringContractor_id: any;
  today : any;
  Fluids:any = ['Oil','Gas','Water'];
  maxd: any;
  mindate: any;
  checkstaff: boolean = false;

  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService
  ) { 
    const currentDate:Date = new Date();
    let dd:any = currentDate.getDate();
    let mm:any = currentDate.getMonth()+1;
    let yyyy:any = currentDate.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

  
    this.today = mm+'/'+dd+'/'+yyyy;
    console.log(this.today)
  }

  ngOnInit(): void {
    if(this.authservice.getRole()=="Data Admin"){
      this.checkstaff=true;
    }else{
    this.checkstaff=false;
    }

    this.maxd = new Date(); 
     this.maxd = new Date();
    if (this.maxd.getDate() < 9) {
      this.mindate = this.maxd.getFullYear() + '-' + parseInt(this.maxd.getMonth() + 1) + '-' + 0 + this.maxd.getDate()
    } else {
      this.mindate = this.maxd.getFullYear() + '-' + parseInt(this.maxd.getMonth() + 1) + '-' + this.maxd.getDate()

    }
    this.initForm();
    this.getWelboreId();
    this.getWBCoringContractorId();
  }

  initForm(){
    this.formGroup = new FormGroup({
      Wellbore_id:new FormControl(),
      Sampling_activity:new FormControl(),
      Fluid_category:new FormControl(),
      Sample_type:new FormControl(),
      Sample_volume:new FormControl(),
      Depth_obtained:new FormControl(),
      Date_collected:new FormControl(),
      Date_received:new FormControl(),
      Sampling_company:new FormControl(),
    });
  }

  logout(){
    this.authservice.logoutuser()

  }

  addFluid(){
    console.log("tested")
    if(this.formGroup.valid){
      this.authservice.addFluid(this.formGroup.value).subscribe(result =>{
        console.log(result)

        if(result.message == "Fluid Sample added successfuly."){
          this.toastr.success("Fluid Sample added successfuly.","",{
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
    this.Fluids.setValue(e.target.value, {
      onlySelf: true
    })
  }

  get f(){return this.formGroup.controls}

}

