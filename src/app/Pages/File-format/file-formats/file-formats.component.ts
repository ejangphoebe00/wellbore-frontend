import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { NgPopupsService } from 'ng-popups';

@Component({
  selector: 'app-file-formats',
  templateUrl: './file-formats.component.html',
  styleUrls: ['./file-formats.component.css']
})
export class FileFormatsComponent implements OnInit {
  formGroup!: FormGroup;
  title!: string;
  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();


formats: any = [];
role:any;
  userEmail:any;
  loggedin:any;
  deleteresp: any;
  status: boolean = true;
  editform: boolean = false;
  updatevalue: any;
  id: any;

  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private ngPopups: NgPopupsService
  ) { }

  ngOnInit(): void {
    // this.authservice.reload();
    this.initForm()
    this.allFormats()
    this.userEmail = this.authservice.getEmail();
    this.loggedin = this.authservice.getRole();
    if(this.authservice.getRole()=="Admin"){
      this.role=true;
    }else{
    this.role= false;
    }
    this.dtOptions = {
      dom:'Bfrtip',
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

  allFormats(): void {
    this.authservice
        .getAllformats()
        .subscribe((response: any) => {
          console.log(response)
          this.formats = response;

          this.dtTrigger.next();
        });
      }

  logout(){
    this.authservice.logoutuser()
  }

  onSelect(selectedItem: any) {
    this.id = selectedItem.FileFormat_id

    this.ngPopups.confirm("Are you sure you want to delete ?",{
      // theme: 'material',
      color:'OrangeRed',
      okButtonText: 'Yes',
      cancelButtonText:'No',
      title: "Confirm",
    })
    .subscribe(res => {
      if (res) {
      console.log("Selected item Id: ", selectedItem.FileFormat_id);
      this.http.delete('http://127.0.0.1:8899/apiv1/delete_file_format/'+this.id)
        .subscribe(response => {
          this.deleteresp = response;
          console.log(this.deleteresp.message)
          if (this.deleteresp.message == "File Format successfully deleted.") {
            this.toastr.success("File Format successfully deleted.", "", {
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

  initForm(){
    this.formGroup = new FormGroup({
      FileFormatName:new FormControl(),
      SortOrder:new FormControl(),
      Comments:new FormControl()

    });
  }

  onSelectEdit(selectedItem: any) {
    console.log("hide the elements");
    this.status = false;
    this.editform = true;
    this.id = selectedItem.FileFormat_id
    localStorage.setItem("update-id", this.id);
    console.log("Selected item Id: ", selectedItem.FileFormat_id);
    this.http.get('http://127.0.0.1:8899/apiv1/get_file_format/' + this.id)
      .subscribe(response => {
        this.updatevalue = response;
        this.formGroup.patchValue({

          FileFormatName: this.updatevalue.FileFormatName,
          SortOrder: this.updatevalue.SortOrder,
          Comments: this.updatevalue.Comments
        });
        console.log(this.updatevalue)
      });


  }

  navigateBack() {
    // this.router.navigate(['/web-security-levels']);
    this.authservice.reload();

  }

  updateFileFormatsProcess(){
    console.log("tested")
    if(this.formGroup.valid){
      console.log(this.formGroup.value)
      this.authservice.updateFileGrades(this.formGroup.value).subscribe(result =>{

        if(result.message == "File Format updated successfuly."){
          this.toastr.success("File Format updated successfuly.","",{
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


}
