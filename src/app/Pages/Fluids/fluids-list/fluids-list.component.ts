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
  WBCoringContractor_id: any;
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

  ims: any = [];
  cutImg: any = [];



  Fluids: any = ['Oil', 'Gas', 'Water'];


  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();


  users: any = [];
  dialog: any;
  maxd: any;
  mindate: any;


  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private ngPopups: NgPopupsService,

  ) { }

  ngOnInit(): void {
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
      Wellbore_id: new FormControl(),
      Sampling_activity: new FormControl(),
      Fluid_category: new FormControl(),
      Sample_type: new FormControl(),
      Sample_volume: new FormControl(),
      Depth_obtained: new FormControl(),
      Date_collected: new FormControl(),
      Date_received: new FormControl(),
      Sampling_company: new FormControl(),
      Analysis_reports: new FormControl()
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
    console.log("tested")
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



  onSelect(selectedItem: any) {
    this.id = selectedItem.Sample_id;

    this.ngPopups.confirm("Are you sure you want to delete ?", {
      // theme: 'material',
      color: 'OrangeRed',
      okButtonText: 'Yes',
      cancelButtonText: 'No',
      title: "Confirm",
    })
      .subscribe(res => {
        if (res) {
          console.log("Selected item Id: ", selectedItem.Sample_id);
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
    this.id = item.Sample_id
    localStorage.setItem("update-id", this.id);
    this.captureCoreInstance();
    this.catalogs = {
      Wellbore_id: item.Wellbore_id,
      Sampling_activity: item.Sampling_activity,
      Fluid_category: item.Fluid_category.replace('FluidCategoryEnum.', ''),
      Sample_type: item.Sample_type,
      Sample_volume: item.Sample_volume,
      Depth_obtained: item.Depth_obtained,
      Date_collected: item.Date_collected,
      Date_received: item.Date_received,
      Sampling_company: item.Sampling_company
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


  getFiles() {
    this.authservice
      .getFluids()
      .subscribe((response: any) => {
        this.users = response
        console.log('all Imagess tested')


        for (var product of response) {
          console.log('firat test: ' + product.Analysis_reports)
          this.ims = product.Analysis_reports
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
          Wellbore_id: this.stripFormValue(this.updatevalue.Wellbore_id),
          Sampling_activity: this.stripFormValue(this.updatevalue.Sampling_activity),
          Fluid_category: this.stripFormValue(this.updatevalue.Fluid_category).replace('FluidCategoryEnum.', ''),
          Sample_type: this.stripFormValue(this.updatevalue.Sample_type),
          Sample_volume: this.stripFormValue(this.updatevalue.Sample_volume),
          Depth_obtained: this.stripFormValue(this.updatevalue.Depth_obtained),
          Date_collected: this.stripFormValue(this.updatevalue.Date_collected),
          Date_received: this.stripFormValue(this.updatevalue.Date_received),
          Sampling_company: this.stripFormValue(this.updatevalue.Sampling_company)

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

  changeFluids(e: any) {
    console.log(e.value)
    this.Fluids.setValue(e.target.value, {
      onlySelf: true
    })
  }


  navigateBack() {
    this.authservice.reload();
  }

}


