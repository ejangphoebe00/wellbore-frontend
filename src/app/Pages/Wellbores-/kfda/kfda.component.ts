import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { NgPopupsService } from 'ng-popups';

@Component({
  selector: 'app-kfda',
  templateUrl: './kfda.component.html',
  styleUrls: ['./kfda.component.css']
})
export class KfdaComponent implements OnInit {
  DevAreas:any = ['KFDA','TDA','Others'];
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
  wells:any;
  maxd: any;
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
    this.userList()
    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    if(this.authservice.getRole()=="Data Admin"){
      this.checkstaff=true;
    }else{
    this.checkstaff=false;
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
      .getKdaWellbores()
      .subscribe((response: any) => {
        console.log(response)
        this.wellbores = response;

        this.dtTrigger.next();
      });
  }

  onSelect(selectedItem: any) {
    this.id = selectedItem.Wellbore_id

    this.ngPopups.confirm("Are you sure you want to delete ?", {
      // theme: 'material',
      color: 'OrangeRed',
      okButtonText: 'Yes',
      cancelButtonText: 'No',
      title: "Confirm",
    })
      .subscribe(res => {
        if (res) {
          console.log("Selected item Id: ", selectedItem.Wellbore_id);
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
    this.details= false;
    this.editform = true;
    // this.id = selectedItem.Wellbore_id
    // localStorage.setItem("update-id", this.id);
    // console.log("Selected item Id: ", selectedItem.Wellbore_id);
    // this.http.get('http://127.0.0.1:8899/apiv1/get_wellbore/' + this.id)
    //   .subscribe(response => {
    //     this.updatevalue = response;
    //     this.formGroup.patchValue({


    //       PAUID:this.authservice.stripFormValue(this.updatevalue.PAUID),
    //       WellboreOfficialName:this.authservice.stripFormValue(this.updatevalue.WellboreOfficialName),
    //       WellboreLocalName:this.authservice.stripFormValue(this.updatevalue.WellboreLocalName),
    //       WellboreAliasName:this.authservice.stripFormValue(this.updatevalue.WellboreAliasName),
    //       WellboreSpudDate:this.authservice.stripFormValue(this.updatevalue.WellboreSpudDate),
    //       WellboreType_id:this.authservice.stripFormValue(this.updatevalue.WellboreType_id),
    //       InitialWellborePurpose_id:this.authservice.stripFormValue(this.updatevalue.InitialWellborePurpose_id),
    //       WellborePurpose_id:this.authservice.stripFormValue(this.updatevalue.WellborePurpose_id),
    //       PurposeChangeDate:this.authservice.stripFormValue(this.updatevalue.PurposeChangeDate),
    //       Well_id:this.authservice.stripFormValue(this.updatevalue.Well_id),
    //       Prospect_id:this.authservice.stripFormValue(this.updatevalue.Prospect_id),
    //       Discovery_id:this.authservice.stripFormValue(this.updatevalue.Discovery_id),
    //       WellboreContent_id:this.authservice.stripFormValue(this.updatevalue.WellboreContent_id),
    //       WellboreStatus_id:this.authservice.stripFormValue(this.updatevalue.WellboreStatus_id),
    //       WellboreResponsibleLicence_id:this.authservice.stripFormValue(this.updatevalue.WellboreResponsibleLicence_id),
    //       LicenseOperatorCompany_id:this.authservice.stripFormValue(this.updatevalue.LicenseOperatorCompany_id),
    //       DrillingContractorCompany_id:this.authservice.stripFormValue(this.updatevalue.DrillingContractorCompany_id),
    //       WellBoreRigName:this.authservice.stripFormValue(this.updatevalue.WellBoreRigName),
    //       Basin_id:this.authservice.stripFormValue(this.updatevalue.Basin_id),
    //       FormerExplAreaName:this.authservice.stripFormValue(this.updatevalue.FormerExplAreaName),
    //       SeismicLine:this.authservice.stripFormValue(this.updatevalue.SeismicLine),
    //       RotaryTableElavation:this.authservice.stripFormValue(this.updatevalue.RotaryTableElavation),
    //       GroundLevelElavation:this.authservice.stripFormValue(this.updatevalue.GroundLevelElavation),
    //       TD_MD:this.authservice.stripFormValue(this.updatevalue.TD_MD),
    //       TD_TVD:this.authservice.stripFormValue(this.updatevalue.TD_TVD),
    //       TD_Date:this.authservice.stripFormValue(this.updatevalue.TD_Date),
    //       CoreContractor_id:this.authservice.stripFormValue(this.updatevalue.CoreContractor_id),
    //       RCI_Taken_id:this.authservice.stripFormValue(this.updatevalue.RCI_Taken_id),
    //       MDT_Done_id:this.authservice.stripFormValue(this.updatevalue.MDT_Done_id),
    //       FET_Done_id:this.authservice.stripFormValue(this.updatevalue.FET_Done_id),
    //       WFTContractor:this.authservice.stripFormValue(this.updatevalue.WFTContractor),
    //       DST_Done_id:this.authservice.stripFormValue(this.updatevalue.DST_Done_id),
    //       ManifoldFlowTested_id:this.authservice.stripFormValue(this.updatevalue.ManifoldFlowTested_id),
    //       DST_Contractor_id:this.authservice.stripFormValue(this.updatevalue.DST_Contractor_id),
    //       HasPetrophysicalLogs_id:this.authservice.stripFormValue(this.updatevalue.HasPetrophysicalLogs_id),
    //       PetrophysicalContractor_id:this.authservice.stripFormValue(this.updatevalue.PetrophysicalContractor_id),
    //       TopBasementMD:this.authservice.stripFormValue(this.updatevalue.TopBasementMD),
    //       TopBasementTVD:this.authservice.stripFormValue(this.updatevalue.TopBasementTVD),
    //       WellboreTestStatus:this.authservice.stripFormValue(this.updatevalue.WellboreTestStatus),
    //       PlannedWellboreCost:this.authservice.stripFormValue(this.updatevalue.PlannedWellboreCost),
    //       ActualWellboreCost:this.authservice.stripFormValue(this.updatevalue.ActualWellboreCost),
    //       WellboreTestCost:this.authservice.stripFormValue(this.updatevalue.WellboreTestCost),
    //       CompletionDate:this.authservice.stripFormValue(this.updatevalue.CompletionDate),
    //       What3WordWellboreLocation:this.authservice.stripFormValue(this.updatevalue.What3WordWellboreLocation),
    //       DevelopmentAreaName:this.authservice.stripFormValue(this.updatevalue.DevelopmentAreaName),
    //       Comments:this.authservice.stripFormValue(this.updatevalue.Comments),
    //       LocationPictureName:this.authservice.stripFormValue(this.updatevalue.LocationPictureName),
    //       LocationPicture:this.authservice.stripFormValue(this.updatevalue.LocationPicture),
    //       LocationPictureSoftcopyPath:this.authservice.stripFormValue(this.updatevalue.LocationPictureSoftcopyPath),
    //       LocationPictureHyperlink:this.authservice.stripFormValue(this.updatevalue.LocationPictureHyperlink),
    //       WellboreMapSoftcopyPath:this.authservice.stripFormValue(this.updatevalue.WellboreMapSoftcopyPath),
    //       WellboreMapHyperlink:this.authservice.stripFormValue(this.updatevalue.WellboreMapHyperlink),
    //       MapPortalWellboreMapLink:this.authservice.stripFormValue(this.updatevalue.MapPortalWellboreMapLink),
    //       WellboreFactsiteUrl:this.authservice.stripFormValue(this.updatevalue.WellboreFactsiteUrl)
    //     });
    //     console.log(this.updatevalue)
    //   });


  }

   More(item: any) {
    this.details = true;
    this.id = item.Wellbore_id
    localStorage.setItem("update-id", this.id);
    console.log("Selected item Id: ", item.Wellbore_id);
    this.captureWellsInstance();
    this.wells = {

      PAUID:item.PAUID,
      WellboreOfficialName:item.WellboreOfficialName,
      WellboreLocalName:item.WellboreLocalName,
      WellboreAliasName:item.WellboreAliasName,
      WellboreSpudDate:item.WellboreSpudDate,
      SpudYear:item.SpudYear,
      WellboreType_id:item.WellboreType_id,
      InitialWellborePurpose_id:item.InitialWellborePurpose_id,
      WellborePurpose_id:item.WellborePurpose_id,
      PurposeChangeDate:item.PurposeChangeDate,
      Well_id:item.Wellbore_id,
      Prospect_id:item.Prospect_id,
      Discovery_id:item.Discovery_id,
      WellboreContent_id:item.WellboreContent_id,
      WellboreStatus_id:item.WellboreStatus_id,
      WellboreResponsibleLicence_id:item.WellboreResponsibleLicence_id,
      LicenseOperatorCompany_id:item.LicenseOperatorCompany_id,
      DrillingContractorCompany_id:item.DrillingContractorCompany_id,
      WellBoreRigName:item.WellBoreRigName,
      Basin_id:item.Basin_id,
      FormerExplAreaName:item.FormerExplAreaName,
      SeismicLine:item.SeismicLine,
      RotaryTableElavation:item.RotaryTableElavation,
      GroundLevelElavation:item.GroundLevelElavation,
      TD_MD:item.TD_MD,
      TD_TVD:item.TD_TVD,
      TD_Date:item.TD_Date,
      CoreContractor_id:item.CoreContractor_id,
      RCI_Taken_id:item.RCI_Taken_id,
      MDT_Done_id:item.MDT_Done_id,
      FET_Done_id:item.FET_Done_id,
      WFTContractor:item.WFTContractor,
      DST_Done_id:item.DST_Done_id,
      ManifoldFlowTested_id:item.ManifoldFlowTested_id,
      DST_Contractor_id:item.DST_Contractor_id,
      HasPetrophysicalLogs_id:item.HasPetrophysicalLogs_id,
      PetrophysicalContractor_id:item.PetrophysicalContractor_id,
      TopBasementMD:item.TopBasementMD,
      TopBasementTVD:item.TopBasementTVD,
      WellboreTestStatus:item.WellboreTestStatus,
      PlannedWellboreCost:item.PlannedWellboreCost,
      ActualWellboreCost:item.ActualWellboreCost,
      WellboreTestCost:item.WellboreTestCost,
      CompletionDate:item.CompletionDate,
      What3WordWellboreLocation:item.What3WordWellboreLocation,
      DevelopmentAreaName:(item.DevelopmentAreaName).replace('DevelopmentAreaEnum.', ''),
      Comments:item.Comments,
      LocationPictureName:item.LocationPictureName,
      LocationPicture:item.LocationPicture,
      LocationPictureSoftcopyPath:item.LocationPictureSoftcopyPath,
      LocationPictureHyperlink:item.LocationPictureHyperlink,
      WellboreMapSoftcopyPath:item.WellboreMapSoftcopyPath,
      WellboreMapHyperlink:item.WellboreMapHyperlink,
      MapPortalWellboreMapLink:item.MapPortalWellboreMapLink,
      WellboreFactsiteUrl:item.WellboreFactsiteUrl
    }
  }

    captureWellsInstance() {
    this.http.get('http://127.0.0.1:8899/apiv1/get_wellbore/' + this.id)
      .subscribe(response => {
        this.updatevalue = response;
        this.formGroup.patchValue({
          PAUID:this.authservice.stripFormValue(this.updatevalue.PAUID),
          WellboreOfficialName:this.authservice.stripFormValue(this.updatevalue.WellboreOfficialName),
          WellboreLocalName:this.authservice.stripFormValue(this.updatevalue.WellboreLocalName),
          WellboreAliasName:this.authservice.stripFormValue(this.updatevalue.WellboreAliasName),
          WellboreSpudDate:this.authservice.stripFormValue(this.updatevalue.WellboreSpudDate),
          WellboreType_id:this.authservice.stripFormValue(this.updatevalue.WellboreType_id),
          InitialWellborePurpose_id:this.authservice.stripFormValue(this.updatevalue.InitialWellborePurpose_id),
          WellborePurpose_id:this.authservice.stripFormValue(this.updatevalue.WellborePurpose_id),
          PurposeChangeDate:this.authservice.stripFormValue(this.updatevalue.PurposeChangeDate),
          Well_id:this.authservice.stripFormValue(this.updatevalue.Well_id),
          Prospect_id:this.authservice.stripFormValue(this.updatevalue.Prospect_id),
          Discovery_id:this.authservice.stripFormValue(this.updatevalue.Discovery_id),
          WellboreContent_id:this.authservice.stripFormValue(this.updatevalue.WellboreContent_id),
          WellboreStatus_id:this.authservice.stripFormValue(this.updatevalue.WellboreStatus_id),
          WellboreResponsibleLicence_id:this.authservice.stripFormValue(this.updatevalue.WellboreResponsibleLicence_id),
          LicenseOperatorCompany_id:this.authservice.stripFormValue(this.updatevalue.LicenseOperatorCompany_id),
          DrillingContractorCompany_id:this.authservice.stripFormValue(this.updatevalue.DrillingContractorCompany_id),
          WellBoreRigName:this.authservice.stripFormValue(this.updatevalue.WellBoreRigName),
          Basin_id:this.authservice.stripFormValue(this.updatevalue.Basin_id),
          FormerExplAreaName:this.authservice.stripFormValue(this.updatevalue.FormerExplAreaName),
          SeismicLine:this.authservice.stripFormValue(this.updatevalue.SeismicLine),
          RotaryTableElavation:this.authservice.stripFormValue(this.updatevalue.RotaryTableElavation),
          GroundLevelElavation:this.authservice.stripFormValue(this.updatevalue.GroundLevelElavation),
          TD_MD:this.authservice.stripFormValue(this.updatevalue.TD_MD),
          TD_TVD:this.authservice.stripFormValue(this.updatevalue.TD_TVD),
          TD_Date:this.authservice.stripFormValue(this.updatevalue.TD_Date),
          CoreContractor_id:this.authservice.stripFormValue(this.updatevalue.CoreContractor_id),
          RCI_Taken_id:this.authservice.stripFormValue(this.updatevalue.RCI_Taken_id),
          MDT_Done_id:this.authservice.stripFormValue(this.updatevalue.MDT_Done_id),
          FET_Done_id:this.authservice.stripFormValue(this.updatevalue.FET_Done_id),
          WFTContractor:this.authservice.stripFormValue(this.updatevalue.WFTContractor),
          DST_Done_id:this.authservice.stripFormValue(this.updatevalue.DST_Done_id),
          ManifoldFlowTested_id:this.authservice.stripFormValue(this.updatevalue.ManifoldFlowTested_id),
          DST_Contractor_id:this.authservice.stripFormValue(this.updatevalue.DST_Contractor_id),
          HasPetrophysicalLogs_id:this.authservice.stripFormValue(this.updatevalue.HasPetrophysicalLogs_id),
          PetrophysicalContractor_id:this.authservice.stripFormValue(this.updatevalue.PetrophysicalContractor_id),
          TopBasementMD:this.authservice.stripFormValue(this.updatevalue.TopBasementMD),
          TopBasementTVD:this.authservice.stripFormValue(this.updatevalue.TopBasementTVD),
          WellboreTestStatus:this.authservice.stripFormValue(this.updatevalue.WellboreTestStatus),
          PlannedWellboreCost:this.authservice.stripFormValue(this.updatevalue.PlannedWellboreCost),
          ActualWellboreCost:this.authservice.stripFormValue(this.updatevalue.ActualWellboreCost),
          WellboreTestCost:this.authservice.stripFormValue(this.updatevalue.WellboreTestCost),
          CompletionDate:this.authservice.stripFormValue(this.updatevalue.CompletionDate),
          What3WordWellboreLocation:this.authservice.stripFormValue(this.updatevalue.What3WordWellboreLocation),
          DevelopmentAreaName:this.authservice.stripFormValue((this.updatevalue.DevelopmentAreaName).replace('DevelopmentAreaEnum.', '')),
          Comments:this.authservice.stripFormValue(this.updatevalue.Comments),
          LocationPictureName:this.authservice.stripFormValue(this.updatevalue.LocationPictureName),
          LocationPicture:this.authservice.stripFormValue(this.updatevalue.LocationPicture),
          LocationPictureSoftcopyPath:this.authservice.stripFormValue(this.updatevalue.LocationPictureSoftcopyPath),
          LocationPictureHyperlink:this.authservice.stripFormValue(this.updatevalue.LocationPictureHyperlink),
          WellboreMapSoftcopyPath:this.authservice.stripFormValue(this.updatevalue.WellboreMapSoftcopyPath),
          WellboreMapHyperlink:this.authservice.stripFormValue(this.updatevalue.WellboreMapHyperlink),
          MapPortalWellboreMapLink:this.authservice.stripFormValue(this.updatevalue.MapPortalWellboreMapLink),
          WellboreFactsiteUrl:this.authservice.stripFormValue(this.updatevalue.WellboreFactsiteUrl)
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


  updateWellboreProcess(){
    console.log("tested")
    if(this.formGroup.valid){
      console.log(this.formGroup.value)
      this.authservice.updateWellbore(this.formGroup.value).subscribe(result =>{

        if(result.message == "Welbore updated successfuly."){
          this.toastr.success("Well Updated Successfuly.","",{
            timeOut: 2000,
            positionClass: 'toast-top-center',
            progressBar: true,
            progressAnimation:'increasing'
          })
          this.formGroup.reset();

        } else{
          this.authservice.wellboreFaliure()
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



  initForm(){
    this.formGroup = new FormGroup({
      PAUID:new FormControl(),
      WellboreOfficialName:new FormControl(),
      WellboreLocalName:new FormControl(),
      WellboreAliasName:new FormControl(),
      WellboreSpudDate:new FormControl(),
      SpudYear:new FormControl(),
      WellboreType_id:new FormControl(),
      InitialWellborePurpose_id:new FormControl(),
      WellborePurpose_id:new FormControl(),
      PurposeChangeDate:new FormControl(),
      Well_id:new FormControl(),
      Prospect_id:new FormControl(),
      Discovery_id:new FormControl(),
      WellboreContent_id:new FormControl(),
      WellboreStatus_id:new FormControl(),
      WellboreResponsibleLicence_id:new FormControl(),
      LicenseOperatorCompany_id:new FormControl(),
      DrillingContractorCompany_id:new FormControl(),
      WellBoreRigName:new FormControl(),
      Basin_id:new FormControl(),
      FormerExplAreaName:new FormControl(),
      SeismicLine:new FormControl(),
      RotaryTableElavation:new FormControl(),
      GroundLevelElavation:new FormControl(),
      TD_MD:new FormControl(),
      TD_TVD:new FormControl(),
      TD_Date:new FormControl(),
      CoreContractor_id:new FormControl(),
      RCI_Taken_id:new FormControl(),
      MDT_Done_id:new FormControl(),
      FET_Done_id:new FormControl(),
      WFTContractor:new FormControl(),
      DST_Done_id:new FormControl(),
      ManifoldFlowTested_id:new FormControl(),
      DST_Contractor_id:new FormControl(),
      HasPetrophysicalLogs_id:new FormControl(),
      PetrophysicalContractor_id:new FormControl(),
      TopBasementMD:new FormControl(),
      TopBasementTVD:new FormControl(),
      WellboreTestStatus:new FormControl(),
      PlannedWellboreCost:new FormControl(),
      ActualWellboreCost:new FormControl(),
      WellboreTestCost:new FormControl(),
      CompletionDate:new FormControl(),
      What3WordWellboreLocation:new FormControl(),
      DevelopmentAreaName:new FormControl(),
      Comments:new FormControl(),
      LocationPictureName:new FormControl(),
      LocationPicture:new FormControl(),
      LocationPictureSoftcopyPath:new FormControl(),
      LocationPictureHyperlink:new FormControl(),
      WellboreMapSoftcopyPath:new FormControl(),
      WellboreMapHyperlink:new FormControl(),
      MapPortalWellboreMapLink:new FormControl(),
      WellboreFactsiteUrl:new FormControl()
    });
  }

  logout() {
    this.authservice.logoutuser()
  }

  changeDevAreas(e:any) {
    console.log(e.value)
    this.DevAreas.setValue(e.target.value, {
      onlySelf: true
    })
  }



}
