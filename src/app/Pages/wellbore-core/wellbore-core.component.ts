import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wellbore-core',
  templateUrl: './wellbore-core.component.html',
  styleUrls: ['./wellbore-core.component.css']
})
export class WellboreCoreComponent implements OnInit {

  formGroup!: FormGroup;
  title!: string;
  role:any;
  userEmail: any;
  loggedin: any;

  wellboreIds: any;
  WBCoringContractor_id: any;
  CoreTopStratLitho_id: any;
  CoreBottomStratLitho_id: any;
  ReportFormat_id: any;
  CoreReportSecurityGrade_id: any;



  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService
        
  ) { }

  ngOnInit(): void {
    this.authservice.reload();
    this.initForm();
    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    if(this.authservice.getRole()=="Admin"){
      this.role=true;
    }else{
    this.role= false;
    }

    this.getWelboreId();
    this.getWBCoringContractorId();
    this.getCoreTopStratLitho_id();
    this.getCoreBottomStratLitho_id();
    this.getReportFormat_id();

  }

  initForm(){
    this.formGroup = new FormGroup({
      Wellbore_id:new FormControl('',Validators.required),
      CoreNumber:new FormControl(),
      CoringDate:new FormControl(),
      WBCoringContractor_id:new FormControl(),
      CoreTopMDRT:new FormControl(),
      CoreBtmMDRT:new FormControl(),
      CoreTopTVD:new FormControl(),
      CoreBtmTVD:new FormControl(),
      CutLength:new FormControl(),
      CutLengthTVD:new FormControl(),
      RecoveredLength:new FormControl(),
      CoreRecovery:new FormControl(),
      CoreTopStratLitho_id:new FormControl(),
      CoreBottomStratLitho_id:new FormControl(),
      CorePictureSoftcopyPath:new FormControl(),
      CorePictureHyperlink:new FormControl(),
      PictureUploadDate:new FormControl(),
      CoreReportSoftcopyPath:new FormControl(),
      CoreReportHyperlink:new FormControl(),
      ReportUploadDate:new FormControl(),
      ReportFormat_id:new FormControl(),
      ReportFileSize:new FormControl(),
      CoreReportSecurityGrade_id:new FormControl(),
      ReportOpenDueDate:new FormControl(),
      ReportDocumentTitle:new FormControl(),
      ReportReceivedDate:new FormControl(),
      ReportDocumentDate:new FormControl(),
      ReportDocumentName:new FormControl(),
      WellboreCoreName:new FormControl(),
      Comments:new FormControl()
    });
  }


  logout(){
    this.authservice.logoutuser()

  }


  addWellboreCoreProcess(){
    console.log("tested")
    if(this.formGroup.valid){
      console.log(this.formGroup.value)
      this.authservice.adddWellboreCore(this.formGroup.value).subscribe(result =>{
       
        if(result.message == "Welbore Core added successfuly."){
          this.toastr.success("Welbore Core added successfuly.","",{
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

  getCoreReportSecurityGrade_id(){
    this.authservice.getCoreReportSecurity().subscribe(res =>{
      this.CoreReportSecurityGrade_id = res;
      console.log(this.CoreReportSecurityGrade_id);
    })
  }

  getReportFormat_id(){
    this.authservice.getFormat().subscribe(res =>{
      this.ReportFormat_id = res;
      console.log(this.ReportFormat_id);
    })
  }

  getCoreBottomStratLitho_id(){
    this.authservice.getStrat().subscribe(res =>{
      this.CoreBottomStratLitho_id = res;
      console.log(this.CoreBottomStratLitho_id);
    })
  }


  getCoreTopStratLitho_id(){
    this.authservice.getStrat().subscribe(res =>{
      this.CoreTopStratLitho_id = res;
      console.log(this.CoreTopStratLitho_id);
    })
  }

  


  getWBCoringContractorId(){
    this.authservice.getCompanies().subscribe(res =>{
      this.WBCoringContractor_id = res;
      console.log(this.WBCoringContractor_id);
    })
  }


  getWelboreId(){
    this.authservice.getWelboreIds().subscribe(res =>{
      this.wellboreIds = res;
      console.log(this.wellboreIds);
    })
  }

  changeCoreReportSecurityGrade_id(e:any) {
    console.log(e.value)
    this.CoreReportSecurityGrade_id.setValue(e.target.value, {
      onlySelf: true
    })
  }



  changeReportFormat_id(e:any) {
    console.log(e.value)
    this.ReportFormat_id.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeCoreBottomStratLitho(e:any) {
    console.log(e.value)
    this.CoreBottomStratLitho_id.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeCoreTopStratLitho(e:any) {
    console.log(e.value)
    this.CoreTopStratLitho_id.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeContractingId(e:any) {
    console.log(e.value)
    this.WBCoringContractor_id.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeWellboreId(e:any) {
    console.log(e.value)
    this.wellboreIds.setValue(e.target.value, {
      onlySelf: true
    })
  }
}



