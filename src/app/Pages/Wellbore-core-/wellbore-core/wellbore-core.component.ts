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
  CoreNames:any = ['Slab','1/2 Slab','1/3 Slab','2/3 Slab','Biscuit Slab','Full Diameter','SideWall Core'];
  RptFormat:any = ['PDF','EXCEL'];
  Security:any = ['Restricted','Open', 'Confidential'];


  coreRecovery:boolean = true;


  wellboreIds: any;
  WBCoringContractorId: any;
  CoreTopStratLithoId: any;
  CoreBottomStratLithoId: any;
  ReportFormatId: any;
  ReportSecurityGrade: any;
  maxd: any;
  mindate: any;



  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService
        
  ) { }

  ngOnInit(): void {
   
     this.maxd = new Date();
    if (this.maxd.getDate() < 9) {
      this.mindate = this.maxd.getFullYear() + '-' + parseInt(this.maxd.getMonth() + 1) + '-' + 0 + this.maxd.getDate()
    } else {
      this.mindate = this.maxd.getFullYear() + '-' + parseInt(this.maxd.getMonth() + 1) + '-' + this.maxd.getDate()

    }
    this.coreRecovery =true
    // this.authservice.reload();
    this.initForm();
    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    if(this.authservice.getRole()=="Application Admin"){
      this.role=true;
    }else{
    this.role= false;
    }

    this.getWelboreId();
    this.getWBCoringContractorId();
    this.getCoreTopStratLithoId();
    this.getCoreBottomStratLithoId();
    this.getReportFormatId();
    this.getReportSecurityGrade();
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
      AnalysisReportDetails: new FormControl()
    });
  }


  changeRoles(e:any) {
    console.log(e.value)
    this.CoreNames.setValue(e.target.value, {
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

  getReportSecurityGrade(){
    this.authservice.getCoreReportSecurity().subscribe(res =>{
      this.ReportSecurityGrade = res;
      console.log(this.ReportSecurityGrade);
    })
  }

  getReportFormatId(){
    this.authservice.getFormat().subscribe(res =>{
      this.ReportFormatId = res;
      console.log(this.ReportFormatId);
    })
  }

  getCoreBottomStratLithoId(){
    this.authservice.getStrat().subscribe(res =>{
      this.CoreBottomStratLithoId = res;
      console.log(this.CoreBottomStratLithoId);
    })
  }


  getCoreTopStratLithoId(){
    this.authservice.getAllStratLithoUnits().subscribe(res =>{
      this.CoreTopStratLithoId = res;
      console.log(this.CoreTopStratLithoId);
    })
  }

  getWBCoringContractorId(){
    this.authservice.getCompanies().subscribe(res =>{
      this.WBCoringContractorId = res;
      console.log(this.WBCoringContractorId);
    })
  }

  getWelboreId(){
    this.authservice.getWelboreIds().subscribe(res =>{
      this.wellboreIds = res;
      console.log(this.wellboreIds);
    })
  }

  changeReportSecurityGrade(e:any) {
    console.log(e.value)
    this.ReportSecurityGrade.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeReportFormatId(e:any) {
    console.log(e.value)
    this.ReportFormatId.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeCoreBottomStratLitho(e:any) {
    console.log(e.value)
    this.CoreBottomStratLithoId.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeCoreTopStratLitho(e:any) {
    console.log(e.value)
    this.CoreTopStratLithoId.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeContractingId(e:any) {
    console.log(e.value)
    this.WBCoringContractorId.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeWellboreId(e:any) {
    console.log(e.value)
    this.wellboreIds.setValue(e.target.value, {
      onlySelf: true
    })
  }

  // get FirstName(){return this.formGroup.get('FirstName')}

  // get f(){return this.formGroup.controls}


}



