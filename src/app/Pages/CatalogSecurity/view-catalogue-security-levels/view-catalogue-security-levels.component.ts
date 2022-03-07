import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { NgPopupsService } from 'ng-popups';

import { CatalogSecurity } from 'src/app/models/catalog-security.model';

@Component({
  selector: 'app-view-catalogue-security-levels',
  templateUrl: './view-catalogue-security-levels.component.html',
  styleUrls: ['./view-catalogue-security-levels.component.css']
})

export class ViewCatalogueSecurityLevelsComponent implements OnInit, OnDestroy {

  formGroup!: FormGroup;
  title!: string;
  role:any;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();


  allusers: any;
  id: any;
  posts: any = [];
  deleteresp: any;
  status: boolean = true;
  editform: boolean = false;
  details: boolean = false;
  updatevalue: any;
  userEmail: any;
  loggedin: any;
  data:any;
  formdata:any;



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
       buttons: [
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
      .getAllCatalogSecurityFlags()
      .subscribe((response: any) => {
        console.log(response)
        this.posts = response;

        this.dtTrigger.next();
      });
  }

  logout() {
    this.authservice.logoutuser()
  }

  getAllCatalogSecurityFlags() {
    this.http.get('http://127.0.0.1:8899/apiv1/get_all_catalog_security_flags')
      .subscribe(posts => {
        this.posts = posts;
        console.log(this.posts)
      });
  }

  onSelect(selectedItem: any) {
    this.id = selectedItem.CatalogSecurityFlag_id

    this.ngPopups.confirm("Are you sure you want to delete ?",{
      // theme: 'material',
      color:'OrangeRed',
      okButtonText: 'Yes',
      cancelButtonText:'No',
      title: "Confirm",
    })
    .subscribe(res => {
      if (res) {
        console.log("Selected item Id: ", selectedItem.CatalogSecurityFlag_id);
        this.http.delete('http://127.0.0.1:8899/apiv1/delete_catalog_security_flag/' + this.id)
          .subscribe(response => {
            this.deleteresp = response;
            console.log(this.deleteresp.message)
            if (this.deleteresp.message == "Catalog Security Flag successfully deleted.") {
              this.toastr.success("Catalog Security Flag successfully deleted.", "", {
                timeOut: 2000,
                positionClass: 'toast-top-center',
                progressBar: true,
                progressAnimation: 'increasing'
              })
              setTimeout(() => {
                this.authservice.reload();
              }, 1000);

            } else {
              this.authservice.catalogSecurityStatusUpdate()
            }
            console.log(this.deleteresp)
          });
      } else {
        console.log("You clicked cancel.")
      }
    });
  }

  onView(selectedItem: any) {
    this.status = true;
    this.details= true;
    this.editform = false;
    this.data = {
      CatalogSecurityFlag_id:selectedItem.CatalogSecurityFlag_id,
      CatalogSecurityFlagName:selectedItem.CatalogSecurityFlagName,
      SortOrder:selectedItem.SortOrder,
      Comments:selectedItem.Comments,
      ModifiedOn:selectedItem.ModifiedOn,
      ModifiedBy:selectedItem.ModifiedBy,
    }
  }

  onSelectEdit(selectedItem: any) {
    console.log("hide the elements");
    this.status = false;
    this.editform = true;
    this.details = false;
    this.id = selectedItem.CatalogSecurityFlag_id
    localStorage.setItem("update-id", this.id);
    console.log("Selected item Id: ", selectedItem.CatalogSecurityFlag_id);
    this.http.get('http://127.0.0.1:8899/apiv1/get_catalog_security_flag/' + this.id)
      .subscribe(response => {
        this.updatevalue = response;

        this.formGroup.patchValue({
          CatalogSecurityFlagName:this.authservice.stripFormValue(this.updatevalue.CatalogSecurityFlagName),
          SortOrder:this.authservice.stripFormValue(this.updatevalue.SortOrder),
          Comments:this.authservice.stripFormValue(this.updatevalue.Comments),
        });
        console.log(this.updatevalue)
      });


  }

  navigateBack() {
    this.authservice.reload();

  }

  updateCatalogSecurityProcess() {
    console.log("tested")
    if (this.formGroup.valid) {
      console.log(this.formGroup.value)
      this.authservice.editCatalogSecurity(this.formGroup.value).subscribe(result => {
        console.log(result)

        if (result.message == "Catalog Security Flag updated successfuly.") {
          this.toastr.success("Catalog Security Flag updated successfully.", "", {
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
          this.authservice.catalogSecurityStatus()
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
      CatalogSecurityFlagName:new FormControl(),
      SortOrder:new FormControl(),
      Comments:new FormControl(),

    });
  }


}
