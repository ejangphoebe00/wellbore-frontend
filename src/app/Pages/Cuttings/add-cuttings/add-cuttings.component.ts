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
 

  WBCoringContractorId: any;
  today: any;
  cuttings: any = ['Washed_Dried', 'Washed_Wet', 'Wet_Unwashed', 'Dry_Unwashed'];
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

  initForm() {
    this.formGroup = new FormGroup({
      WellboreId: new FormControl(),
      SampleBoxNumber: new FormControl(),
      CuttingCategory: new FormControl(),
      SampleType: new FormControl(),
      // MinimumDepth: new FormControl(),
      // MaximumDepth: new FormControl(),
      SampleInterval: new FormControl(),
      DateReceived: new FormControl(),
      OtherDescription: new FormControl(),
      TopDepth: new FormControl(),
      BottomDepth: new FormControl(),
      StoreIdentifier: new FormControl(),
      Operator: new FormControl(),
      SamplingCompany: new FormControl(),
      SamplingDate: new FormControl()
    });
  }

  logout() {
    this.authservice.logoutuser()

  }

  addCutting() {
    console.log("tested")
    if (this.formGroup.valid) {
      this.authservice.addCuts(this.formGroup.value).subscribe(result => {
        console.log(result)

        if (result.message == "Cutting added successfuly.") {
          this.toastr.success("Cutting added successfuly.", "", {
            timeOut: 2000,
            positionClass: 'toast-top-center',
            progressBar: true,
            progressAnimation: 'increasing'
          })
          this.formGroup.reset();
        }
      }, error => {
        console.log('oops', error.message)
        if (error) {
          this.toastr.error(error.error.message, "", {
            timeOut: 2000,
            positionClass: 'toast-top-center',
            progressBar: true,
            progressAnimation: 'decreasing'
          })
        }
      }

      )
    }
  }

  getWelboreId() {
    this.authservice.getWelboreIds().subscribe(res => {
      this.wellboreIds = res;
      console.log(this.wellboreIds);
    })
  }

  changeContractingId(e: any) {
    console.log(e.value)
    this.WBCoringContractorId.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeWellboreId(e: any) {
    console.log(e.value)
    this.wellboreIds.setValue(e.target.value, {
      onlySelf: true
    })
  }

  getWBCoringContractorId() {
    this.authservice.getCompanies().subscribe(res => {
      this.WBCoringContractorId = res;
      console.log(this.WBCoringContractorId);
    })
  }

  changeFluids(e: any) {
    console.log(e.value)
    this.cuttings.setValue(e.target.value, {
      onlySelf: true
    })
  }

  get f() { return this.formGroup.controls }

}


