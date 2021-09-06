import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { NgPopupsService } from 'ng-popups';


// import { CoreType } from 'src/app/models/core-type.model';
import { StratLithoUnit} from 'src/app/models/strat-litho-unit.model';


@Component({
  selector: 'app-view-core-type',
  templateUrl: './view-strat-litho.component.html',
  styleUrls: ['./view-strat-litho.component.css']
})

export class ViewStratLithoComponent implements OnInit, OnDestroy {

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
  details: boolean = false;
  updatevalue: any;
  userEmail: any;
  loggedin: any;
  data: any;
  formdata: any;
  // value:any;



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
      .getAllStratLithoUnits()
      .subscribe((response: any) => {
        console.log(response)
        this.posts = response;

        this.dtTrigger.next();
      });
  }

  logout() {
    this.authservice.logoutuser()
  }

  getStratLithoUnits() {
    this.http.get('http://127.0.0.1:8899/apiv1/get_strat_litho_units')
      .subscribe(posts => {
        this.posts = posts;
        console.log(this.posts)
      });
  }

  onSelect(selectedItem: any) {
    this.id = selectedItem.StratLitho_id

    this.ngPopups.confirm("Are you sure you want to delete ?",{
      // theme: 'material',
      color:'OrangeRed',
      okButtonText: 'Yes',
      cancelButtonText:'No',
      title: "Confirm",
    })
    .subscribe(res => {
      if (res) {
        console.log("Selected item Id: ", selectedItem.StratLitho_id);
        this.http.delete('http://127.0.0.1:8899/apiv1/delete_strat_litho_unit/' + this.id)
          .subscribe(response => {
            this.deleteresp = response;
            console.log(this.deleteresp.message)
            if (this.deleteresp.message == "Strat Litho Unit successfully deleted.") {
              this.toastr.success("Strat litho unit successfully deleted.", "", {
                timeOut: 2000,
                positionClass: 'toast-top-center',
                progressBar: true,
                progressAnimation: 'increasing'
              })
              setTimeout(() => {
                this.authservice.reload();
              }, 1000);

            } else {
              this.authservice.stratLithoStatusUpdate()
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
      PAUID:selectedItem.PAUID,
      StratLitho_id:selectedItem.StratLitho_id,
      StratLithoName:selectedItem.StratLithoName,
      ReserviorUnit:selectedItem.ReserviorUnit,
      LithoStratAlias:selectedItem.LithoStratAlias,
      IsReservoirUnit_id:selectedItem.IsReservoirUnit_id,
      LithoStratAge_id:selectedItem.LithoStratAge_id,
      LithoStratDescriptionSoftcopyPath:selectedItem.LithoStratDescriptionSoftcopyPath,
      LithoStratDescriptionHyperlink:selectedItem.LithoStratDescriptionHyperlink,
      LithoStratMapSoftCopyPath:selectedItem.LithoStratMapSoftCopyPath,
      LithoStratMapHyperlink:selectedItem.LithoStratMapHyperlink,
      MapPortalLithoStratMapLink:selectedItem.MapPortalLithoStratMapLink,
      LithoStratFactsiteUrl:selectedItem.LithoStratFactsiteUrl,
      Comments:selectedItem.Comments,
    }
  }

  onSelectEdit(selectedItem: any) {
    console.log("hide the elements");
    this.status = false;
    this.editform = true;
    this.details = false;
    this.id = selectedItem.StratLitho_id
    localStorage.setItem("update-id", this.id);
    console.log("Selected item Id: ", selectedItem.StratLitho_id);
    this.http.get('http://127.0.0.1:8899/apiv1/get_strat_litho_unit/' + this.id)
      .subscribe(response => {
        this.updatevalue = response;

        this.formGroup.patchValue({
          PAUID:this.authservice.stripFormValue(this.authservice.stripFormValue(this.updatevalue.PAUID)),
          StratLithoName:this.authservice.stripFormValue(this.updatevalue.StratLithoName),
          ReserviorUnit:this.authservice.stripFormValue(this.updatevalue.ReserviorUnit),
          LithoStratAlias:this.authservice.stripFormValue(this.updatevalue.LithoStratAlias),
          IsReservoirUnit_id:this.authservice.stripFormValue(this.updatevalue.IsReservoirUnit_id),
          LithoStratAge_id:this.authservice.stripFormValue(this.updatevalue.LithoStratAge_id),
          LithoStratDescriptionSoftcopyPath:this.authservice.stripFormValue(this.updatevalue.LithoStratDescriptionSoftcopyPath),
          LithoStratDescriptionHyperlink:this.authservice.stripFormValue(this.updatevalue.LithoStratDescriptionHyperlink),
          LithoStratMapSoftCopyPath:this.authservice.stripFormValue(this.updatevalue.LithoStratMapSoftCopyPath),
          LithoStratMapHyperlink:this.authservice.stripFormValue(this.updatevalue.LithoStratMapHyperlink),
          MapPortalLithoStratMapLink:this.authservice.stripFormValue(this.updatevalue.MapPortalLithoStratMapLink),
          LithoStratFactsiteUrl:this.authservice.stripFormValue(this.updatevalue.LithoStratFactsiteUrl),
          Comments:this.authservice.stripFormValue(this.updatevalue.Comments),
        });
        console.log(this.updatevalue)
      });


  }

  navigateBack() {
    this.authservice.reload();

  }

  updateStratLithoProcess() {
    console.log("tested")
    if (this.formGroup.valid) {
      console.log(this.formGroup.value)
      this.authservice.updateStratLitho(this.formGroup.value).subscribe(result => {
        console.log(result)

        if (result.message == "Strat Litho Unit updated successfuly.") {
          this.toastr.success("Strat litho unit updated successfuly.", "", {
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
          this.authservice.stratLithoStatusUpdate()
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
      PAUID:new FormControl(),
      StratLithoName:new FormControl(),
      ReserviorUnit:new FormControl(),
      LithoStratAlias:new FormControl(),
      IsReservoirUnit_id:new FormControl(),
      LithoStratAge_id:new FormControl(),
      LithoStratDescriptionSoftcopyPath:new FormControl(),
      LithoStratDescriptionHyperlink:new FormControl(),
      LithoStratMapSoftCopyPath:new FormControl(),
      LithoStratMapHyperlink:new FormControl(),
      MapPortalLithoStratMapLink:new FormControl(),
      LithoStratFactsiteUrl:new FormControl(),
      Comments:new FormControl(),

    });
  }

}
