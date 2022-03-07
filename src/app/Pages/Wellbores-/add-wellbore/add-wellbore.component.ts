import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-wellbore',
  templateUrl: './add-wellbore.component.html',
  styleUrls: ['./add-wellbore.component.css']
})
export class AddWellboreComponent implements OnInit {
  formGroup!: FormGroup;
  title!: string;
  role: any;
  userEmail: any;
  loggedin: any;
  prospectIds: any;
  licenceIds: any
  DevAreas: any = ['KFDA', 'TDA', 'Others'];
  Wellborepurpose: any = ['Wildcat', 'Appraisal', 'Production', 'Injection', 'Observation'];
  WellboreType: any = ['Exploration', 'Development'];
  Basins: any = ['Edward-George', 'Semiliki', 'Pakwach', 'The Albertine Graben', 'Hoima Basin', 'Lake Kyoga Basin', 'Lake Wamala Basin', 'Kadam-Moroto Basin'];
  WellboreStatuses: any = ['Plugged and abandoned', 'Planned', 'Suspended', 'Withdrawn', 'In operation', 'In progress']
  maxd: any;
  mindate: any;


  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.maxd = new Date();
    if (this.maxd.getDate() < 9) {
      this.mindate = this.maxd.getFullYear() + '-' + parseInt(this.maxd.getMonth() + 1) + '-' + 0 + this.maxd.getDate()
    } else {
      this.mindate = this.maxd.getFullYear() + '-' + parseInt(this.maxd.getMonth() + 1) + '-' + this.maxd.getDate()

    }
    // this.authservice.reload();

    this.initForm();
    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    // if(this.authservice.getRole()=="Admin"){
    //   this.role=true;
    // }else{
    // this.role= false;
    // }
    this.getProspectIds();
    this.getLicenseIds();
  }

  initForm() {
    this.formGroup = new FormGroup({
      PAUID: new FormControl(),
      WellboreOfficialName: new FormControl(),
      WellboreLocalName: new FormControl(),
      WellboreAliasName: new FormControl(),
      WellboreSpudDate: new FormControl(),
      SpudYear: new FormControl(),
      WellboreType: new FormControl(),
      InitialWellborePurpose: new FormControl(),
      WellborePurpose: new FormControl(),
      PurposeChangeDate: new FormControl(),
      WellborePurposeId: new FormControl(),
      // Well:new FormControl(),
      ProspectId: new FormControl(),
      Discovery: new FormControl(),
      WellboreContentId: new FormControl(),
      WellboreStatus: new FormControl(),
      WellboreResponsibleLicenceId: new FormControl(),
      LicenseOperatorCompanyId: new FormControl(),
      DrillingContractorCompanyId: new FormControl(),
      WellBoreRigName: new FormControl(),
      Basin: new FormControl(),
      FormerExplAreaName: new FormControl(),
      SeismicLine: new FormControl(),
      RotaryTableElavation: new FormControl(),
      GroundLevelElavation: new FormControl(),
      TDMD: new FormControl(),
      TDTVD: new FormControl(),
      TDDate: new FormControl(),
      CoreContractorId: new FormControl(),
      // RCITakenId:new FormControl(),
      MDTDoneId: new FormControl(),
      FETDoneId: new FormControl(),
      WFTContractor: new FormControl(),
      DSTDoneId: new FormControl(),
      ManifoldFlowTestedId: new FormControl(),
      DSTContractorId: new FormControl(),
      HasPetrophysicalLogsId: new FormControl(),
      PetrophysicalContractorId: new FormControl(),
      TopBasementMD: new FormControl(),
      TopBasementTVD: new FormControl(),
      WellboreTestStatus: new FormControl(),
      PlannedWellboreCost: new FormControl(),
      ActualWellboreCost: new FormControl(),
      WellboreTestCost: new FormControl(),
      CompletionDate: new FormControl(),
      What3WordWellboreLocation: new FormControl(),
      DevelopmentAreaName: new FormControl(),
      Comments: new FormControl(),
      LocationPictureName: new FormControl(),
      LocationPicture: new FormControl(),
      LocationPictureSoftcopyPath: new FormControl(),
      LocationPictureHyperlink: new FormControl(),
      WellboreMapSoftcopyPath: new FormControl(),
      WellboreMapHyperlink: new FormControl(),
      MapPortalWellboreMapLink: new FormControl(),
      WellboreFactsiteUrl: new FormControl(),
      OtherDevelopmentArea: new FormControl(),
      WellboreTypeId: new FormControl()
    });
  }

  getLicenseIds() {
    this.authservice.getAllCompanies().subscribe(res => {
      this.licenceIds = res;
      console.log(this.licenceIds);
    })
  }

  getProspectIds() {
    this.authservice.getAllCompanies().subscribe(res => {
      this.prospectIds = res;
      console.log(this.prospectIds);
    })
  }

  changeProspect(e: any) {
    console.log(e.value)
    this.prospectIds.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeLicense(e: any) {
    console.log(e.value)
    this.licenceIds.setValue(e.target.value, {
      onlySelf: true
    })
  }


  logout() {
    this.authservice.logoutuser()

  }


  addWellboreProcess() {
    console.log("tested")
    if (this.formGroup.valid) {
      console.log(this.formGroup.value)
      this.authservice.adddWellbore(this.formGroup.value).subscribe(result => {

        if (result.message == "Wellbore added successfuly.") {
          this.toastr.success("Wellbore added successfuly.", "", {
            timeOut: 2000,
            positionClass: 'toast-top-center',
            progressBar: true,
            progressAnimation: 'increasing'
          })
          this.formGroup.reset();

        } else {
          this.authservice.wellboreFaliure()
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
          // this.authservice.CompanyFaliure()
        }
      }

      )
    }
  }

  changeDevAreas(e: any) {
    console.log(e.target.value)
    this.DevAreas.setValue(e.target.value, {
      onlySelf: true
    })
    // if (this.cityName()? == 'Others'){
    //    console.log('got you nigga')
    // }
  }

  changePurpose(e: any) {
    console.log(e.value)
    this.Wellborepurpose.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeWelboreType(e: any) {
    console.log("getting type")
    console.log(e.value)
    this.WellboreType.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeBasins(e: any) {
    console.log(e.value)
    this.Basins.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeWellboreStatus(e: any) {
    console.log(e.value)
    this.WellboreStatuses.setValue(e.target.value, {
      onlySelf: true
    })

  }

  get dev() {
    return this.formGroup.get('DevelopmentAreaName');
  }


  get f() { return this.formGroup.controls }
}


