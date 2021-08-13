import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { NgPopupsService } from 'ng-popups';

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
  updatevalue: any;

  wellboreCoreIds: any;
  CoreTypeIds: any;
  TopStratLitho_id: any;
  // BottomStratLitho_id: any;
  // CatalogReportFormat_id: any;
  CatalogSecurityFlag_ids: any;
  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();


  users: any = [];


    constructor(
      private authservice: ApiPipeService,
      private router: Router,
      private toastr: ToastrService,
      private http: HttpClient,
      private ngPopups: NgPopupsService
    ) { }

    ngOnInit(): void {
      this.initForm();
      this.getCoreReportSecurityGrade_id()
      this.getCoreType();
      this.getWelboreCoreId();
      this.getTopStratLitho_id();
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
        WellboreCore_id:new FormControl(),
        CoreType:new FormControl(),
        StoreIdentifier:new FormControl(),
        CatalogCoreFromDepth:new FormControl(),
        CatalogCoreToDepth: new FormControl(),
        CoreCatalogSecurityFlag_id:new FormControl(),
        WasAnalysed_id:new FormControl(),
        TopStratLitho_id:new FormControl(),
        BottomStratLitho_id:new FormControl(),
        CatalogueCorePictureName: new FormControl(),
        CataloguePictureSoftcopyPath:new FormControl(),
        CataloguePictureHyperlink:new FormControl(),
        CatPictureUploadDate:new FormControl(),
        CatalogueReportSoftcopyPath:new FormControl(),
        CatalogueReportHyperlink:new FormControl(),
        CatReportUploadDate:new FormControl(),
        CatalogReportFormat_id:new FormControl(),
        CatalogReportFileSize: new FormControl(),
        CatalogReportSecurityGrade_id:new FormControl(),
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
  
    getCoreReportSecurityGrade_id(){
      this.authservice.getAllCatalogSecurityFlags().subscribe(res =>{
        this.CatalogSecurityFlag_ids = res;
        console.log(this.CatalogSecurityFlag_ids);
      })
    }
  
  
  
    changeCoreReportSecurityGrade_id(e:any) {
      console.log(e.value)
      this.CatalogSecurityFlag_ids.setValue(e.target.value, {
        onlySelf: true
      })
    }

    getTopStratLitho_id(){
      this.authservice.getStrat().subscribe(res =>{
        this.TopStratLitho_id = res;
        console.log(this.TopStratLitho_id);
      })
     }
  
     changeTopStratLitho_id(e:any) {
      console.log(e.value)
      this.TopStratLitho_id.setValue(e.target.value, {
        onlySelf: true
      })
    } 

    onSelect(selectedItem: any) {
      this.id = selectedItem.CoreCatalog_id;
  
      this.ngPopups.confirm("Are you sure you want to delete ?",{
        // theme: 'material',
        color:'OrangeRed',
        okButtonText: 'Yes',
        cancelButtonText:'No',
        title: "Confirm",
      })
      .subscribe(res => {
        if (res) {
        console.log("Selected item Id: ", selectedItem.CoreCatalog_id);
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
  
    onSelectEdit(selectedItem: any) {
      console.log("hide the elements");
      this.status = false;
      this.editform = true;
      this.id = selectedItem.CoreCatalog_id
      localStorage.setItem("update-id", this.id);
      console.log("Selected item Id: ", selectedItem.CoreCatalog_id);
      this.http.get('http://127.0.0.1:8899/apiv1/get_core_catalog/' + this.id)
        .subscribe(response => {
          this.updatevalue = response;
          this.formGroup.patchValue({

            WellboreCore_id:this.updatevalue.WellboreCore_id,
            CoreType:this.updatevalue.CoreType,
            StoreIdentifier:this.updatevalue.StoreIdentifier,
            CatalogCoreFromDepth:this.updatevalue.CatalogCoreFromDepth,
            CatalogCoreToDepth: this.updatevalue.CatalogCoreToDepth,
            CoreCatalogSecurityFlag_id:this.updatevalue.CoreCatalogSecurityFlag_id,
            WasAnalysed_id:this.updatevalue.WasAnalysed_id,
            TopStratLitho_id:this.updatevalue.TopStratLitho_id,
            BottomStratLitho_id:this.updatevalue.BottomStratLitho_id,
            CatalogueCorePictureName: this.updatevalue.CatalogueCorePictureName,
            CataloguePictureSoftcopyPath:this.updatevalue.CataloguePictureSoftcopyPath,
            CataloguePictureHyperlink:this.updatevalue.CataloguePictureHyperlink,
            CatPictureUploadDate:this.updatevalue.CatPictureUploadDate,
            CatalogueReportSoftcopyPath:this.updatevalue.CatalogueReportSoftcopyPath,
            CatalogueReportHyperlink:this.updatevalue.CatalogueReportHyperlink,
            CatReportUploadDate:this.updatevalue.CatReportUploadDate,
            CatalogReportFormat_id:this.updatevalue.CatalogReportFormat_id,
            CatalogReportFileSize:this.updatevalue.CatalogReportFileSize,
            CatalogReportSecurityGrade_id:this.updatevalue.CatalogReportSecurityGrade_id,
            CoreCatalogName:this.updatevalue.CoreCatalogName,
            Comments:this.updatevalue.Comments
         
          });
          console.log(this.updatevalue)
        });
  
  
    }
  

  navigateBack() {
    // this.router.navigate(['/web-security-levels']);
    this.authservice.reload();

  }
}
