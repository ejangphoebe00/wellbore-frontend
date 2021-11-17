import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
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
  cuts:any = ['Washed_Dried','Washed_Wet','Wet_Unwashed','Dry_Unwashed'];


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
      Wellbore_id: new FormControl(),
      Sample_box_number: new FormControl(),
      Cutting_category: new FormControl(),
      Sample_type: new FormControl(),
      Minimum_depth: new FormControl(),
      Maximum_depth: new FormControl(),
      Sample_interval: new FormControl(),
      Date_received: new FormControl(),
      Other_description: new FormControl(),
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
    this.id = item.Sample_id
    localStorage.setItem("update-id", this.id);
    this.captureCoreInstance();
    this.catalogs = {

      Wellbore_id: item.Wellbore_id,
      Sample_box_number: item.Sample_box_number,
      Cutting_category: item.Cutting_category.replace('CuttingsCategoryEnum.', ''),
      Sample_type: item.Sample_type,
      Minimum_depth: item.Minimum_depth,
      Maximum_depth: item.Maximum_depth,
      Sample_interval: item.Sample_interval,
      Date_received: item.Date_received,
      Other_description: item.Other_description

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
          Wellbore_id: this.stripFormValue(this.updatevalue.Wellbore_id),
          Sample_box_number: this.stripFormValue(this.updatevalue.Sample_box_number),
          Cutting_category: this.stripFormValue(this.updatevalue.Cutting_category).replace('CuttingsCategoryEnum.', ''),
          Sample_type: this.stripFormValue(this.updatevalue.Sample_type),
          Minimum_depth: this.stripFormValue(this.updatevalue.Minimum_depth),
          Maximum_depth: this.stripFormValue(this.updatevalue.Maximum_depth),
          Sample_interval: this.stripFormValue(this.updatevalue.Sample_interval),
          Date_received: this.stripFormValue(this.updatevalue.Date_received),
          Other_description: this.stripFormValue(this.updatevalue.Other_description)
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

  changeFluids(e:any) {
    console.log(e.value)
    this.cuts.setValue(e.target.value, {
      onlySelf: true
    })
  }


  navigateBack() {
    this.authservice.reload();
  }

}

