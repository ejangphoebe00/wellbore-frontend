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
  TopStratLitho_id: any;
  // BottomStratLitho_id: any;
  // CatalogReportFormat_id: any;
  CatalogSecurityFlag_ids: any;
  maxd: any;
  mindate:any;
 



  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService
        
  ) { }

  ngOnInit(): void {
    this.maxd = new Date(); 
    this.mindate = this.maxd.getFullYear()+'-'+parseInt(this.maxd.getMonth()+1)+'-'+ 0+this.maxd.getDate()
  
    this.initForm();
    this.getCoreReportSecurityGrade_id()
    this.getCoreType();
    this.getWelboreCoreId();
    this.getTopStratLitho_id();
 
  
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

  // changeCatalogReportSecurityGrade_id(e:any) {
  //   console.log(e.value)
  //   this.CatalogReportFormat_id.setValue(e.target.value, {
  //     onlySelf: true
  //   })
  // }



  // getCatalogReportFormat_id(){
  //   this.authservice.getAllCatalogSecurityFlags().subscribe(res =>{
  //     this.CatalogReportFormat_id = res;
  //     console.log(this.CatalogReportFormat_id);
  //   })
  //  }

  //  changeCatalogReportFormat_id(e:any) {
  //   console.log(e.value)
  //   this.CatalogReportFormat_id.setValue(e.target.value, {
  //     onlySelf: true
  //   })
  // }

  // getBottomStratLitho_id(){
  //   this.authservice.getStrat().subscribe(res =>{
  //     this.BottomStratLitho_id = res;
  //     console.log(this.BottomStratLitho_id);
  //   })
  //  }

  //  changeBottomStratLitho_id(e:any) {
  //   console.log(e.value)
  //   this.BottomStratLitho_id.setValue(e.target.value, {
  //     onlySelf: true
  //   })
  // }


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

  



}



