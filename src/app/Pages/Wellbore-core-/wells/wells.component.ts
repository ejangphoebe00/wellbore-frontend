import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { NgPopupsService } from 'ng-popups';


@Component({
  selector: 'app-wells',
  templateUrl: './wells.component.html',
  styleUrls: ['./wells.component.css']
})
export class WellsComponent implements OnInit {
  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  formGroup!: FormGroup;
  id: any;
  title!: string;
  deleteresp: any;
  status: boolean = true;
  editform: boolean = false;
  updatevalue: any;
  wells: any;

  users: any = [];
  role: any;
  userEmail: any;
  loggedin: any;


  wellboreIds: any;
  WBCoringContractor_id: any;
  CoreTopStratLitho_id: any;
  CoreBottomStratLitho_id: any;
  ReportFormat_id: any;
  ReportSecurityGrade : any;
  details: boolean = false;
  wellboreCores: any;
  CoreNames: any = ['Slab', '1/2 Slab', '1/3 Slab', '2/3 Slab', 'Biscuit Slab', 'Full Diameter', 'SideWall Core'];
  RptFormat:any = ['PDF','Excel'];
  Security:any = ['Restricted','Open', 'Confidential'];
  maxd: any;
  mindate: any;


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
    this.initForm()
    // this.authservice.reload();
    this.wellboresList()
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
        // {
        //   extend:'copy',
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

    this.getWelboreId();
    this.getWBCoringContractorId();
    this.getCoreTopStratLitho_id();
    this.getCoreBottomStratLitho_id();
    this.getReportFormat_id();
    this.getReportSecurityGrade ();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  wellboresList(): void {
    this.authservice
      .getwellboreCores()
      .subscribe((response: any) => {
        console.log(response)
        this.users = response;

        this.dtTrigger.next();
      });
  }

  logout() {
    this.authservice.logoutuser()
  }


  initForm() {
    this.formGroup = new FormGroup({
      WellborePAUID: new FormControl(),
      CoreNumber: new FormControl(),
      CoreTypeName: new FormControl(),
      CoringDate: new FormControl(),
      WBCoringContractor_id: new FormControl(),
      CoreTopMD: new FormControl(),
      CoreBtmMD: new FormControl(),
      CoreTopTVD: new FormControl(),
      CoreBtmTVD: new FormControl(),
      CutLength: new FormControl(),
      CutLengthTVD: new FormControl(),
      RecoveredLength: new FormControl(),
      PercentageCoreRecovery: new FormControl(),
      CoreRecovery: new FormControl(),
      CoreTopStratLitho_id: new FormControl(),
      CoreBottomStratLitho_id: new FormControl(),
      CorePictureSoftcopyPath: new FormControl(),
      CorePictureHyperlink: new FormControl(),
      PictureUploadDate: new FormControl(),
      CoreReportSoftcopyPath: new FormControl(),
      CoreReportHyperlink: new FormControl(),
      ReportUploadDate: new FormControl(),
      ReportFileFormat: new FormControl(),
      ReportFileSize: new FormControl(),
      ReportSecurityGrade : new FormControl(),
      ReportOpenDueDate: new FormControl(),
      ReportDocumentTitle: new FormControl(),
      ReportReceivedDate: new FormControl(),
      ReportDocumentDate: new FormControl(),
      ReportDocumentName: new FormControl(),
      // WellboreCoreName:new FormControl(),
      Comments: new FormControl()
    });
  }


  changeRoles(e: any) {
    console.log(e.value)
    this.CoreNames.setValue(e.target.value, {
      onlySelf: true
    })
  }

  onView(item: any) {
    this.details = true;
    this.id = item.CoreCatalog_id
    localStorage.setItem("update-id", this.id);
    this.captureWellsInstance();
    this.wells = {
      WellboreCore_id: item.WellboreCore_id,
      CoreType: item.CoreType,
      StoreIdentifier: item.StoreIdentifier,
      CatalogCoreFromDepth: item.CatalogCoreFromDepth,
      CatalogCoreToDepth: item.CatalogCoreToDepth,
      CoreCatalogSecurityFlag_id: item.CoreCatalogSecurityFlag_id,
      WasAnalysed_id: item.WasAnalysed_id,
      TopStratLitho_id: item.TopStratLitho_id,
      BottomStratLitho_id: item.BottomStratLitho_id,
      CatalogueCorePictureName: item.CatalogueCorePictureName,
      CataloguePictureSoftcopyPath: item.CataloguePictureSoftcopyPath,
      CataloguePictureHyperlink: item.CataloguePictureHyperlink,
      CatPictureUploadDate: item.CatPictureUploadDate,
      CatalogueReportSoftcopyPath: item.CatalogueReportSoftcopyPath,
      CatalogueReportHyperlink: item.CatalogueReportHyperlink,
      CatReportUploadDate: item.CatReportUploadDate,
      CatalogReportFormat_id: item.CatalogReportFormat_id,
      CatalogReportFileSize: item.CatalogReportFileSize,
      CatalogReportSecurityGrade_id: item.CatalogReportSecurityGrade_id,
      CoreCatalogName: item.CoreCatalogName,
      Comments: item.Comments,
    }
  }

