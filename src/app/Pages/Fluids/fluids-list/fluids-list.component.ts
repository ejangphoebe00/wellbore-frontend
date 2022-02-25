import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NgPopupsService } from 'ng-popups';

@Component({
  selector: 'app-fluids-list',
  templateUrl: './fluids-list.component.html',
  styleUrls: ['./fluids-list.component.css']
})
export class FluidsListComponent implements OnInit {

  formGroup!: FormGroup;
  title!: string;
  wellboreIds: any;
  WBCoringContractorId: any;
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
  uploadFile: boolean = false;
  selectedFiles: any;
  currentFile: any;
  msg: any;
  viewFiles: boolean = false;
  Basins: any = ['Edward-George', 'Semiliki', 'Pakwach', 'The Albertine Graben', 'Hoima Basin', 'Lake Kyoga Basin', 'Lake Wamala Basin', 'Kadam-Moroto Basin'];
  Purpose: any = ['Crude Oil Analysis','PVT Analysis','Formation Water Analysis','Natural Gas Analysis','Others'];


  ims: any = [];
  cutImg: any = [];
  imgObject: Array<object> = [];
  gal: boolean = false;



  Fluids: any = ['Oil', 'Gas', 'Water'];


  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();


  users: any = [];
  dialog: any;
  maxd: any;
  mindate: any;
  checkstaff: boolean = false;


  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private ngPopups: NgPopupsService,

  ) { }

  ngOnInit(): void {
    if (this.authservice.getRole() == "Data Admin") {
      this.checkstaff = true;
    } else {
      this.checkstaff = false;
    }

    this.maxd = new Date();
    if (this.maxd.getDate() < 9) {
      this.mindate = this.maxd.getFullYear() + '-' + parseInt(this.maxd.getMonth() + 1) + '-' + 0 + this.maxd.getDate()
    } else {
      this.mindate = this.maxd.getFullYear() + '-' + parseInt(this.maxd.getMonth() + 1) + '-' + this.maxd.getDate()

    }
    this.getWelboreId();
    this.getWBCoringContractorId();
    this.fluids();
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
      SamplingActivity: new FormControl(),
      FluidCategory: new FormControl(),
      SampleType: new FormControl(),
      SampleBasin: new FormControl(),
      SampleVolume: new FormControl(),
      DepthObtained: new FormControl(),
      DateCollected: new FormControl(),
      DateReceived: new FormControl(),
      SamplingCompany: new FormControl(),
      AnalysisReports: new FormControl(),
      SamplePurpose: new FormControl(),
      OtherSpecifiedSamplePurpose: new FormControl(),
      FluidPhotograph: new FormControl()
    });
  }

  onFile() {
    console.log("Clicked")
    this.status = false;
    this.details = false;
    this.uploadFile = true;
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  fluids(): void {
    this.authservice
      .getFluids()
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
    console.log("TESTING FLUIDS UPDATE")
    if (this.formGroup.valid) {
      console.log(this.formGroup.value)
      this.authservice.updateFluids(this.formGroup.value).subscribe(result => {
        if (result.message == "Fluid sample updated successfuly.") {
          this.toastr.success("Fluid sample updated successfuly.", "", {
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

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.currentFile = this.selectedFiles.item(0);


    console.log(this.currentFile)
    this.authservice.uploadFluidFile(this.currentFile).subscribe(response => {
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


  uploadImage() {
    this.currentFile = this.selectedFiles.item(0);


    console.log(this.currentFile)
    this.authservice.uploadFluidImage(this.currentFile).subscribe(response => {
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
          this.http.delete('http://127.0.0.1:8899/apiv1/delete_fluid_sample/' + this.id)
            .subscribe(response => {
              this.deleteresp = response;
              console.log(this.deleteresp.message)
              if (this.deleteresp.message == "Fluid sample successfully deleted.") {
                this.toastr.success("Fluid sample successfully deleted.", "", {
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
      SamplingActivity: item.SamplingActivity,
      FluidCategory: item.FluidCategory.replace('FluidCategoryEnum.', ''),
      SampleType: item.SampleType,
      SampleVolume: item.SampleVolume,
      SampleBasin: item.SampleBasin,
      DepthObtained: item.DepthObtained,
      DateCollected: item.DateCollected,
      DateReceived: item.DateReceived,
      SamplingCompany: item.SamplingCompany,
      SamplePurpose: item.SamplePurpose.replace('FluidSamplePurposeEnum.', ''),
      OtherSpecifiedSamplePurpose: item.OtherSpecifiedSamplePurpose
    }
  }

  onSelectEdit(selectedItem: any) {
    console.log("hide the elements");
    this.status = false;
    this.details = false;
    this.editform = true;
  }


  onSelectFiles(selectedItem: any) {
    console.log("hide the elements");
    this.status = false;
    this.details = false;
    this.viewFiles = true;
    this.getFiles();

  }

  changePurpose(e: any) {
    console.log(e.value)
    this.Purpose.setValue(e.target.value, {
      onlySelf: true
    })
  }


  getFiles() {
    this.authservice
      .getFluids()
      .subscribe((response: any) => {
        this.users = response
        console.log('all Imagess tested')


        for (var product of response) {
          console.log('firat test: ' + product.AnalysisReports)
          this.ims = product.AnalysisReports
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

  captureCoreInstance() {
    this.http.get('http://127.0.0.1:8899/apiv1/get_fluid_sample/' + this.id)
      .subscribe(response => {
        this.updatevalue = response;
        this.formGroup.patchValue({
          WellboreId: this.stripFormValue(this.updatevalue.WellboreId),
          SamplingActivity: this.stripFormValue(this.updatevalue.SamplingActivity),
          FluidCategory: this.stripFormValue(this.updatevalue.FluidCategory).replace('FluidCategoryEnum.', ''),
          SampleType: this.stripFormValue(this.updatevalue.SampleType),
          SampleVolume: this.stripFormValue(this.updatevalue.SampleVolume),
          SampleBasin: this.stripFormValue(this.updatevalue.SampleBasin),
          DepthObtained: this.stripFormValue(this.updatevalue.DepthObtained),
          DateCollected: this.stripFormValue(this.updatevalue.DateCollected),
          DateReceived: this.stripFormValue(this.updatevalue.DateReceived),
          SamplingCompany: this.stripFormValue(this.updatevalue.SamplingCompany),
          SamplePurpose: this.stripFormValue(this.updatevalue.SamplePurpose).replace('FluidSamplePurposeEnum.', ''),
          OtherSpecifiedSamplePurpose: this.stripFormValue(this.updatevalue.OtherSpecifiedSamplePurpose)

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

  changeFluids(e: any) {
    console.log(e.value)
    this.Fluids.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeBasins(e: any) {
    console.log(e.value)
    this.Basins.setValue(e.target.value, {
      onlySelf: true
    })
  }


  navigateBack() {
    this.authservice.reload();
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
      .getFluids()
      .subscribe((response: any) => {
        this.users = response
        console.log('all Imagess tested')


        for (var product of response) {
          console.log('firat test: ' + product.FluidPhotograph)
          this.ims = product.FluidPhotograph
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


