import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NgPopupsService } from 'ng-popups';

@Component({
  selector: 'app-cuttings-list',
  templateUrl: './cuttings-list.component.html',
  styleUrls: ['./cuttings-list.component.css']
})
export class CuttingsListComponent implements OnInit {

  formGroup!: FormGroup;
  title!: string;
  wellboreIds: any;
  WBCoringContractorId: any;
  checkstaff: boolean = false;
  role: any;
  userEmail: any;
  loggedin: any;
  id: any;
  deleteresp: any;
  status: boolean = true;
  editform: boolean = false;
  details: boolean = false;
  updatevalue: any;
  catalogs: any;
  cuts:any = ['Washed_Dried','Washed_Wet','Wet_Unwashed','Dry_Unwashed'];
  ims: any = [];
  cutImg: any = [];
  uploadFile: boolean = false;
  selectedFiles: any;
  currentFile: any;
  viewFiles: boolean = false;
  msg: any;


  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();


  users: any = [];
  dialog: any;
  maxd: any;
  mindate: any;

  imgObject: Array<object> = [];
  gal: boolean = false;



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
    this.maxd = new Date(); 
     this.maxd = new Date();
    if (this.maxd.getDate() < 9) {
      this.mindate = this.maxd.getFullYear() + '-' + parseInt(this.maxd.getMonth() + 1) + '-' + 0 + this.maxd.getDate()
    } else {
      this.mindate = this.maxd.getFullYear() + '-' + parseInt(this.maxd.getMonth() + 1) + '-' + this.maxd.getDate()

    }

