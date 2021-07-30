import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-core-catalog',
  templateUrl: './add-core-catalog.component.html',
  styleUrls: ['./add-core-catalog.component.css']
})
export class AddCoreCatalogComponent implements OnInit {
  formGroup!: FormGroup;
  title!: string;
  role:any;
  userEmail: any;
  loggedin:any;

  wellboreCoreIds: any;
  CoreType: any;
  CoreCatalogSecurityFlag_id: any;
  TopStratLitho_id: any;
  BottomStratLitho_id: any;
  CatalogReportFormat_id: any;
  CatalogReportSecurityGrade_id: any;



  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService
        
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    if(this.authservice.getRole()=="Admin"){
      this.role=true;
    }else{
    this.role= false;
    }
   this.authservice.reload();

   this.getBottomStratLitho_id();
   this.getCatalogReportFormat_id();
   this.getCatalogReportSecurityGrade_id();
   this.getCoreType();
   this.getCoreCatalogSecurityFlag_id();
   this.getWelboreCoreId();
   this.getTopStratLitho_id();


  }

  initForm(){
    this.formGroup = new FormGroup({
      WellboreCore_id:new FormControl('',Validators.required),
      CoreType:new FormControl('',Validators.required),
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


  addCoreCatProcess(){
    console.log("tested")
    if(this.formGroup.valid){
      console.log(this.formGroup.value)
      this.authservice.addStratLitho(this.formGroup.value).subscribe(result =>{
       
        if(result.message == "Core Catalog added successfuly."){
          this.toastr.success("Core Catalog added successfuly.","",{
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

  get f(){return this.formGroup.controls}

  getCatalogReportSecurityGrade_id(){
    this.authservice.getCoreReportSecurity().subscribe(res =>{
      this.CatalogReportSecurityGrade_id = res;
      console.log(this.CatalogReportSecurityGrade_id);
    })
   }


   changeCatalogReportSecurityGrade_id(e:any) {
    console.log(e.value)
    this.CatalogReportFormat_id.setValue(e.target.value, {
      onlySelf: true
    })
  }



  getCatalogReportFormat_id(){
    this.authservice.getFormat().subscribe(res =>{
      this.CatalogReportFormat_id = res;
      console.log(this.CatalogReportFormat_id);
    })
   }

   changeCatalogReportFormat_id(e:any) {
    console.log(e.value)
    this.CatalogReportFormat_id.setValue(e.target.value, {
      onlySelf: true
    })
  }

  getBottomStratLitho_id(){
    this.authservice.getStrat().subscribe(res =>{
      this.BottomStratLitho_id = res;
      console.log(this.BottomStratLitho_id);
    })
   }

   changeBottomStratLitho_id(e:any) {
    console.log(e.value)
    this.BottomStratLitho_id.setValue(e.target.value, {
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


   getCoreCatalogSecurityFlag_id(){
    this.authservice.getCoreReportSecurity().subscribe(res =>{
      this.CoreCatalogSecurityFlag_id = res;
      console.log(this.CoreCatalogSecurityFlag_id);
    })
   }

   changeCoreCatalogSecurityFlag_id(e:any) {
    console.log(e.value)
    this.CoreCatalogSecurityFlag_id.setValue(e.target.value, {
      onlySelf: true
    })
  } 

  getCoreType(){
    this.authservice.getWellboreCores().subscribe(res =>{
      this.wellboreCoreIds = res;
      console.log(this.wellboreCoreIds);
    })
  }

  changeCoreTypes(e:any) {
    console.log(e.value)
    this.CoreType.setValue(e.target.value, {
      onlySelf: true
    })
  }

  getWelboreCoreId(){
    this.authservice.getWelboreIds().subscribe(res =>{
      this.wellboreCoreIds = res;
      console.log(this.wellboreCoreIds);
    })
  }


  changeWellboreCoreId(e:any) {
    console.log(e.value)
    this.wellboreCoreIds.setValue(e.target.value, {
      onlySelf: true
    })
  }

}



