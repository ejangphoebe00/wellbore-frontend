import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { NgPopupsService } from 'ng-popups';
// import {MatDialog} from '@angular/material/dialog'


import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
// import { ModalManager } from 'ngb-modal'

@Component({
  selector: 'app-core-catalogs',
  templateUrl: './core-catalogs.component.html',
  styleUrls: ['./core-catalogs.component.css']
})
export class CoreCatalogsComponent implements OnInit {
  formGroup!: FormGroup;
  title!: string;
  role:any;
  userEmail: any;
  loggedin:any;
  id: any;
  deleteresp: any;
  status: boolean = true;
  editform: boolean = false;
  details:boolean= false;
  updatevalue: any;
  catalogs:any;

  wellboreCoreIds: any;
  CoreTypeIds: any;
  TopStratLithoId: any;
  CatalogSecurityFlagIds: any;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();


  users: any = [];
  dialog: any;
  checkstaff: boolean = false;


    constructor(
      private authservice: ApiPipeService,
      private router: Router,
      private toastr: ToastrService,
      private http: HttpClient,
      private ngPopups: NgPopupsService,

    ) { }

    ngOnInit(): void {
      if(this.authservice.getRole()=="Data Admin"){
        this.checkstaff=true;
      }else{
      this.checkstaff=false;
      }
      this.initForm();
      this.getCoreReportSecurityGradeId()
      this.getCoreType();
      this.getWelboreCoreId();
      this.getTopStratLithoId();
      this. coreCatalogList();
      this.userEmail = this.authservice.getEmail();
      this.loggedin = this.authservice.getRole();
      // if(this.authservice.getRole()=="Admin"){
      //   this.role=true;
      // }else{
      // this.role= false;
      // }

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

    coreCatalogList(): void {
      this.authservice
          .getCatalogList()
          .subscribe((response: any) => {
            console.log(response)
            this.users = response;

            this.dtTrigger.next();
          });
        }


    initForm(){
      this.formGroup = new FormGroup({
        WellboreCoreId:new FormControl(),
        // CoreType:new FormControl(),
        StoreIdentifier:new FormControl(),
        CatalogCoreFromDepth:new FormControl(),
        CatalogCoreToDepth: new FormControl(),
        // CoreCatalogSecurityFlagId:new FormControl(),
        WasAnalysedId:new FormControl(),
        TopStratLithoId:new FormControl(),
        BottomStratLithoId:new FormControl(),
        CatalogueCorePictureName: new FormControl(),
        CataloguePictureSoftcopyPath:new FormControl(),
        CataloguePictureHyperlink:new FormControl(),
        CatPictureUploadDate:new FormControl(),
        CatalogueReportSoftcopyPath:new FormControl(),
        CatalogueReportHyperlink:new FormControl(),
        CatReportUploadDate:new FormControl(),
        // CatalogReportFormatId:new FormControl(),
        CatalogReportFileSize: new FormControl(),
        // CatalogReportSecurityGradeId:new FormControl(),
        CoreCatalogName:new FormControl(),
        Comments:new FormControl()

      });
    }



    logout(){
      this.authservice.logoutuser()

    }


    updateCoreCatProcess(){
      console.log("tested")
      if(this.formGroup.valid){
        console.log(this.formGroup.value)
        this.authservice.updateCoreCatalog(this.formGroup.value).subscribe(result =>{

          if(result.message == "Core Catalog updated successfuly."){
            this.toastr.success("Core Catalog updated successfuly.","",{
              timeOut: 2000,
              positionClass: 'toast-top-center',
              progressBar: true,
              progressAnimation:'increasing'
            })
            this.formGroup.reset();

          } else{
           // this.authservice.CompanyFaliure()
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

    getCoreType(){
      this.authservice.getAllCoreTypes().subscribe(res =>{
        this.CoreTypeIds = res;
        console.log(this.CoreTypeIds);
      })
    }

    changeCoreTypes(e:any) {
      console.log(e.value)
      this.CoreTypeIds.setValue(e.target.value, {
        onlySelf: true
      })
    }

    getWelboreCoreId(){
      this.authservice.getwellboreCores().subscribe(res =>{
        this.wellboreCoreIds = res;
        console.log(this.wellboreCoreIds);
      })
    }


    changeWellboreCoreId(m:any) {
      console.log(m.value)
      this.wellboreCoreIds.setValue(m.target.value, {
        onlySelf: true
      })
    }

    getCoreReportSecurityGradeId(){
      this.authservice.getAllCatalogSecurityFlags().subscribe(res =>{
        this.CatalogSecurityFlagIds = res;
        console.log(this.CatalogSecurityFlagIds);
      })
    }



    changeCoreReportSecurityGradeId(e:any) {
      console.log(e.value)
      this.CatalogSecurityFlagIds.setValue(e.target.value, {
        onlySelf: true
      })
    }

    getTopStratLithoId(){
      this.authservice.getStrat().subscribe(res =>{
        this.TopStratLithoId = res;
        console.log(this.TopStratLithoId);
      })
     }

     changeTopStratLithoId(e:any) {
      console.log(e.value)
      this.TopStratLithoId.setValue(e.target.value, {
        onlySelf: true
      })
    }

    onSelect(selectedItem: any) {
      this.id = selectedItem.CoreCatalogId;

      this.ngPopups.confirm("Are you sure you want to delete ?",{
        // theme: 'material',
        color:'OrangeRed',
        okButtonText: 'Yes',
        cancelButtonText:'No',
        title: "Confirm",
      })
      .subscribe(res => {
        if (res) {
        console.log("Selected item Id: ", selectedItem.CoreCatalogId);
        this.http.delete('http://127.0.0.1:8899/apiv1/delete_core_catalog/' + this.id)
          .subscribe(response => {
            this.deleteresp = response;
            console.log(this.deleteresp.message)
            if (this.deleteresp.message == "Core Catalog successfully deleted.") {
              this.toastr.success("Core Catalog successfully deleted.", "", {
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

    onView(item: any) {
      this.details = true;
      this.id = item.CoreCatalogId
      localStorage.setItem("update-id", this.id);
      this.captureCoreInstance();
      this.catalogs = {
        WellboreCoreId:item.WellboreCoreId,
        // CoreType:item.CoreType,
        StoreIdentifier:item.StoreIdentifier,
        CatalogCoreFromDepth:item.CatalogCoreFromDepth,
        CatalogCoreToDepth:item.CatalogCoreToDepth,
        // CoreCatalogSecurityFlagId:item.CoreCatalogSecurityFlagId,
        WasAnalysedId:item.WasAnalysedId,
        TopStratLithoId:item.TopStratLithoId,
        BottomStratLithoId:item.BottomStratLithoId,
        CatalogueCorePictureName:item.CatalogueCorePictureName,
        CataloguePictureSoftcopyPath:item.CataloguePictureSoftcopyPath,
        CataloguePictureHyperlink:item.CataloguePictureHyperlink,
        CatPictureUploadDate:item.CatPictureUploadDate,
        CatalogueReportSoftcopyPath:item.CatalogueReportSoftcopyPath,
        CatalogueReportHyperlink:item.CatalogueReportHyperlink,
        CatReportUploadDate:item.CatReportUploadDate,
        // CatalogReportFormatId:item.CatalogReportFormatId,
        CatalogReportFileSize:item.CatalogReportFileSize,
        // CatalogReportSecurityGradeId:item.CatalogReportSecurityGradeId,
        CoreCatalogName:item.CoreCatalogName,
        Comments:item.Comments,
      }
    }

    onSelectEdit(selectedItem: any) {
      console.log("hide the elements");
      this.status = false;
      this.details= false;
      this.editform = true;
    }

    captureCoreInstance(){
      this.http.get('http://127.0.0.1:8899/apiv1/get_core_catalog/' + this.id)
        .subscribe(response => {
          this.updatevalue = response;
          this.formGroup.patchValue({

            WellboreCoreId:this.stripFormValue(this.updatevalue.WellboreCoreId),
            // CoreType:this.stripFormValue(this.updatevalue.CoreType),
            StoreIdentifier:this.stripFormValue(this.updatevalue.StoreIdentifier),
            CatalogCoreFromDepth:this.stripFormValue(this.updatevalue.CatalogCoreFromDepth),
            CatalogCoreToDepth:this.stripFormValue( this.updatevalue.CatalogCoreToDepth),
            // CoreCatalogSecurityFlagId:this.stripFormValue(this.updatevalue.CoreCatalogSecurityFlagId),
            WasAnalysedId:this.stripFormValue(this.updatevalue.WasAnalysedId),
            TopStratLithoId:this.stripFormValue(this.updatevalue.TopStratLithoId),
            BottomStratLithoId:this.stripFormValue(this.updatevalue.BottomStratLithoId),
            CatalogueCorePictureName:this.stripFormValue( this.updatevalue.CatalogueCorePictureName),
            CataloguePictureSoftcopyPath:this.stripFormValue(this.updatevalue.CataloguePictureSoftcopyPath),
            CataloguePictureHyperlink:this.stripFormValue(this.updatevalue.CataloguePictureHyperlink),
            CatPictureUploadDate:this.stripFormValue(this.updatevalue.CatPictureUploadDate),
            CatalogueReportSoftcopyPath:this.stripFormValue(this.updatevalue.CatalogueReportSoftcopyPath),
            CatalogueReportHyperlink:this.stripFormValue(this.updatevalue.CatalogueReportHyperlink),
            CatReportUploadDate:this.stripFormValue(this.updatevalue.CatReportUploadDate),
            // CatalogReportFormatId:this.stripFormValue(this.updatevalue.CatalogReportFormatId),
            CatalogReportFileSize:this.stripFormValue(this.updatevalue.CatalogReportFileSize),
            // CatalogReportSecurityGradeId:this.stripFormValue(this.updatevalue.CatalogReportSecurityGradeId),
            CoreCatalogName:this.stripFormValue(this.updatevalue.CoreCatalogName),
            Comments:this.stripFormValue(this.updatevalue.Comments)

          });
          console.log(this.updatevalue)
        });


    }

    stripFormValue(formValue: any){
      if (formValue == 'None'){
        return null;
      }else {

        return formValue
      }

    }


  navigateBack() {
    this.authservice.reload();
  }

}
