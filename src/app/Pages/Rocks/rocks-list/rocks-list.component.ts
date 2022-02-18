import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NgPopupsService } from 'ng-popups';

@Component({
  selector: 'app-rocks-list',
  templateUrl: './rocks-list.component.html',
  styleUrls: ['./rocks-list.component.css']
})
export class RocksListComponent implements OnInit {
  formGroup!: FormGroup;
  title!: string;
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
  Basins: any = ['Edward-George', 'Semiliki', 'Pakwach', 'The Albertine Graben', 'Hoima Basin', 'Lake Kyoga Basin', 'Lake Wamala Basin', 'Kadam-Moroto Basin'];
  Purpose: any = ['Rock Minerals Analysis', 'Clay and Whole-rock Analysis', 'Rock Pyrolysis Analysis', 'Others'];


  uploadFile: boolean = false;
  selectedFiles: any;
  currentFile: any;
  msg: any;

  ims: any = [];
  cutImg: any = [];
  viewFiles: boolean = false;



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

    this.rocks();
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
      StoreId: new FormControl(),
      DateCollected: new FormControl(),
      DateReceived: new FormControl(),
      SampleBasin: new FormControl(),
      SampleName: new FormControl(),
      SamplePurpose: new FormControl(),
      OtherSpecifiedSamplePurpose: new FormControl(),
      Latitude: new FormControl(),
      Longitude: new FormControl(),
      Operator: new FormControl(),
      PetrographicDescription: new FormControl(),
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

  rocks(): void {
    this.authservice
      .getRocks()
      .subscribe((response: any) => {
        console.log(response)
        this.users = response;

        this.dtTrigger.next();
      });
  }



  logout() {
    this.authservice.logoutuser()

  }


  updateRockProcess() {
    console.log("tested")
    if (this.formGroup.valid) {
      console.log(this.formGroup.value)
      this.authservice.updateRocks(this.formGroup.value).subscribe(result => {
        if (result.message == "Rock sample updated successfuly.") {
          this.toastr.success("Rock sample updated successfuly.", "", {
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
    this.id = selectedItem.id;

    this.ngPopups.confirm("Are you sure you want to delete ?", {
      // theme: 'material',
      color: 'OrangeRed',
      okButtonText: 'Yes',
      cancelButtonText: 'No',
      title: "Confirm",
    })
      .subscribe(res => {
        if (res) {
          console.log("Selected item Id: ", selectedItem.id);
          this.http.delete('http://127.0.0.1:8899/apiv1/delete_rock_sample/' + this.id)
            .subscribe(response => {
              this.deleteresp = response;
              console.log(this.deleteresp.message)
              if (this.deleteresp.message == "Rock sample successfully deleted.") {
                this.toastr.success("Rock sample successfully deleted.", "", {
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
    this.id = item.id
    localStorage.setItem("update-id", this.id);
    this.captureCoreInstance();
    this.catalogs = {
      StoreId: item.StoreId,
      DateCollected: item.DateCollected,
      DateReceived: item.DateReceived,
      SampleBasin: item.SampleBasin.replace("BasinsEnum", ''),
      SampleName: item.SampleName,
      SamplePurpose: item.SamplePurpose.replace("SamplePurposeEnum.", ''),
      OtherSpecifiedSamplePurpose: item.OtherSpecifiedSamplePurpose,
      Latitude: item.Latitude,
      Longitude: item.Longitude,
      Operator: item.Operator,
      PetrographicDescription: item.PetrographicDescription
    }
  }

  onSelectEdit(selectedItem: any) {
    console.log("hide the elements");
    this.status = false;
    this.details = false;
    this.editform = true;
  }

  captureCoreInstance() {
    this.http.get('http://127.0.0.1:8899/apiv1/get_rock_sample/' + this.id)
      .subscribe(response => {
        this.updatevalue = response;
        this.formGroup.patchValue({
          StoreId: this.stripFormValue(this.updatevalue.StoreId),
          DateCollected: this.stripFormValue(this.updatevalue.DateCollected),
          DateReceived: this.stripFormValue(this.updatevalue.DateReceived),
          SampleBasin: this.stripFormValue(this.updatevalue.SampleBasin.replace("BasinsEnum.", '')),
          SampleName: this.stripFormValue(this.updatevalue.SampleName),
          SamplePurpose: this.stripFormValue(this.updatevalue.SamplePurpose.replace("SamplePurposeEnum.", '')),
          OtherSpecifiedSamplePurpose: this.stripFormValue(this.updatevalue.OtherSpecifiedSamplePurpose),
          Latitude: this.stripFormValue(this.updatevalue.Latitude),
          Longitude: this.stripFormValue(this.updatevalue.Longitude),
          Operator: this.stripFormValue(this.updatevalue.Operator),
          PetrographicDescription: this.stripFormValue(this.updatevalue.PetrographicDescription)
        });
        console.log(this.updatevalue)
      });


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
      .getRocks()
      .subscribe((response: any) => {
        this.users = response
        console.log('all Imagess tested')


        for (var product of response) {
          console.log('firat test: ' + product.PetrographicAnalysisReports)
          this.ims = product.PetrographicAnalysisReports
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



  stripFormValue(formValue: any) {
    if (formValue == 'None') {
      return null;
    } else {

      return formValue
    }

  }


  navigateBack() {
    this.authservice.reload();
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.currentFile = this.selectedFiles.item(0);


    console.log(this.currentFile)
    this.authservice.uploadRockFile(this.currentFile).subscribe(response => {
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


  changeBasins(e: any) {
    console.log(e.value)
    this.Basins.setValue(e.target.value, {
      onlySelf: true
    })
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
          console.log("Selected item Id: ", selectedItem.Core_sample_id);
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

  changePurpose(e: any) {
    console.log(e.value)
    this.Purpose.setValue(e.target.value, {
      onlySelf: true
    })
  }


  uploadImage() {
    this.currentFile = this.selectedFiles.item(0);


    console.log(this.currentFile)
    this.authservice.uploadRockImage(this.currentFile).subscribe(response => {
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

}