    this.getWelboreId();
    this.getWBCoringContractorId();
    this.cuttings();
    this.initForm();
    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    // if(this.authservice.getRole()=="Admin"){
    //   this.role=true;
    // }else{
    // this.role= false;
    // }

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
  }

  initForm() {
    this.formGroup = new FormGroup({
      WellboreId: new FormControl(),
      SampleBoxNumber: new FormControl(),
      CuttingCategory: new FormControl(),
      SampleType: new FormControl(),
      MinimumDepth: new FormControl(),
      MaximumDepth: new FormControl(),
      SampleInterval: new FormControl(),
      DateReceived: new FormControl(),
      OtherDescription: new FormControl(),
      TopDepth: new FormControl(),
      BottomDepth: new FormControl(),
      StoreIdentifier: new FormControl(),
      Operator: new FormControl(),
      SamplingCompany: new FormControl(),
      SamplingDate: new FormControl(),
      CuttingsReport: new FormControl(),
      CuttingsPhotograph: new FormControl()
    });
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  cuttings(): void {
    this.authservice
      .getCuts()
      .subscribe((response: any) => {
        console.log(response)
        this.users = response;

        this.dtTrigger.next();
      });
  }

  logout() {
    this.authservice.logoutuser()

  }

  updateCoreCatProcess() {
    console.log("tested")
    if (this.formGroup.valid) {
      console.log(this.formGroup.value)
      this.authservice.updateCuts(this.formGroup.value).subscribe(result => {
        if (result.message == "Cutting updated successfuly.") {
          this.toastr.success("Cutting updated successfuly.", "", {
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

  onSelect(selectedItem: any) {
    this.id = selectedItem.SampleId;

    this.ngPopups.confirm("Are you sure you want to delete ?", {
      // theme: 'material',
      color: 'OrangeRed',
      okButtonText: 'Yes',
      cancelButtonText: 'No',
      title: "Confirm",
    })
      .subscribe(res => {
        if (res) {
          console.log("Selected item Id: ", selectedItem.SampleId);
          this.http.delete('http://127.0.0.1:8899/apiv1/delete_cutting/' + this.id)
            .subscribe(response => {
              this.deleteresp = response;
              console.log(this.deleteresp.message)
              if (this.deleteresp.message == "Cutting successfully deleted.") {
                this.toastr.success("Cutting successfully deleted.", "", {
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
    this.id = item.SampleId
    localStorage.setItem("update-id", this.id);
    this.captureCoreInstance();
    this.catalogs = {

     WellboreId: item.WellboreId,
      SampleBoxNumber: item.SampleBoxNumber,
      CuttingCategory: item.CuttingCategory.replace('CuttingsCategoryEnum.', ''),
      SampleType: item.SampleType,
      MinimumDepth: item.MinimumDepth,
      MaximumDepth: item.MaximumDepth,
      SampleInterval: item.SampleInterval,
      DateReceived: item.DateReceived,
      OtherDescription: item.OtherDescription,
      TopDepth:item.TopDepth,
      BottomDepth: item.BottomDepth,
      StoreIdentifier: item.StoreIdentifier,
      Operator: item.Operator,
      SamplingCompany: item.SamplingCompany,
      SamplingDate: item.SamplingDate

    }
  }

  onSelectEdit(selectedItem: any) {
    console.log("hide the elements");
    this.status = false;
    this.details = false;
    this.editform = true;
  }

  captureCoreInstance() {
    this.http.get('http://127.0.0.1:8899/apiv1/get_cutting/' + this.id)
      .subscribe(response => {
        this.updatevalue = response;
        this.formGroup.patchValue({
         WellboreId: this.stripFormValue(this.updatevalue.WellboreId),
          SampleBoxNumber: this.stripFormValue(this.updatevalue.SampleBoxNumber),
          CuttingCategory: this.stripFormValue(this.updatevalue.CuttingCategory).replace('CuttingsCategoryEnum.', ''),
          SampleType: this.stripFormValue(this.updatevalue.SampleType),
          MinimumDepth: this.stripFormValue(this.updatevalue.MinimumDepth),
          MaximumDepth: this.stripFormValue(this.updatevalue.MaximumDepth),
          SampleInterval: this.stripFormValue(this.updatevalue.SampleInterval),
          DateReceived: this.stripFormValue(this.updatevalue.DateReceived),
          OtherDescription: this.stripFormValue(this.updatevalue.OtherDescription),
          TopDepth:this.stripFormValue(this.updatevalue.ToDepth),
          BottomDepth: this.stripFormValue(this.updatevalue.BottomDepth),
          StoreIdentifier: this.stripFormValue(this.updatevalue.StoreIdentifier),
          Operator: this.stripFormValue(this.updatevalue.Operator),
          SamplingCompany: this.stripFormValue(this.updatevalue.SamplingCompany),
          SamplingDate:this.stripFormValue(this.updatevalue.SamplingDate)
        });
        console.log(this.updatevalue)
      });


  }

  getWelboreId() {
    this.authservice.getWelboreIds().subscribe(res => {
      this.wellboreIds = res;
      console.log(this.wellboreIds);
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

  getWBCoringContractorId() {
    this.authservice.getCompanies().subscribe(res => {
      this.WBCoringContractorId = res;
      console.log(this.WBCoringContractorId);
    })
  }

  stripFormValue(formValue: any) {
    if (formValue == 'None') {
      return null;
    } else {

      return formValue
    }

  }

  changeFluids(e:any) {
    console.log(e.value)
    this.cuts.setValue(e.target.value, {
      onlySelf: true
    })
  }

  navigateBack() {
    this.authservice.reload();
  }

  onSelectFiles(selectedItem: any) {
    console.log("hide the elements");
    this.status = false;
    this.details = false;
    this.viewFiles = true;
    this.getFiles();

  }

  getFiles() {
    this.authservice
      .getCuts()
      .subscribe((response: any) => {
        this.users = response
        console.log('all Imagess tested')


        for (var product of response) {
          console.log('firat test: ' + product.CuttingsReport)
          this.ims = product.CuttingsReport
          console.log('images  array:' + this.ims.length)
          for (var image of this.ims) {
            console.log(' Testing each image:' + image.replace('backend', 'http://127.0.0.1:8899'))
            this.cutImg.push({
              'link': image.replace('backend', 'http://127.0.0.1:8899'),
              'name': image.replace('backend/static/files/', '')
            });

          }
        }
      });

  }

    onFile() {
    console.log("Clicked")
    this.status = false;
    this.details = false;
    this.uploadFile = true;
  }


  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }


  upload() {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.currentFile = this.selectedFiles[i];
      this.authservice.uploadCuttingsFile(this.currentFile).subscribe(response => {
        this.selectedFiles.value = '';
          if (response instanceof HttpResponse) {
            this.msg = response.body;
            console.log(response.body);       
        }
      });
    }

    this.toastr.success("File(s) Uploaded successfully.", "", {
      timeOut: 2000,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation: 'increasing'
    })
    this.formGroup.reset();
  }


  uploadImage() {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.currentFile = this.selectedFiles[i];
      this.authservice.uploadCuttingsImage(this.currentFile).subscribe(response => {
        this.selectedFiles.value = '';
          if (response instanceof HttpResponse) {
            this.msg = response.body;
            console.log(response.body);       
        }
      });
    }

    this.toastr.success("File(s) Uploaded successfully.", "", {
      timeOut: 2000,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation: 'increasing'
    })
    this.formGroup.reset();
  }

  onDeleteFile(selectedItem: any) {
    console.log('you clicked on element no: ' + selectedItem.file_id);



    this.id = selectedItem.file_id;

    this.ngPopups.confirm("Are you sure you want to delete this file?", {
      // theme: 'material',
      color: 'OrangeRed',
      okButtonText: 'Yes',
      cancelButtonText: 'No',
      title: "Confirm",
    })
      .subscribe(res => {
        if (res) {
          console.log("Selected item Id: ", selectedItem.Core_SampleId);
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

  onSelectGallery(selectedItem: any) {
    this.status = false;
    this.details = false;
    this.viewFiles = false;
    this.gal = true;
    this.getImages();

  }

  getImages() {
    this.authservice
      .getCuts()
      .subscribe((response: any) => {
        this.users = response
        console.log('all Imagess tested')


        for (var product of response) {
          console.log('firat test: ' + product.CuttingsPhotograph)
          this.ims = product.CuttingsPhotograph
          console.log('images  array:' + this.ims.length)
          for (var image of this.ims) {
            console.log(' Testing each image:' + image.replace('backend', 'http://127.0.0.1:8899'))
            this.cutImg.push({
              'link': image.replace('backend', 'http://127.0.0.1:8899'),
              'name': image.replace('backend/static/files/', '')
            });

            this.imgObject.push({
              image: image.replace('backend', 'http://127.0.0.1:8899'),
              thumbImage: image.replace('backend', 'http://127.0.0.1:8899'),
              title: image.replace('backend/static/files/', ''),
              alt: image.replace('backend/static/files/', ''),
            });

          }
        }
      });

  }

}

