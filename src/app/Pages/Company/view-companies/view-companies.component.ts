import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { NgPopupsService } from 'ng-popups';

import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-view-companies',
  templateUrl: './view-companies.component.html',
  styleUrls: ['./view-companies.component.css']
})

export class ViewCompaniesComponent implements OnInit, OnDestroy{

  formGroup!: FormGroup;
  title!: string;
  role:any;

  dtOptions: any = {};
  // dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();


  allusers: any;
  id: any;
  posts: any = [];
  deleteresp: any;
  status: boolean = true;
  editform: boolean = false;
  updatevalue: any;
  userEmail: any;
  loggedin: any;



  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private ngPopups: NgPopupsService,
  ) { }

  ngOnInit(): void {
    // this.authservice.reload();
    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    if(this.authservice.getRole()=="Admin"){
      this.role=true;
    }else{
    this.role= false;
    }
    this.posts = [];
    this.users();
    this.initForm();
    this.dtOptions = {
      dom:'Bfrtip',
      // dom:'Btp',
      buttons: [
        // 'columnsToggle',
        // 'colvis',
        {
          extend:'copy',
          tag: 'button',
          className: "btn blue btn-outline"
        },
        {
          extend:'print',
          tag: 'button',
          className: "btn yellow btn-outline"
        },
        {
          extend:'excel',
          tag: 'button',
          className: "btn green btn-outline"
        },
        {
          extend:'pdf',
          tag: 'button',
          className: "btn red btn-outline"
        },
      ]
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  users(): void {
    this.authservice
      .getAllCompanies()
      .subscribe((response: any) => {
        console.log(response)
        this.posts = response;

        this.dtTrigger.next();
      });
  }

  logout() {
    this.authservice.logoutuser()
  }

  getAllCompanies() {
    this.http.get('http://127.0.0.1:8899/apiv1/get_companies')
      .subscribe(posts => {
        this.posts = posts;
        console.log(this.posts)
      });
  }

  onSelect(selectedItem: any) {
    this.id = selectedItem.Company_id

    this.ngPopups.confirm("Are you sure you want to delete ?",{
      // theme: 'material',
      color:'OrangeRed',
      okButtonText: 'Yes',
      cancelButtonText:'No',
      title: "Confirm",
    })
    .subscribe(res => {
      if (res) {
        console.log("Selected item Id: ", selectedItem.Company_id);
        this.http.delete('http://127.0.0.1:8899/apiv1/delete_company/' + this.id)
          .subscribe(response => {
            this.deleteresp = response;
            console.log(this.deleteresp.message)
            if (this.deleteresp.message == "Company successfully deleted.") {
              this.toastr.success("Company successfully deleted.", "", {
                timeOut: 2000,
                positionClass: 'toast-top-center',
                progressBar: true,
                progressAnimation: 'increasing'
              })
              setTimeout(() => {
                this.authservice.reload();
              }, 1000);

            } else {
              this.authservice.companyStatusUpdate()
            }
            console.log(this.deleteresp)
          });
      } else {
        console.log("You clicked cancel.")
      }
    });
  }

  onSelectEdit(selectedItem: any) {
    console.log("hide the elements");
    this.status = false;
    this.editform = true;
    this.id = selectedItem.Company_id
    localStorage.setItem("update-id", this.id);
    console.log("Selected item Id: ", selectedItem.Company_id);
    this.http.get('http://127.0.0.1:8899/apiv1/get_company/' + this.id)
      .subscribe(response => {
        this.updatevalue = response;
        this.formGroup.patchValue({

           Company_id: this.updatevalue.Company_id,
           PAUID: this.updatevalue.PAUID,
           CompanyLongName: this.updatevalue.CompanyLongName,
           CompanyShortName: this.updatevalue.CompanyShortName,
           NSD_Number: this.updatevalue.NSD_Number,
           CompanyCategory_id: this.updatevalue.CompanyCategory_id,
           CountryOfOrigin_id: this.updatevalue.CountryOfOrigin_id,
           CountryOfRegistration_id: this.updatevalue.CountryOfRegistration_id,
           RegistrationNumber: this.updatevalue.RegistrationNumber,
           TINNumber: this.updatevalue.TINNumber,
           CompanyTelephone: this.updatevalue.CompanyTelephone,
           CompanyEmail: this.updatevalue.CompanyEmail,
           CompanyWebsite: this.updatevalue.CompanyWebsite,
           CompanyEntityType_id: this.updatevalue.CompanyEntityType_id,
           CompanyEntitySubType_id: this.updatevalue.CompanyEntitySubType_id,
           CompanyMajorActivity_id: this.updatevalue.CompanyMajorActivity_id,
           CompanyActivityDivision_id: this.updatevalue.CompanyActivityDivision_id,
           CompanyActivityDivisionClass_id: this.updatevalue.CompanyActivityDivisionClass_id,
           CompanyActivityDivisionClassCategory_id: this.updatevalue.CompanyActivityDivisionClassCategory_id,
           BusinessNatureDescription: this.updatevalue.BusinessNatureDescription,
           CompanyPostalAddress: this.updatevalue.CompanyPostalAddress,
           CompanyPhysicalAddress: this.updatevalue.CompanyPhysicalAddress,
           CompanyOtherEmails: this.updatevalue.CompanyOtherEmails,
           NSDQualificationDate: this.updatevalue.NSDQualificationDate,
           NSDQualificationYear: this.updatevalue.NSDQualificationYear,
           PrimaryContactEntity: this.updatevalue.PrimaryContactEntity,
           ContactEntityEmail: this.updatevalue.ContactEntityEmail,
           ContactEntityTelephone: this.updatevalue.ContactEntityTelephone,
           ContactEntityMobile: this.updatevalue.ContactEntityMobile,
           ContactDesignation: this.updatevalue.ContactDesignation,
           OperatorSortOrder: this.updatevalue.OperatorSortOrder,
           ContractorSortOrder: this.updatevalue.ContractorSortOrder,
           PAURegistrationDate: this.updatevalue.PAURegistrationDate,
           CraneNOGTRID: this.updatevalue.CraneNOGTRID,
           TempNOGTRIPwd: this.updatevalue.TempNOGTRIPwd,
           RegistrationStatus_id: this.updatevalue.RegistrationStatus_id,
           ClassifyAsUgandan_id: this.updatevalue.ClassifyAsUgandan_id,
           Comments: this.updatevalue.Comments,
           PrimaryCompanyKind_id: this.updatevalue.PrimaryCompanyKind_id,
           SecondaryCompanyKind_id: this.updatevalue.SecondaryCompanyKind_id,
           OtherCompanyKind_id: this.updatevalue.OtherCompanyKind_id,
           CompanyGroup_id: this.updatevalue.CompanyGroup_id,
           CompanyMobile: this.updatevalue.CompanyMobile,
           CompanyFax: this.updatevalue.CompanyFax,
           ContactEntityFax: this.updatevalue.ContactEntityFax,
           NSD_FromDate: this.updatevalue.NSD_FromDate,
           NSD_ToDate: this.updatevalue.NSD_ToDate,
           ImportedFromNSD: this.updatevalue.ImportedFromNSD,
           ImportedDate: this.updatevalue.ImportedDate,
           ExportedDate: this.updatevalue.ExportedDate,
           ExportedToNogtr: this.updatevalue.ExportedToNogtr,
           CreatedBy: this.updatevalue.CreatedBy,
           DateCreated: this.updatevalue.DateCreated,
           PreviousLegalName: this.updatevalue.PreviousLegalName,
        });
        console.log(this.updatevalue)
      });


  }

  navigateBack() {
    this.authservice.reload();
  }

  updateCompanyProcess() {
    console.log("tested")
    if (this.formGroup.valid) {
      console.log(this.formGroup.value)
      this.authservice.editCompany(this.formGroup.value).subscribe(result => {
        console.log(result)

        if (result.message == "Web security level updated successfuly.") {
          this.toastr.success("Web security level updated successfuly.", "", {
            timeOut: 2000,
            positionClass: 'toast-top-center',
            progressBar: true,
            progressAnimation: 'increasing'
          })
          this.formGroup.reset();
          setTimeout(() => {
            this.authservice.reload();
          }, 1000);


        } else {
          this.authservice.companyStatusUpdate()
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

  initForm() {
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
      ImportedDate:new FormControl(),
      ExportedDate:new FormControl(),
      ExportedToNogtr:new FormControl(),
      RecordChangeStamp:new FormControl(),
      PreviousLegalName:new FormControl(),

    });
  }


}
