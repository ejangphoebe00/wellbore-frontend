import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})

export class AddCompanyComponent implements OnInit {
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
      PAUID:new FormControl(),
      CompanyLongName:new FormControl(),
      CompanyShortName:new FormControl(),
      NSD_Number:new FormControl(),
      CompanyCategory_id:new FormControl(),
      CountryOfOrigin_id:new FormControl(),
      CountryOfRegistration_id:new FormControl(),
      RegistrationNumber:new FormControl(),
      TINNumber:new FormControl(),
      CompanyTelephone:new FormControl(),
      CompanyEmail:new FormControl(),
      CompanyWebsite:new FormControl(),
      CompanyEntityType_id:new FormControl(),
      CompanyEntitySubType_id:new FormControl(),
      CompanyMajorActivity_id:new FormControl(),
      CompanyActivityDivision_id:new FormControl(),
      CompanyActivityDivisionClass_id:new FormControl(),
      CompanyActivityDivisionClassCategory_id:new FormControl(),
      BusinessNatureDescription:new FormControl(),
      CompanyPostalAddress:new FormControl(),
      CompanyPhysicalAddress:new FormControl(),
      CompanyOtherEmails:new FormControl(),
      NSDQualificationDate:new FormControl(),
      NSDQualificationYear:new FormControl(),
      PrimaryContactEntity:new FormControl(),
      ContactEntityEmail:new FormControl(),
      ContactEntityTelephone:new FormControl(),
      ContactEntityMobile:new FormControl(),
      ContactDesignation:new FormControl(),
      OperatorSortOrder:new FormControl(),
      ContractorSortOrder:new FormControl(),
      PAURegistrationDate:new FormControl(),
      CraneNOGTRID:new FormControl(),
      TempNOGTRIPwd:new FormControl(),
      RegistrationStatus_id:new FormControl(),
      ClassifyAsUgandan_id:new FormControl(),
      Comments:new FormControl(),
      PrimaryCompanyKind_id:new FormControl(),
      SecondaryCompanyKind_id:new FormControl(),
      OtherCompanyKind_id:new FormControl(),
      CompanyGroup_id:new FormControl(),
      CompanyMobile:new FormControl(),
      CompanyFax:new FormControl(),
      ContactEntityFax:new FormControl(),
      NSD_FromDate:new FormControl(),
      NSD_ToDate:new FormControl(),
      ImportedFromNSD:new FormControl(),
      // ImportedDate:new FormControl(),
      // ExportedDate:new FormControl(),
      ExportedToNogtr:new FormControl(),
      RecordChangeStamp:new FormControl(),
      PreviousLegalName:new FormControl(),
    });
  }

  logout(){
    this.authservice.logoutuser()

  }


  addCompanyDetails(){
    console.log("tested")
    if(this.formGroup.valid){
      console.log(this.formGroup.value)
      this.authservice.addCompany(this.formGroup.value).subscribe(result =>{
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
        else{
          this.authservice.companyStatus()
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
