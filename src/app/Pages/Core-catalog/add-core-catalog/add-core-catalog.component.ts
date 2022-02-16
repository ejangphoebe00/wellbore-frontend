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
  CoreTypeIds: any;
  TopStratLithoId: any;
  // BottomStratLithoId: any;
  // CatalogReportFormatId: any;
  CatalogSecurityFlagIds: any;
  maxd: any;
  mindate:any;
 



  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService
        
  ) { }

  ngOnInit(): void {
    this.maxd = new Date(); 
     this.maxd = new Date();
    if (this.maxd.getDate() < 9) {
      this.mindate = this.maxd.getFullYear() + '-' + parseInt(this.maxd.getMonth() + 1) + '-' + 0 + this.maxd.getDate()
    } else {
      this.mindate = this.maxd.getFullYear() + '-' + parseInt(this.maxd.getMonth() + 1) + '-' + this.maxd.getDate()

    }
  
    this.initForm();
    this.getCoreReportSecurityGradeId()
    this.getCoreType();
    this.getWelboreCoreId();
    this.getTopStratLithoId();
 
  
    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    if(this.authservice.getRole()=="Admin"){
      this.role=true;
    }else{
    this.role= false;
    }
 



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


  addCoreCatProcess(){
    console.log("tested")
    if(this.formGroup.valid){
      console.log(this.formGroup.value)
      this.authservice.addCoreCatalog(this.formGroup.value).subscribe(result =>{
       
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

  // changeCatalogReportSecurityGradeId(e:any) {
  //   console.log(e.value)
  //   this.CatalogReportFormatId.setValue(e.target.value, {
  //     onlySelf: true
  //   })
  // }



  // getCatalogReportFormatId(){
  //   this.authservice.getAllCatalogSecurityFlags().subscribe(res =>{
  //     this.CatalogReportFormatId = res;
  //     console.log(this.CatalogReportFormatId);
  //   })
  //  }

  //  changeCatalogReportFormatId(e:any) {
  //   console.log(e.value)
  //   this.CatalogReportFormatId.setValue(e.target.value, {
  //     onlySelf: true
  //   })
  // }

  // getBottomStratLithoId(){
  //   this.authservice.getStrat().subscribe(res =>{
  //     this.BottomStratLithoId = res;
  //     console.log(this.BottomStratLithoId);
  //   })
  //  }

  //  changeBottomStratLithoId(e:any) {
  //   console.log(e.value)
  //   this.BottomStratLithoId.setValue(e.target.value, {
  //     onlySelf: true
  //   })
  // }


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

  



}



