import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { NgPopupsService } from 'ng-popups';


@Component({
  selector: 'app-wellbores',
  templateUrl: './wellbores.component.html',
  styleUrls: ['./wellbores.component.css']
})
export class WellboresComponent implements OnInit {
  DevAreas: any = ['KFDA', 'TDA', 'Others'];
  Wellborepurpose: any = ['Wildcat', 'Appraisal', 'Production', 'Injection', 'Observation'];
  WellboreType: any = ['Exploration', 'Development'];
  Basins: any = ['Edward-George', 'Semiliki', 'Pakwach', 'The Albertine Graben', 'Hoima Basin', 'Lake Kyoga Basin', 'Lake Wamala Basin', 'Kadam-Moroto Basin'];
  WellboreStatuses: any = ['Plugged and abandoned', 'Planned', 'Suspended', 'Withdrawn', 'In operation', 'In progress']
  maxd: any;
  formGroup!: FormGroup;
  title!: string;
  prospectIds: any;
  licenceIds: any;
  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  allusers: any;
  id: any;
  posts: any = [];
  deleteresp: any;
  status: boolean = true;
  editform: boolean = false;
  updatevalue: any;

  wellbores: any = [];
  role: any;
  userEmail: any;
  loggedin: any;

  details: boolean = false;
  wells: any;
  mindate: any;
  checkstaff: boolean = false;

  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private ngPopups: NgPopupsService
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
    this.formGroup.controls['Basin'].setValue('Edward-George');
    this.userList()
    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    if (this.authservice.getRole() == "Data Admin") {
      this.checkstaff = true;
    } else {
      this.checkstaff = false;
    }

