import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-rock-sample',
  templateUrl: './add-rock-sample.component.html',
  styleUrls: ['./add-rock-sample.component.css']
})
export class AddRockSampleComponent implements OnInit {

  formGroup!: FormGroup;
  title!: string;
  Basins:any = ['The Albertine Graben','Hoima Basin','Lake Kyoga Basin','Lake Wamala Basin','Kadam-Moroto Basin'];
  maxd: any;
  mindate: any;

  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService
  ) { 
    
  }

  ngOnInit(): void {
  
     this.maxd = new Date();
    if (this.maxd.getDate() < 9) {
      this.mindate = this.maxd.getFullYear() + '-' + parseInt(this.maxd.getMonth() + 1) + '-' + 0 + this.maxd.getDate()
    } else {
      this.mindate = this.maxd.getFullYear() + '-' + parseInt(this.maxd.getMonth() + 1) + '-' + this.maxd.getDate()

    }
    this.initForm();
  }

  initForm(){
    this.formGroup = new FormGroup({
      Sample_id:new FormControl(),
      Date_collected:new FormControl(),
      Date_received:new FormControl(),
      Sample_basin:new FormControl(),
      Rock_name:new FormControl(),
      Coordinate_location:new FormControl(),
      Petrographic_description:new FormControl(),
        });
  }

  logout(){
    this.authservice.logoutuser()

  }

  addRockSample(){
    console.log("tested")
    if(this.formGroup.valid){
      this.authservice.addRocks(this.formGroup.value).subscribe(result =>{
        console.log(result)
        if(result.message == "Rock Sample added successfuly."){
          this.toastr.success("Rock Sample added successfuly.","",{
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

  changeBasins(e:any) {
    console.log(e.value)
    this.Basins.setValue(e.target.value, {
      onlySelf: true
    })
  }


  get f(){return this.formGroup.controls}

}


