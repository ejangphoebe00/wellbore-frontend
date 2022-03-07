import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { NgPopupsService } from 'ng-popups';
import { Gallery } from 'angular-gallery';


@Component({
  selector: 'app-cores-list',
  templateUrl: './cores-list.component.html',
  styleUrls: ['./cores-list.component.css']
})
export class CoresListComponent implements OnInit {
  shortLink: string = "";
  loading: boolean = false; 
  file: any;
  fileresponse: any;
  ims: any = [];
  cutImg: any = [];
  filenames: any = [];


  selectedFiles: any;
  selectedFilesSecond: any;
  currentFile: any;
  currentFile2: any;

  afuConfig = {
    uploadAPI: {
      url: "http://127.0.0.1:8899/apiv1/add_file/7"
    }
  };

  formGroup!: FormGroup;
  title!: string;
  wellboreIds: any;
  WBCoringContractor_id: any;
  role: any;
  userEmail: any;
  loggedin: any;
  id: any;
  deleteresp: any;
  status: boolean = true;
  editform: boolean = false;
  uploadFile: boolean = false;
  details: boolean = false;
  updatevalue: any;
  catalogs: any;
  viewFiles: boolean = false;
  viewImages: boolean = false;


  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();


  users: any = [];
  dialog: any;
  fileService: any;
  msg: any;


  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private ngPopups: NgPopupsService,
    private gallery: Gallery

  ) { }

  ngOnInit(): void {

    this.getWelboreId();
    this.getWBCoringContractorId();
    this.cores();
    this.initForm();
    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole(); 
    this.dtOptions = {
      dom: 'Bfrtip',
      buttons: [
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
      Coring_contractor: new FormControl(),
      Wellbore_id: new FormControl(),
      Core_number: new FormControl(),
      Coring_date: new FormControl(),
      Top_MD: new FormControl(),
      Bottom_MD: new FormControl(),
      Cut_length: new FormControl(),
      Percentage_recovery: new FormControl(),
      Top_formation: new FormControl(),
      Bottom_formation: new FormControl(),
      Core_analysis_reports: new FormControl(),
      Core_photograph: new FormControl(),
      fileSource: new FormControl()
    });
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  selectFileAgain(event: any) {
    this.selectedFilesSecond = event.target.files;
  }

  upload() {
    this.currentFile = this.selectedFiles.item(0);
    this.currentFile2 = this.selectedFilesSecond.item(0);

    console.log(this.currentFile)
    this.authservice.uploadFile(this.currentFile, this.currentFile2).subscribe(response => {
      this.fileresponse = response;
      console.log(this.fileresponse.message)

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


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  cores(): void {
    this.authservice
      .getCores()
      .subscribe((response: any) => {
        console.log('all Cores')
        console.log(response)
        this.users = response;
        console.log('all Images First test')
        console.log(response.Core_photographs)



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
      this.authservice.updateCores(this.formGroup.value).subscribe(result => {
        if (result.message == "Core updated successfuly.") {
          this.toastr.success("Core updated successfuly.", "", {
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
        }
      }

      )
    }
  }





  onSelect(selectedItem: any) {
    this.id = selectedItem.Core_sample_id;

    this.ngPopups.confirm("Are you sure you want to delete ?", {
      color: 'OrangeRed',
      okButtonText: 'Yes',
      cancelButtonText: 'No',
      title: "Confirm",
    })
      .subscribe(res => {
        if (res) {
          console.log("Selected item Id: ", selectedItem.Core_sample_id);
          this.http.delete('http://127.0.0.1:8899/apiv1/delete_core/' + this.id)
            .subscribe(response => {
              this.deleteresp = response;
              console.log(this.deleteresp.message)
              if (this.deleteresp.message == "Core successfully deleted.") {
                this.toastr.success("Core successfully deleted.", "", {
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
    this.id = item.Core_sample_id
    localStorage.setItem("update-id", this.id);
    this.captureCoreInstance();
    this.catalogs = {

      Coring_contractor: item.Coring_contractor,
      Wellbore_id: item.Wellbore_id,
      Core_number: item.Core_number,
      Coring_date: item.Coring_date,
      Top_MD: item.Top_MD,
      Bottom_MD: item.Bottom_MD,
      Cut_length: item.Cut_length,
      Percentage_recovery: item.Percentage_recovery,
      Top_formation: item.Top_formation,
      Bottom_formation: item.Bottom_formation
    }
  }

  onSelectEdit(selectedItem: any) {
    console.log("hide the elements");
    this.status = false;
    this.details = false;
    this.editform = true;
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


  onSelectFiles(selectedItem: any) {
    console.log("hide the elements");
    this.status = false;
    this.details = false;
    this.viewFiles = true;
    this.getFiles();

  }


  onSelectImages(selectedItem: any) {
    console.log("hide the elements");
    this.status = false;
    this.details = false;
    this.viewImages = true;
    this.getImages();

  }


  onFile() {
    console.log("Clicked")
    this.status = false;
    this.details = false;
    this.uploadFile = true;
  }

  captureCoreInstance() {
    this.http.get('http://127.0.0.1:8899/apiv1/get_core/' + this.id)
      .subscribe(response => {
        this.updatevalue = response;
        this.formGroup.patchValue({
          Coring_contractor: this.stripFormValue(this.updatevalue.Coring_contractor),
          Wellbore_id: this.stripFormValue(this.updatevalue.Wellbore_id),
          Core_number: this.stripFormValue(this.updatevalue.Core_number),
          Coring_date: this.stripFormValue(this.updatevalue.Coring_date),
          Top_MD: this.stripFormValue(this.updatevalue.Top_MD),
          Bottom_MD: this.stripFormValue(this.updatevalue.Bottom_MD),
          Cut_length: this.stripFormValue(this.updatevalue.Cut_length),
          Percentage_recovery: this.stripFormValue(this.updatevalue.Percentage_recovery),
          Top_formation: this.stripFormValue(this.updatevalue.Top_formation),
          Bottom_formation: this.stripFormValue(this.updatevalue.Bottom_formation)
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
    this.WBCoringContractor_id.setValue(e.target.value, {
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
      this.WBCoringContractor_id = res;
      console.log(this.WBCoringContractor_id);
    })
  }

  stripFormValue(formValue: any) {
    if (formValue == 'None') {
      return null;
    } else {

      return formValue
    }

  }

  showGallery(index: number) {
    this.authservice
      .getCores()
      .subscribe((response: any) => {
        this.users = response


        for (var product of response) {
          console.log('firat test: ' + product.Core_photographs)
          this.ims = product.Core_photographs
          console.log('images  array:' + this.ims.length)
          for (var image of this.ims) {
            console.log(' Testing each image:' + image.replace('backend', 'http://127.0.0.1:8899'))
          }

          let prop = {

            images: [
              { path: image.replace('backend', 'http://127.0.0.1:8899') }
            ],
            index
          };
          this.gallery.load(prop);
        }
      });

  }


  getFiles() {
    this.authservice
      .getCores()
      .subscribe((response: any) => {
        this.users = response
        console.log('all Imagess tested')


        for (var product of response) {
          console.log('firat test: ' + product.Core_analysis_reports)
          this.ims = product.Core_analysis_reports
          console.log('images  array:' + this.ims.length)
          for (var image of this.ims) {
            console.log(' Testing each image:' + image.replace('backend', 'http://127.0.0.1:8899'))
            console.log(' Testing Index of  image:' + this.ims.indexOf(image));

            if (image != 'null') {
              this.cutImg.push({
                'link': image.replace('backend', 'http://127.0.0.1:8899'),
                'file_id': this.ims.indexOf(image) + 1,
                'name': image.replace('backend/static/files/', '')
              });
            }

          }
        }
      });

  }

  getImages() {
    this.authservice
      .getCores()
      .subscribe((response: any) => {
        this.users = response
        console.log('all Imagess tested')


        for (var product of response) {
          console.log('firat test: ' + product.Core_photographs)
          this.ims = product.Core_photographs
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


  navigateBack() {
    this.authservice.reload();
  } 

  onChange(event: any) {
    this.file = event.target.files[0];
  }

 
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.authservice.upload(this.file).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {

          // Short link via api response
          this.shortLink = event.link;

          this.loading = false; // Flag variable 
        }
      }
    );
  }

  get f() {
    return this.formGroup.controls;
  }

  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formGroup.patchValue({
        fileSource: file
      });
    }
  }

  submit() {
    const formData = new FormData();
    formData.append('file', this.formGroup.get('fileSource')!.value);
    console.log(this.formGroup.get('fileSource')!.value)

    this.http.post('http://127.0.0.1:8899/apiv1/add_file/1', formData)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }

}