    this.getProspectIds();
    this.getLicenseIds();
    this.dtOptions = {
      dom: 'Bfrtip',
      // dom:'Btp',
      buttons: [
        // 'columnsToggle',
        // 'colvis',
        // {
        //   extend: 'copy',
        //   tag: 'button',
        //   className: "btn blue btn-outline"
        // },
        {
          extend: 'print',
          tag: 'button',
          className: "btn yellow btn-outline"
        },
        {
          extend: 'excel',
          tag: 'button',
          className: "btn green btn-outline"
        },
        {
          extend: 'pdf',
          tag: 'button',
          className: "btn red btn-outline"
        },
      ]
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  userList(): void {
    this.authservice
      .getWellbores()
      .subscribe((response: any) => {
        console.log(response)
        this.wellbores = response;

        this.dtTrigger.next();
      });
  }

  onSelect(selectedItem: any) {
    this.id = selectedItem.WellboreId

    this.ngPopups.confirm("Are you sure you want to delete ?", {
      // theme: 'material',
      color: 'OrangeRed',
      okButtonText: 'Yes',
      cancelButtonText: 'No',
      title: "Confirm",
    })
      .subscribe(res => {
        if (res) {
          console.log("Selected item Id: ", selectedItem.WellboreId);
          this.http.delete('http://127.0.0.1:8899/apiv1/delete_wellbore/' + this.id)
            .subscribe(response => {
              this.deleteresp = response;
              console.log(this.deleteresp.message)
              if (this.deleteresp.message == "Welbore successfully deleted.") {
                this.toastr.success("Welbore successfully deleted.", "", {
                  timeOut: 2000,
                  positionClass: 'toast-top-center',
                  progressBar: true,
                  progressAnimation: 'increasing'
                })
                setTimeout(() => {
                  this.authservice.reload();
                }, 1000);

              } else {
                this.authservice.securityStatusUpdate()
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
    this.details = false;
    this.editform = true;
  }

  More(item: any) {
    this.details = true;
    this.id = item.WellboreId
    localStorage.setItem("update-id", this.id);
    console.log("Selected item Id: ", item.WellboreId);
    this.captureWellsInstance();
    this.wells = {

      PAUID: item.PAUID,
      WellboreOfficialName: item.WellboreOfficialName,
      WellboreLocalName: item.WellboreLocalName,
      WellboreAliasName: item.WellboreAliasName,
      WellboreSpudDate: item.WellboreSpudDate,
      SpudYear: item.SpudYear,
      WellboreTypeId: item.WellboreTypeId,
      InitialWellborePurpose: (item.InitialWellborePurpose).replace('PurposeEnum.', ''),
      WellborePurposeId: item.WellborePurposeId,
      PurposeChangeDate: item.PurposeChangeDate,
      WellboreType: (item.WellboreType).replace('WellboreTypeEnum.', ''),
      ProspectId: item.ProspectId,
      Discovery: item.Discovery,
      WellboreContentId: item.WellboreContentId,
      WellboreStatus: (item.WellboreStatus).replace('StatusEnum.', ''),
      WellboreResponsibleLicenceId: item.WellboreResponsibleLicenceId,
      LicenseOperatorCompanyId: item.LicenseOperatorCompanyId,
      DrillingContractorCompanyId: item.DrillingContractorCompanyId,
      WellBoreRigName: item.WellBoreRigName,
      Basin: (item.Basin).replace('FluidSampleBasin.', ''),
      FormerExplAreaName: item.FormerExplAreaName,
      SeismicLine: item.SeismicLine,
      RotaryTableElavation: item.RotaryTableElavation,
      GroundLevelElavation: item.GroundLevelElavation,
      TDMD: item.TDMD,
      TDTVD: item.TDTVD,
      TDDate: item.TDDate,
      CoreContractorId: item.CoreContractorId,
      RCITakenId: item.RCITakenId,
      MDTDoneId: item.MDTDoneId,
      FETDoneId: item.FETDoneId,
      WFTContractor: item.WFTContractor,
      DSTDoneId: item.DSTDoneId,
      ManifoldFlowTestedId: item.ManifoldFlowTestedId,
      DSTContractorId: item.DSTContractorId,
      HasPetrophysicalLogsId: item.HasPetrophysicalLogsId,
      PetrophysicalContractorId: item.PetrophysicalContractorId,
      TopBasementMD: item.TopBasementMD,
      TopBasementTVD: item.TopBasementTVD,
      WellboreTestStatus:item.WellboreTestStatus,
      PlannedWellboreCost: item.PlannedWellboreCost,
      ActualWellboreCost: item.ActualWellboreCost,
      WellboreTestCost: item.WellboreTestCost,
      CompletionDate: item.CompletionDate,
      What3WordWellboreLocation: item.What3WordWellboreLocation,
      DevelopmentAreaName: (item.DevelopmentAreaName).replace('DevelopmentAreaEnum.', ''),
      Comments: item.Comments,
      LocationPictureName: item.LocationPictureName,
      LocationPicture: item.LocationPicture,
      LocationPictureSoftcopyPath: item.LocationPictureSoftcopyPath,
      LocationPictureHyperlink: item.LocationPictureHyperlink,
      WellboreMapSoftcopyPath: item.WellboreMapSoftcopyPath,
      WellboreMapHyperlink: item.WellboreMapHyperlink,
      MapPortalWellboreMapLink: item.MapPortalWellboreMapLink,
      WellboreFactsiteUrl: item.WellboreFactsiteUrl
    }
  }

  captureWellsInstance() {
    this.http.get('http://127.0.0.1:8899/apiv1/get_wellbore/' + this.id)
      .subscribe(response => {
        this.updatevalue = response;
        this.formGroup.patchValue({
          PAUID: this.authservice.stripFormValue(this.updatevalue.PAUID),
          WellboreOfficialName: this.authservice.stripFormValue(this.updatevalue.WellboreOfficialName),
          WellboreLocalName: this.authservice.stripFormValue(this.updatevalue.WellboreLocalName),
          WellboreAliasName: this.authservice.stripFormValue(this.updatevalue.WellboreAliasName),
          WellboreSpudDate: this.authservice.stripFormValue(this.updatevalue.WellboreSpudDate),
          WellboreTypeId: this.authservice.stripFormValue(this.updatevalue.WellboreTypeId),
          InitialWellborePurpose: this.authservice.stripFormValue((this.updatevalue.InitialWellborePurpose).replace('PurposeEnum.', '')),
          WellborePurposeId: this.authservice.stripFormValue(this.updatevalue.WellborePurposeId),
          PurposeChangeDate: this.authservice.stripFormValue(this.updatevalue.PurposeChangeDate),
          WellboreType: this.authservice.stripFormValue((this.updatevalue.WellboreType).replace('WellboreTypeEnum.', '')),
          ProspectId: this.authservice.stripFormValue(this.updatevalue.ProspectId),
          Discovery: this.authservice.stripFormValue(this.updatevalue.Discovery),
          WellboreContentId: this.authservice.stripFormValue(this.updatevalue.WellboreContentId),
          WellboreStatus: this.authservice.stripFormValue((this.updatevalue.WellboreStatus).replace('StatusEnum.', '')),
          // WellboreResponsibleLicenceId:this.authservice.stripFormValue(this.updatevalue.WellboreResponsibleLicenceId),
          LicenseOperatorCompanyId: this.authservice.stripFormValue(this.updatevalue.LicenseOperatorCompanyId),
          DrillingContractorCompanyId: this.authservice.stripFormValue(this.updatevalue.DrillingContractorCompanyId),
          WellBoreRigName: this.authservice.stripFormValue(this.updatevalue.WellBoreRigName),
          Basin: this.authservice.stripFormValue(this.updatevalue.Basin),
          FormerExplAreaName: this.authservice.stripFormValue(this.updatevalue.FormerExplAreaName),
          SeismicLine: this.authservice.stripFormValue(this.updatevalue.SeismicLine),
          RotaryTableElavation: this.authservice.stripFormValue(this.updatevalue.RotaryTableElavation),
          GroundLevelElavation: this.authservice.stripFormValue(this.updatevalue.GroundLevelElavation),
          TDMD: this.authservice.stripFormValue(this.updatevalue.TDMD),
          TDTVD: this.authservice.stripFormValue(this.updatevalue.TDTVD),
          TDDate: this.authservice.stripFormValue(this.updatevalue.TDDate),
          CoreContractorId: this.authservice.stripFormValue(this.updatevalue.CoreContractorId),
          RCITakenId: this.authservice.stripFormValue(this.updatevalue.RCITakenId),
          MDTDoneId: this.authservice.stripFormValue(this.updatevalue.MDTDoneId),
          FETDoneId: this.authservice.stripFormValue(this.updatevalue.FETDoneId),
          WFTContractor: this.authservice.stripFormValue(this.updatevalue.WFTContractor),
          DSTDoneId: this.authservice.stripFormValue(this.updatevalue.DSTDoneId),
          ManifoldFlowTestedId: this.authservice.stripFormValue(this.updatevalue.ManifoldFlowTestedId),
          DSTContractorId: this.authservice.stripFormValue(this.updatevalue.DSTContractorId),
          HasPetrophysicalLogsId: this.authservice.stripFormValue(this.updatevalue.HasPetrophysicalLogsId),
          PetrophysicalContractorId: this.authservice.stripFormValue(this.updatevalue.PetrophysicalContractorId),
          TopBasementMD: this.authservice.stripFormValue(this.updatevalue.TopBasementMD),
          TopBasementTVD: this.authservice.stripFormValue(this.updatevalue.TopBasementTVD),
          WellboreTestStatus: this.authservice.stripFormValue(this.updatevalue.WellboreTestStatus),
          PlannedWellboreCost: this.authservice.stripFormValue(this.updatevalue.PlannedWellboreCost),
          ActualWellboreCost: this.authservice.stripFormValue(this.updatevalue.ActualWellboreCost),
          WellboreTestCost: this.authservice.stripFormValue(this.updatevalue.WellboreTestCost),
          CompletionDate: this.authservice.stripFormValue(this.updatevalue.CompletionDate),
          What3WordWellboreLocation: this.authservice.stripFormValue(this.updatevalue.What3WordWellboreLocation),
          DevelopmentAreaName: this.authservice.stripFormValue((this.updatevalue.DevelopmentAreaName).replace('DevelopmentAreaEnum.', '')),
          Comments: this.authservice.stripFormValue(this.updatevalue.Comments),
          LocationPictureName: this.authservice.stripFormValue(this.updatevalue.LocationPictureName),
          LocationPicture: this.authservice.stripFormValue(this.updatevalue.LocationPicture),
          LocationPictureSoftcopyPath: this.authservice.stripFormValue(this.updatevalue.LocationPictureSoftcopyPath),
          LocationPictureHyperlink: this.authservice.stripFormValue(this.updatevalue.LocationPictureHyperlink),
          WellboreMapSoftcopyPath: this.authservice.stripFormValue(this.updatevalue.WellboreMapSoftcopyPath),
          WellboreMapHyperlink: this.authservice.stripFormValue(this.updatevalue.WellboreMapHyperlink),
          MapPortalWellboreMapLink: this.authservice.stripFormValue(this.updatevalue.MapPortalWellboreMapLink),
          WellboreFactsiteUrl: this.authservice.stripFormValue(this.updatevalue.WellboreFactsiteUrl)
        });
        console.log(this.updatevalue)
      });

  }


  navigateBack() {
    // this.router.navigate(['/web-security-levels']);
    this.authservice.reload();

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


  updateWellboreProcess() {
    console.log("tested")
    if (this.formGroup.valid) {
      console.log(this.formGroup.value)
      this.authservice.updateWellbore(this.formGroup.value).subscribe(result => {

        if (result.message == "Welbore updated successfuly.") {
          this.toastr.success("Well Updated Successfuly.", "", {
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
      WellborePurposeId: new FormControl(),
      PurposeChangeDate: new FormControl(),
      // WellId:new FormControl(),
      ProspectId: new FormControl(),
      Discovery: new FormControl(),
      WellboreContentId: new FormControl(),
      WellboreStatus: new FormControl(),
      // WellboreResponsibleLicenceId:new FormControl(),
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
      // RCI_TakenId:new FormControl(),
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

  logout() {
    this.authservice.logoutuser()
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




}
