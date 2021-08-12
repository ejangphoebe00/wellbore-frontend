import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { NgPopupsService } from 'ng-popups';


import { CoreType } from 'src/app/models/core-type.model';

@Component({
  selector: 'app-view-core-type',
  templateUrl: './view-core-type.component.html',
  styleUrls: ['./view-core-type.component.css']
})

export class ViewCoreTypeComponent implements OnInit, OnDestroy {

  formGroup!: FormGroup;
  title!: string;
  role:any;

  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();


  allusers: any;
  id: any;
  posts: any = [];
  deleteresp: any;
  status: boolean = true;
  editform: boolean = false;
  updatevalue: any;
  userEmail: any;
  loggedin: any;



  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private ngPopups: NgPopupsService,

  ) { }

  ngOnInit(): void {
    // this.authservice.reload();
    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    if(this.authservice.getRole()=="Admin"){
      this.role=true;
    }else{
    this.role= false;
    }

    this.posts = [];
    this.users();
    this.initForm();
    this.dtOptions = {
      dom:'Bfrtip',
      // dom:'Btp',
      buttons: [
        // 'columnsToggle',
        // 'colvis',
        {
          extend:'copy',
          tag: 'button',
          className: "btn blue btn-outline"
        },
        {
          extend:'print',
          tag: 'button',
          className: "btn yellow btn-outline"
        },
        {
          extend:'excel',
          tag: 'button',
          className: "btn green btn-outline"
        },
        {
          extend:'pdf',
          tag: 'button',
          className: "btn red btn-outline"
        },
      ]
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  users(): void {
    this.authservice
      .getAllCoreTypes()
      .subscribe((response: any) => {
        console.log(response)
        this.posts = response;

        this.dtTrigger.next();
      });
  }

  logout() {
    this.authservice.logoutuser()
  }

  getAllCoreTypes() {
    this.http.get('http://127.0.0.1:8899/apiv1/get_core_types')
      .subscribe(posts => {
        this.posts = posts;
        console.log(this.posts)
      });
  }

  onSelect(selectedItem: any) {
    this.id = selectedItem.CoreType_id

    this.ngPopups.confirm("Are you sure you want to delete ?",{
      // theme: 'material',
      color:'OrangeRed',
      okButtonText: 'Yes',
      cancelButtonText:'No',
      title: "Confirm",
    })
    .subscribe(res => {
      if (res) {
        console.log("Selected item Id: ", selectedItem.CoreType_id);
        this.http.delete('http://127.0.0.1:8899/apiv1/delete_core_type/' + this.id)
          .subscribe(response => {
            this.deleteresp = response;
            console.log(this.deleteresp.message)
            if (this.deleteresp.message == "Core Type successfully deleted.") {
              this.toastr.success("Core Type successfully deleted.", "", {
                timeOut: 2000,
                positionClass: 'toast-top-center',
                progressBar: true,
                progressAnimation: 'increasing'
              })
              setTimeout(() => {
                this.authservice.reload();
              }, 1000);

            } else {
              this.authservice.coreTypeStatusUpdate()
            }
            console.log(this.deleteresp)
          });
      } else {
        console.log("You clicked cancel.")
      }
    });
  }

  onSelectEdit(selectedItem: any) {
    console.log("hide the elements");
    this.status = false;
    this.editform = true;
    this.id = selectedItem.CoreType_id
    localStorage.setItem("update-id", this.id);
    console.log("Selected item Id: ", selectedItem.CoreType_id);
    this.http.get('http://127.0.0.1:8899/apiv1/get_core_type/' + this.id)
      .subscribe(response => {
        this.updatevalue = response;
        this.formGroup.patchValue({
          CoreTypeName:this.updatevalue.CoreTypeName,
          SortOrder:this.updatevalue.SortOrder,
          Comments:this.updatevalue.Comments,
        });
        console.log(this.updatevalue)
      });


  }

  navigateBack() {
    this.authservice.reload();

  }

  updateCoreTypeProcess() {
    console.log("tested")
    if (this.formGroup.valid) {
      console.log(this.formGroup.value)
      this.authservice.editCoreType(this.formGroup.value).subscribe(result => {
        console.log(result)

        if (result.message == "Core Type updated successfuly.") {
          this.toastr.success("Core Type updated successfully.", "", {
            timeOut: 2000,
            positionClass: 'toast-top-center',
            progressBar: true,
            progressAnimation: 'increasing'
          })
          this.formGroup.reset();
          setTimeout(() => {
            this.authservice.reload();
          }, 1000);


        } else {
          this.authservice.coreTypeStatusUpdate()
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

  initForm() {
    this.formGroup = new FormGroup({
      CoreTypeName:new FormControl(),
      SortOrder:new FormControl(),
      Comments:new FormControl(),
    });
  }


}
