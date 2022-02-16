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
  WBCoringContractorId: any;
  today : any;
  Fluids:any = ['Oil','Gas','Water'];
  Purpose: any = ['Crude Oil Analysis','PVT Analysis','Formation Water Analysis','Natural Gas Analysis','Others'];
  maxd: any;
  mindate: any;
  checkstaff: boolean = false;
  Basins:any = ['Edward-George','Semiliki','Pakwach', 'The Albertine Graben','Hoima Basin','Lake Kyoga Basin','Lake Wamala Basin','Kadam-Moroto Basin'];

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
      WellboreId:new FormControl(),
      SamplingActivity:new FormControl(),
      FluidCategory:new FormControl(),
      SampleType:new FormControl(),
      SampleBasin:new FormControl(),
      SampleVolume:new FormControl(),
      DepthObtained:new FormControl(),
      DateCollected:new FormControl(),
      DateReceived:new FormControl(),
      SamplingCompany:new FormControl(),
      SamplePurpose: new FormControl(),
      OtherSpecifiedSamplePurpose: new FormControl()
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
    this.WBCoringContractorId.setValue(e.target.value, {
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
      this.WBCoringContractorId = res;
      console.log(this.WBCoringContractorId);
    })
  }

  changeFluids(e:any) {
    console.log(e.value)
    this.Fluids.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changePurpose(e:any) {
    console.log(e.value)
    this.Purpose.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeBasins(e: any) {
    console.log(e.value)
    this.Basins.setValue(e.target.value, {
      onlySelf: true
    })
  }

  get f(){return this.formGroup.controls}

}

