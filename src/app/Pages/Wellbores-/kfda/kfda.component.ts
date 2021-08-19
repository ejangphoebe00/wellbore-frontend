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
  formGroup!: FormGroup;
  title!: string;
  prospectIds: any;
  licenceIds: any
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

  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private ngPopups: NgPopupsService
  ) { }

  ngOnInit(): void {
    // this.authservice.reload();
    this.initForm();
    this.userList()
    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    if (this.authservice.getRole() == "Admin") {
      this.role = true;
    } else {
      this.role = false;
    }
    this.dtOptions = {
      dom: 'Bfrtip',
      // dom:'Btp',
      buttons: [
        // 'columnsToggle',
        // 'colvis',
        {
          extend: 'copy',
          tag: 'button',
          className: "btn blue btn-outline"
        },
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
    this.editform = true;
    this.id = selectedItem.Wellbore_id
    localStorage.setItem("update-id", this.id);
    console.log("Selected item Id: ", selectedItem.Wellbore_id);
    this.http.get('http://127.0.0.1:8899/apiv1/get_wellbore/' + this.id)
      .subscribe(response => {
        this.updatevalue = response;
        this.formGroup.patchValue({

          PAUID:this.updatevalue.PAUID,
          WellboreOfficialName:this.updatevalue.WellboreOfficialName,
          WellboreLocalName:this.updatevalue.WellboreLocalName,
          WellboreAliasName:this.updatevalue.WellboreAliasName,
          WellboreSpudDate:this.updatevalue.WellboreSpudDate,
          WellboreType_id:this.updatevalue.WellboreType_id,
          InitialWellborePurpose_id:this.updatevalue.InitialWellborePurpose_id,
          WellborePurpose_id:this.updatevalue.WellborePurpose_id,
          PurposeChangeDate:this.updatevalue.PurposeChangeDate,
          Well_id:this.updatevalue.Well_id,
          Prospect_id:this.updatevalue.Prospect_id,
          Discovery_id:this.updatevalue.Discovery_id,
          WellboreContent_id:this.updatevalue.WellboreContent_id,
          WellboreStatus_id:this.updatevalue.WellboreStatus_id,
          WellboreResponsibleLicence_id:this.updatevalue.WellboreResponsibleLicence_id,
          LicenseOperatorCompany_id:this.updatevalue.LicenseOperatorCompany_id,
          DrillingContractorCompany_id:this.updatevalue.DrillingContractorCompany_id,
          WellBoreRigName:this.updatevalue.WellBoreRigName,
          Basin_id:this.updatevalue.Basin_id,
          FormerExplAreaName:this.updatevalue.FormerExplAreaName,
          SeismicLine:this.updatevalue.SeismicLine,
          RotaryTableElavation:this.updatevalue.RotaryTableElavation,
          GroundLevelElavation:this.updatevalue.GroundLevelElavation,
          TD_MD:this.updatevalue.TD_MD,
          TD_TVD:this.updatevalue.TD_TVD,
          TD_Date:this.updatevalue.TD_Date,
          CoreContractor_id:this.updatevalue.CoreContractor_id,
          RCI_Taken_id:this.updatevalue.RCI_Taken_id,
          MDT_Done_id:this.updatevalue.MDT_Done_id,
          FET_Done_id:this.updatevalue.FET_Done_id,
          WFTContractor:this.updatevalue.WFTContractor,
          DST_Done_id:this.updatevalue.DST_Done_id,
          ManifoldFlowTested_id:this.updatevalue.ManifoldFlowTested_id,
          DST_Contractor_id:this.updatevalue.DST_Contractor_id,
          HasPetrophysicalLogs_id:this.updatevalue.HasPetrophysicalLogs_id,
          PetrophysicalContractor_id:this.updatevalue.PetrophysicalContractor_id,
          TopBasementMD:this.updatevalue.TopBasementMD,
          TopBasementTVD:this.updatevalue.TopBasementTVD,
          WellboreTestStatus:this.updatevalue.WellboreTestStatus,
          PlannedWellboreCost:this.updatevalue.PlannedWellboreCost,
          ActualWellboreCost:this.updatevalue.ActualWellboreCost,
          WellboreTestCost:this.updatevalue.WellboreTestCost,
          CompletionDate:this.updatevalue.CompletionDate,
          What3WordWellboreLocation:this.updatevalue.What3WordWellboreLocation,
          Comments:this.updatevalue.Comments,
          LocationPictureName:this.updatevalue.LocationPictureName,
          LocationPicture:this.updatevalue.LocationPicture,
          LocationPictureSoftcopyPath:this.updatevalue.LocationPictureSoftcopyPath,
          LocationPictureHyperlink:this.updatevalue.LocationPictureHyperlink,
          WellboreMapSoftcopyPath:this.updatevalue.WellboreMapSoftcopyPath,
          WellboreMapHyperlink:this.updatevalue.WellboreMapHyperlink,
          MapPortalWellboreMapLink:this.updatevalue.MapPortalWellboreMapLink,
          WellboreFactsiteUrl:this.updatevalue.WellboreFactsiteUrl


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
       
        if(result.message == "Wellbore added successfuly."){
          this.toastr.success("Wellbore added successfuly.","",{
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



}