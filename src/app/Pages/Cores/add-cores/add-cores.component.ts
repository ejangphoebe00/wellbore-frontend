import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-cores',
  templateUrl: './add-cores.component.html',
  styleUrls: ['./add-cores.component.css']
})
export class AddCoresComponent implements OnInit {

  formGroup!: FormGroup;
  title!: string;
  wellboreIds: any;
  WBCoringContractor_id: any;
  today : any;

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
    this.initForm();
    this.getWelboreId();
    this.getWBCoringContractorId();
  }

  initForm(){
    this.formGroup = new FormGroup({
      Coring_contractor:new FormControl(),
      Wellbore_id:new FormControl(),
      Core_number:new FormControl(),
      Coring_date:new FormControl(),
      Top_MD:new FormControl(),
      Bottom_MD:new FormControl(),
      Cut_length:new FormControl(),
      Percentage_recovery:new FormControl(),
      Top_formation:new FormControl(),
      Bottom_formation:new FormControl(),
    });
  }

  logout(){
    this.authservice.logoutuser()

  }

  addCore(){
    console.log("tested")
    if(this.formGroup.valid){
      // Object.keys(this.formGroup.value).forEach((key) => (this.formGroup.value[key] == null) && this.formGroup.value[key] == "");
      // console.log(this.formGroup.value)
      this.authservice.addNewCores(this.formGroup.value).subscribe(result =>{
        console.log(result)

        if(result.message == "Core added successfuly."){
          this.toastr.success("Core added successfuly.","",{
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

  get f(){return this.formGroup.controls}

}

