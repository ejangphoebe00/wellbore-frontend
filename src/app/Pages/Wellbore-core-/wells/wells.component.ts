import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient ,HttpEvent, HttpResponse} from '@angular/common/http';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { NgPopupsService } from 'ng-popups';
import { Gallery } from 'angular-gallery';


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
  WBCoringContractorId: any;
  CoreTopStratLithoId: any;
  CoreBottomStratLithoId: any;
  ReportFileFormatId: any;
  ReportSecurityGrade : any;
  details: boolean = false;
  wellboreCores: any;
  CoreNames:any = ['Slab','1/2 Slab','1/3 Slab','2/3 Slab','Biscuit Slab','Full Diameter','SideWall Core'];
  RptFormat:any = ['PDF','EXCEL'];
  Security:any = ['Restricted','Open', 'Confidential'];
  maxd: any;
  mindate: any;
  checkstaff: boolean = false;
  msg: any;
  uploadFile: boolean = false;
  viewImages: boolean = false;
  viewFiles: boolean = false;
  imgObject: Array<object> = [];




  shortLink: string = "";
  loading: boolean = false; // Flag variable
  gal:boolean = false;
  file: any;
  fileresponse: any;
  ims: any = [];
  cutImg: any = [];
  filenames: any = [];


  selectedFiles: any;
  selectedFilesSecond: any;
  currentFile: any;
  currentFile2: any;

  // fileName = '';
  // uploadProgress:number = 0;
  // uploadSub: Subscription = any;



  afuConfig = {
    uploadAPI: {
      url: "http://127.0.0.1:8899/apiv1/add_file/7"
    }
  };



  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private ngPopups: NgPopupsService,
    private gallery: Gallery

  ) { }

  ngOnInit(): void {


    if(this.authservice.getRole()=="Data Admin"){
      this.checkstaff=true;
    }else{
    this.checkstaff=false;
    }
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
    this.getCoreTopStratLithoId();
    this.getCoreBottomStratLithoId();
 //   this.getReportFormatId();
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


  initForm(){
    this.formGroup = new FormGroup({
      WellborePAUID:new FormControl(),
      CoreNumber:new FormControl(),
      CoreTypeName:new FormControl(),
      CoringDate:new FormControl(),
      WBCoringContractorId:new FormControl(),
      CoreTopMD:new FormControl(),
      CoreBtmMD:new FormControl(),
      CoreTopTVD:new FormControl(),
      CoreBtmTVD:new FormControl(),
      CutLength:new FormControl(),
      CutLengthTVD:new FormControl(),
      RecoveredLength:new FormControl(),
      PercentageCoreRecovery: new FormControl(),
      CoreRecovery:new FormControl(),
      CoreTopStratLithoId:new FormControl(),
      CoreBottomStratLithoId:new FormControl(),
      CorePictureSoftcopyPath:new FormControl(),
      CorePictureHyperlink:new FormControl(),
      PictureUploadDate:new FormControl(),
      CoreReportSoftcopyPath:new FormControl(),
      CoreReportHyperlink:new FormControl(),
      ReportUploadDate:new FormControl(),
      ReportFileFormat:new FormControl(),
      ReportFileSize:new FormControl(),
      ReportSecurityGrade:new FormControl(),
      ReportOpenDueDate:new FormControl(),
      ReportDocumentTitle:new FormControl(),
      ReportReceivedDate:new FormControl(),
      ReportDocumentDate:new FormControl(),
      ReportDocumentName:new FormControl(),
      WelboreCoreName:new FormControl(),
      Comments:new FormControl(),
      StoreIdentifier: new FormControl(),
      AnalysisReportDetails: new FormControl(),
      CoreAnalysisReports: new FormControl(),
      CorePhotograph: new FormControl(),
      fileSource: new FormControl()
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
    this.id = item.CoreCatalogId
    localStorage.setItem("update-id", this.id);
    this.captureWellsInstance();
    this.wells = {
      WellboreCoreId: item.WellboreCoreId,
      CoreType: item.CoreType,
      StoreIdentifier: item.StoreIdentifier,
      CatalogCoreFromDepth: item.CatalogCoreFromDepth,
      CatalogCoreToDepth: item.CatalogCoreToDepth,
      CoreCatalogSecurityFlagId: item.CoreCatalogSecurityFlagId,
      WasAnalysedId: item.WasAnalysedId,
      TopStratLithoId: item.TopStratLithoId,
      BottomStratLithoId: item.BottomStratLithoId,
      CatalogueCorePictureName: item.CatalogueCorePictureName,
      CataloguePictureSoftcopyPath: item.CataloguePictureSoftcopyPath,
      CataloguePictureHyperlink: item.CataloguePictureHyperlink,
      CatPictureUploadDate: item.CatPictureUploadDate,
      CatalogueReportSoftcopyPath: item.CatalogueReportSoftcopyPath,
      CatalogueReportHyperlink: item.CatalogueReportHyperlink,
      CatReportUploadDate: item.CatReportUploadDate,
      CatalogReportFormatId: item.CatalogReportFormatId,
      CatalogReportFileSize: item.CatalogReportFileSize,
      CatalogReportSecurityGradeId: item.CatalogReportSecurityGradeId,
      CoreCatalogName: item.CoreCatalogName,
      WelboreCoreName: item.WelboreCoreName,
      Comments: item.Comments,
      AnalysisReportDetails: item.AnalysisReportDetails
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

  // get f() { return this.formGroup.controls }

  getReportSecurityGrade () {
    this.authservice.getCoreReportSecurity().subscribe(res => {
      this.ReportSecurityGrade  = res;
      console.log(this.ReportSecurityGrade );
    })
  }

  // getReportFormatId() {
  //   this.authservice.getFormat().subscribe(res => {
  //     this.ReportFormatId = res;
  //     console.log(this.ReportFormatId);
  //   })
  // }

  getCoreBottomStratLithoId() {
    this.authservice.getStrat().subscribe(res => {
      this.CoreBottomStratLithoId = res;
      console.log(this.CoreBottomStratLithoId);
    })
  }


  getCoreTopStratLithoId() {
    this.authservice.getAllStratLithoUnits().subscribe(res => {
      this.CoreTopStratLithoId = res;
      console.log(this.CoreTopStratLithoId);
    })
  }

  getWBCoringContractorId() {
    this.authservice.getCompanies().subscribe(res => {
      this.WBCoringContractorId = res;
      console.log(this.WBCoringContractorId);
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

  // changeReportFormatId(e: any) {
  //   console.log(e.value)
  //   this.ReportFormatId.setValue(e.target.value, {
  //     onlySelf: true
  //   })


  // }

  changeCoreBottomStratLitho(e: any) {
    console.log(e.value)
    this.CoreBottomStratLithoId.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeCoreTopStratLitho(e: any) {
    console.log(e.value)
    this.CoreTopStratLithoId.setValue(e.target.value, {
      onlySelf: true
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
    this.id = selectedItem.WellboreCoreId

    this.ngPopups.confirm("Are you sure you want to delete ?", {
      // theme: 'material',
      color: 'OrangeRed',
      okButtonText: 'Yes',
      cancelButtonText: 'No',
      title: "Confirm",
    })
      .subscribe(res => {
        if (res) {
          console.log("Selected item Id: ", selectedItem.WellboreCoreId);
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
    this.id = item.WellboreCoreId
    localStorage.setItem("update-id", this.id);
    console.log("Selected item Id: ", item.WellboreCoreId);
    this.captureWellsInstance();
    this.wellboreCores = {
      WellborePAUID: item.WellborePAUID,
      CoreNumber: item.CoreNumber,
      CoringDate: item.CoringDate,
      WBCoringContractorId: item.WBCoringContractorId,
      CoreTopMD: item.CoreTopMD,
      CoreBtmMD: item.CoreBtmMD,
      CoreTopTVD: item.CoreTopTVD,
      CoreBtmTVD: item.CoreBtmTVD,
      CutLength: item.CutLength,
      CutLengthTVD: item.CutLengthTVD,
      RecoveredLength: item.RecoveredLength,
      PercentageCoreRecovery: item.PercentageCoreRecovery,
      CoreTopStratLithoId: item.CoreTopStratLithoId,
      CoreBottomStratLithoId: item.CoreBottomStratLithoId,
      CorePictureSoftcopyPath: item.CorePictureSoftcopyPath,
      CorePictureHyperlink: item.CorePictureHyperlink,
      PictureUploadDate: item.PictureUploadDate,
      CoreReportSoftcopyPath: item.CoreReportSoftcopyPath,
      CoreReportHyperlink: item.CoreReportHyperlink,
      ReportUploadDate: item.ReportUploadDate,
      ReportFileFormat: item.ReportFileFormat,
      ReportFileSize: item.ReportFileSize,
      ReportSecurityGrade : (item.ReportSecurityGrade).replace('SecurityGradeEnum.', '') ,
      ReportOpenDueDate: item.ReportOpenDueDate,
      ReportDocumentTitle: item.ReportDocumentTitle,
      ReportReceivedDate: item.ReportReceivedDate,
      ReportDocumentDate: item.ReportDocumentDate,
      ReportDocumentName: item.ReportDocumentName,
      CoreTypeName: (item.CoreTypeName).replace('CoreTypeEnum.', ''),
      Comments: item.Comments,
      StoreIdentifier: item.StoreIdentifier,
      AnalysisReportDetails:item.AnalysisReportDetails

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
          WBCoringContractorId: this.authservice.stripFormValue(this.updatevalue.WBCoringContractorId),
          CoreTopMD: this.authservice.stripFormValue(this.updatevalue.CoreTopMD),
          CoreBtmMD: this.authservice.stripFormValue(this.updatevalue.CoreBtmMD),
          CoreTopTVD: this.authservice.stripFormValue(this.updatevalue.CoreTopTVD),
          CoreBtmTVD: this.authservice.stripFormValue(this.updatevalue.CoreBtmTVD),
          CutLength: this.authservice.stripFormValue(this.updatevalue.CutLength),
          CutLengthTVD: this.authservice.stripFormValue(this.updatevalue.CutLengthTVD),
          RecoveredLength: this.authservice.stripFormValue(this.updatevalue.RecoveredLength),
          PercentageCoreRecovery: this.authservice.stripFormValue(this.updatevalue.PercentageCoreRecovery),
          CoreTopStratLithoId: this.authservice.stripFormValue(this.updatevalue.CoreTopStratLithoId),
          CoreBottomStratLithoId: this.authservice.stripFormValue(this.updatevalue.CoreBottomStratLithoId),
          CorePictureSoftcopyPath: this.authservice.stripFormValue(this.updatevalue.CorePictureSoftcopyPath),
          CorePictureHyperlink: this.authservice.stripFormValue(this.updatevalue.CorePictureHyperlink),
          PictureUploadDate: this.authservice.stripFormValue(this.updatevalue.PictureUploadDate),
          CoreReportSoftcopyPath: this.authservice.stripFormValue(this.updatevalue.CoreReportSoftcopyPath),
          CoreReportHyperlink: this.authservice.stripFormValue(this.updatevalue.CoreReportHyperlink),
          ReportUploadDate: this.authservice.stripFormValue(this.updatevalue.ReportUploadDate),
          ReportFileFormat: this.authservice.stripFormValue(this.updatevalue.ReportFileFormat),
          ReportFileSize: this.authservice.stripFormValue(this.updatevalue.ReportFileSize),
          ReportSecurityGrade : this.authservice.stripFormValue((this.updatevalue.ReportSecurityGrade).replace('SecurityGradeEnum.', '')),
          ReportOpenDueDate: this.authservice.stripFormValue(this.updatevalue.ReportOpenDueDate),
          ReportDocumentTitle: this.authservice.stripFormValue(this.updatevalue.ReportDocumentTitle),
          ReportReceivedDate: this.authservice.stripFormValue(this.updatevalue.ReportReceivedDate),
          ReportDocumentDate: this.authservice.stripFormValue(this.updatevalue.ReportDocumentDate),
          ReportDocumentName: this.authservice.stripFormValue(this.updatevalue.ReportDocumentName),
          CoreTypeName: this.authservice.stripFormValue((this.updatevalue.CoreTypeName).replace('CoreTypeEnum.', '')),
         Comments: this.authservice.stripFormValue(this.updatevalue.Comments),
         WelboreCoreName: this.authservice.stripFormValue(this.updatevalue.WelboreCoreName),
         AnalysisReportDetails: this.authservice.stripFormValue(this.updatevalue.AnalysisReportDetails)
        });
        console.log(this.updatevalue)
        console.log('add update check'+ (this.updatevalue.CoreTypeName).replace('CoreTypeEnum.', ''))
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


  onChange(event: any) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.authservice.upload(this.file).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {

          // Short link via api response
          this.shortLink = event.link;

          this.loading = false; // Flag variable 
        }
      }
    );
  }

  get f() {
    return this.formGroup.controls;
  }

  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formGroup.patchValue({
        fileSource: file
      });
    }
  }

  submit() {
    const formData = new FormData();
    formData.append('file', this.formGroup.get('fileSource')!.value);
    console.log(this.formGroup.get('fileSource')!.value)

    this.http.post('http://127.0.0.1:8899/apiv1/add_file/1', formData)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }

  upload() {
    this.currentFile = this.selectedFiles.item(0);
    this.currentFile2 = this.selectedFilesSecond.item(0);

    console.log(this.currentFile)
    this.authservice.uploadFile(this.currentFile, this.currentFile2).subscribe(response => {
      this.fileresponse = response;
      console.log(this.fileresponse.message)

      this.selectedFiles.value = '';
      if (response instanceof HttpResponse) {
        this.msg = response.body;
        console.log(response.body);
        this.toastr.success("File Uploaded successfully.", "", {
          timeOut: 2000,
          positionClass: 'toast-top-center',
          progressBar: true,
          progressAnimation: 'increasing'
        })
        this.formGroup.reset();
      }
    });
  }


  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  selectFileAgain(event: any) {
    this.selectedFilesSecond = event.target.files;
  }

  onFile() {
    console.log("Clicked")
    this.status = false;
    this.details = false;
    this.uploadFile = true;
  }

  onSelectImages(selectedItem: any) {
    console.log("hide the elements");
    this.status = false;
    this.details = false;
    this.viewImages = true;
    this.getImages();

  }

  showGallery(index: number) {
    this.authservice
      .getCores()
      .subscribe((response: any) => {
        this.users = response


        for (var product of response) {
          console.log('firat test: ' + product.CorePhotographs)
          this.ims = product.CorePhotographs
          console.log('images  array:' + this.ims.length)
          for (var image of this.ims) {
            console.log(' Testing each image:' + image.replace('backend', 'http://127.0.0.1:8899'))
          }

          let prop = {

            images: [
              { path: image.replace('backend', 'http://127.0.0.1:8899') }
            ],
            index
          };
          this.gallery.load(prop);
        }
      });

  }


  getFiles() {
    this.authservice
      .getCores()
      .subscribe((response: any) => {
        this.users = response
        console.log('all Imagess tested')


        for (var product of response) {
          console.log('firat test: ' + product.CoreAnalysisReports)
          this.ims = product.CoreAnalysisReports
          console.log('images  array:' + this.ims.length)
          for (var image of this.ims) {
            console.log(' Testing each image:' + image.replace('backend', 'http://127.0.0.1:8899'))
            console.log(' Testing Index of  image:' + this.ims.indexOf(image));

            if (image != 'null') {
              this.cutImg.push({
                'link': image.replace('backend', 'http://127.0.0.1:8899'),
                'fileId': this.ims.indexOf(image) + 1,
                'name': image.replace('backend/static/files/', '')
              });

             
            }

          }


           for (var show of this.ims) {
            console.log(' Testing new gallery:' + show.replace('backend', 'http://127.0.0.1:8899'))
           
            if (show != 'null') {             

              this.imgObject.push({
                image: show.replace('backend', 'http://127.0.0.1:8899'),
                thumbImage:show.replace('backend', 'http://127.0.0.1:8899'),
                title: show.replace('backend/static/files/', ''),
                alt: show.replace('backend/static/files/', ''),
              });
            }

          }
        }
      });

  }

  getImages() {
    this.authservice
      .getCores()
      .subscribe((response: any) => {
        this.users = response
        console.log('all Imagess tested')


        for (var product of response) {
          console.log('firat test: ' + product.CorePhotographs)
          this.ims = product.CorePhotographs
          console.log('images  array:' + this.ims.length)
          for (var image of this.ims) {
            console.log(' Testing each image:' + image.replace('backend', 'http://127.0.0.1:8899'))
            this.cutImg.push({
              'link': image.replace('backend', 'http://127.0.0.1:8899'),
              'name': image.replace('backend/static/files/', '')
            });

            this.imgObject.push({
              image:  image.replace('backend', 'http://127.0.0.1:8899'),
              thumbImage:image.replace('backend', 'http://127.0.0.1:8899'),
              title: image.replace('backend/static/files/', ''),
              alt: image.replace('backend/static/files/', ''),
            });

          }
        }
      });

  }

  onDeleteFile(selectedItem: any) {
    console.log('you clicked on element no: ' + selectedItem.fileId);



    this.id = selectedItem.fileId;

    this.ngPopups.confirm("Are you sure you want to delete this file?", {
      // theme: 'material',
      color: 'OrangeRed',
      okButtonText: 'Yes',
      cancelButtonText: 'No',
      title: "Confirm",
    })
      .subscribe(res => {
        if (res) {
          console.log("Selected item Id: ", selectedItem.Core_sampleId);
          this.http.delete('http://127.0.0.1:8899/apiv1/delete_file/' + this.id)
            .subscribe(response => {
              this.deleteresp = response;
              console.log(this.deleteresp.message)
              if (this.deleteresp.message == "File successfully deleted.") {
                this.toastr.success("File successfully deleted.", "", {
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


  onSelectFiles(selectedItem: any) {
    console.log("hide the elements");
    this.status = false;
    this.details = false;
    this.viewFiles = true;
    this.getFiles();

  }

  onSelectGallery(selectedItem:any) {
    this.status = false;
    this.details = false;
    this.viewFiles = false;
    this.gal = true;
    this.getImages();
    
  } 


}