  addWellboreCoreProcess() {
    console.log("tested")
    if (this.formGroup.valid) {
      console.log(this.formGroup.value)
      this.authservice.adddWellboreCore(this.formGroup.value).subscribe(result => {

        if (result.message == "Welbore Core added successfuly.") {
          this.toastr.success("Welbore Core added successfuly.", "", {
            timeOut: 2000,
            positionClass: 'toast-top-center',
            progressBar: true,
            progressAnimation: 'increasing'
          })
          this.formGroup.reset();

        } else {
          // this.authservice.CompanyFaliure()
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

  get f() { return this.formGroup.controls }

  getReportSecurityGrade () {
    this.authservice.getCoreReportSecurity().subscribe(res => {
      this.ReportSecurityGrade  = res;
      console.log(this.ReportSecurityGrade );
    })
  }

  getReportFormat_id() {
    this.authservice.getFormat().subscribe(res => {
      this.ReportFormat_id = res;
      console.log(this.ReportFormat_id);
    })
  }

  getCoreBottomStratLitho_id() {
    this.authservice.getStrat().subscribe(res => {
      this.CoreBottomStratLitho_id = res;
      console.log(this.CoreBottomStratLitho_id);
    })
  }


  getCoreTopStratLitho_id() {
    this.authservice.getAllStratLithoUnits().subscribe(res => {
      this.CoreTopStratLitho_id = res;
      console.log(this.CoreTopStratLitho_id);
    })
  }

  getWBCoringContractorId() {
    this.authservice.getCompanies().subscribe(res => {
      this.WBCoringContractor_id = res;
      console.log(this.WBCoringContractor_id);
    })
  }

  getWelboreId() {
    this.authservice.getWelboreIds().subscribe(res => {
      this.wellboreIds = res;
      console.log(this.wellboreIds);
    })
  }

  changeReportSecurityGrade (e: any) {
    console.log(e.value)
    this.ReportSecurityGrade .setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeReportFormat_id(e: any) {
    console.log(e.value)
    this.ReportFormat_id.setValue(e.target.value, {
      onlySelf: true
    })


  }

  changeCoreBottomStratLitho(e: any) {
    console.log(e.value)
    this.CoreBottomStratLitho_id.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeCoreTopStratLitho(e: any) {
    console.log(e.value)
    this.CoreTopStratLitho_id.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeContractingId(e: any) {
    console.log(e.value)
    this.WBCoringContractor_id.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeWellboreId(e: any) {
    console.log(e.value)
    this.wellboreIds.setValue(e.target.value, {
      onlySelf: true
    })
  }


     changeFormat(e:any) {
    console.log(e.value)
    this.RptFormat.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeSecurity(e:any) {
    console.log(e.value)
    this.Security.setValue(e.target.value, {
      onlySelf: true
    })
  }

  onSelect(selectedItem: any) {
    this.id = selectedItem.WellboreCore_id

    this.ngPopups.confirm("Are you sure you want to delete ?", {
      // theme: 'material',
      color: 'OrangeRed',
      okButtonText: 'Yes',
      cancelButtonText: 'No',
      title: "Confirm",
    })
      .subscribe(res => {
        if (res) {
          console.log("Selected item Id: ", selectedItem.WellboreCore_id);
          this.http.delete('http://127.0.0.1:8899/apiv1/delete_core/' + this.id)
            .subscribe(response => {
              this.deleteresp = response;
              console.log(this.deleteresp.message)
              if (this.deleteresp.message == "Welbore Core successfully deleted.") {
                this.toastr.success("Welbore Core successfully deleted.", "", {
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
    this.id = item.WellboreCore_id
    localStorage.setItem("update-id", this.id);
    console.log("Selected item Id: ", item.WellboreCore_id);
    this.captureWellsInstance();
    this.wellboreCores = {
      WellborePAUID: item.WellborePAUID,
      CoreNumber: item.CoreNumber,
      CoringDate: item.CoringDate,
      WBCoringContractor_id: item.WBCoringContractor_id,
      CoreTopMDRT: item.CoreTopMDRT,
      CoreBtmMDRT: item.CoreBtmMDRT,
      CoreTopTVD: item.CoreTopTVD,
      CoreBtmTVD: item.CoreBtmTVD,
      CutLength: item.CutLength,
      CutLengthTVD: item.CutLengthTVD,
      RecoveredLength: item.RecoveredLength,
      PercentageCoreRecovery: item.PercentageCoreRecovery,
      CoreTopStratLitho_id: item.CoreTopStratLitho_id,
      CoreBottomStratLitho_id: item.CoreBottomStratLitho_id,
      CorePictureSoftcopyPath: item.CorePictureSoftcopyPath,
      CorePictureHyperlink: item.CorePictureHyperlink,
      PictureUploadDate: item.PictureUploadDate,
      CoreReportSoftcopyPath: item.CoreReportSoftcopyPath,
      CoreReportHyperlink: item.CoreReportHyperlink,
      ReportUploadDate: item.ReportUploadDate,
      ReportFileFormat: item.ReportFileFormat,
      ReportFileSize: item.ReportFileSize,
      ReportSecurityGrade : item.ReportSecurityGrade ,
      ReportOpenDueDate: item.ReportOpenDueDate,
      ReportDocumentTitle: item.ReportDocumentTitle,
      ReportReceivedDate: item.ReportReceived,
      ReportDocumentDate: item.ReportDocumentDate,
      ReportDocumentName: item.ReportDocumentName,
      CoreTypeName: item.CoreTypeName,
      Comments: item.Comments

    }
  }
  captureWellsInstance() {
    this.http.get('http://127.0.0.1:8899/apiv1/get_core/' + this.id)
      .subscribe(response => {
        this.updatevalue = response;
        console.log("grab update value")
        console.log(this.updatevalue)
        this.formGroup.patchValue({

          WellborePAUID: this.authservice.stripFormValue(this.updatevalue.WellborePAUID),
          CoreNumber: this.authservice.stripFormValue(this.updatevalue.CoreNumber),
          CoringDate: this.authservice.stripFormValue(this.updatevalue.CoringDate),
          WBCoringContractor_id: this.authservice.stripFormValue(this.updatevalue.WBCoringContractor_id),
          CoreTopMDRT: this.authservice.stripFormValue(this.updatevalue.CoreTopMDRT),
          CoreBtmMDRT: this.authservice.stripFormValue(this.updatevalue.CoreBtmMDRT),
          CoreTopTVD: this.authservice.stripFormValue(this.updatevalue.CoreTopTVD),
          CoreBtmTVD: this.authservice.stripFormValue(this.updatevalue.CoreBtmTVD),
          CutLength: this.authservice.stripFormValue(this.updatevalue.CutLength),
          CutLengthTVD: this.authservice.stripFormValue(this.updatevalue.CutLengthTVD),
          RecoveredLength: this.authservice.stripFormValue(this.updatevalue.RecoveredLength),
          PercentageCoreRecovery: this.authservice.stripFormValue(this.updatevalue.PercentageCoreRecovery),
          CoreTopStratLitho_id: this.authservice.stripFormValue(this.updatevalue.CoreTopStratLitho_id),
          CoreBottomStratLitho_id: this.authservice.stripFormValue(this.updatevalue.CoreBottomStratLitho_id),
          CorePictureSoftcopyPath: this.authservice.stripFormValue(this.updatevalue.CorePictureSoftcopyPath),
          CorePictureHyperlink: this.authservice.stripFormValue(this.updatevalue.CorePictureHyperlink),
          PictureUploadDate: this.authservice.stripFormValue(this.updatevalue.PictureUploadDate),
          CoreReportSoftcopyPath: this.authservice.stripFormValue(this.updatevalue.CoreReportSoftcopyPath),
          CoreReportHyperlink: this.authservice.stripFormValue(this.updatevalue.CoreReportHyperlink),
          ReportUploadDate: this.authservice.stripFormValue(this.updatevalue.ReportUploadDate),
          ReportFileFormat: this.authservice.stripFormValue(this.updatevalue.ReportFileFormat),
          ReportFileSize: this.authservice.stripFormValue(this.updatevalue.ReportFileSize),
          ReportSecurityGrade : this.authservice.stripFormValue(this.updatevalue.ReportSecurityGrade ),
          ReportOpenDueDate: this.authservice.stripFormValue(this.updatevalue.ReportOpenDueDate),
          ReportDocumentTitle: this.authservice.stripFormValue(this.updatevalue.ReportDocumentTitle),
          ReportReceivedDate: this.authservice.stripFormValue(this.updatevalue.ReportReceivedDate),
          ReportDocumentDate: this.authservice.stripFormValue(this.updatevalue.ReportDocumentDate),
          ReportDocumentName: this.authservice.stripFormValue(this.updatevalue.ReportDocumentName),
          CoreTypeName: this.authservice.stripFormValue(this.updatevalue.CoreTypeName),
          Comments: this.authservice.stripFormValue(this.updatevalue.Comments)
        });
        console.log(this.updatevalue)
      });
  }

  navigateBack() {
    this.authservice.reload();
  }

  updateWellboreCoreProcess() {
    console.log("tested")
    if (this.formGroup.valid) {
      console.log(this.formGroup.value)
      this.authservice.updateWellboreCore(this.formGroup.value).subscribe(result => {
        console.log(result)

        if (result.message == "Welbore Core updated successfuly.") {
          this.toastr.success("Welbore Core updated successfuly.", "", {
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
          this.authservice.securityStatusUpdate()
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


}
