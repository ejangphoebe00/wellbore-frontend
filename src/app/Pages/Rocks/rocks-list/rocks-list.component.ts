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
  role:any;
  userEmail: any;
  loggedin:any;
  id: any;
  deleteresp: any;
  status: boolean = true;
  editform: boolean = false;
  details:boolean= false;
  updatevalue: any;
  catalogs:any;

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

    initForm(){
      this.formGroup = new FormGroup({
        Sample_id:new FormControl(),
        Date_collected:new FormControl(),
        Date_received:new FormControl(),
        Sample_basin:new FormControl(),
        Rock_name:new FormControl(),
        Coordinate_location:new FormControl(),
        Petrographic_description:new FormControl(),
        Petrographic_analysis_reports:new FormControl()
      });
    }


    onFile(){
      console.log("Clicked")
      this.status = false;
      this.details= false;
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



    logout(){
      this.authservice.logoutuser()

    }


    updateRockProcess(){
      console.log("tested")
      if(this.formGroup.valid){
        console.log(this.formGroup.value)
        this.authservice.updateRocks(this.formGroup.value).subscribe(result =>{
          if(result.message == "Rock sample updated successfuly."){
            this.toastr.success("Rock sample updated successfuly.","",{
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



    onSelect(selectedItem: any) {
      this.id = selectedItem.id;

      this.ngPopups.confirm("Are you sure you want to delete ?",{
        // theme: 'material',
        color:'OrangeRed',
        okButtonText: 'Yes',
        cancelButtonText:'No',
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
        Sample_id:item.Sample_id,
        Date_collected:item.Date_collected,
        Date_received:item.Date_received,
        Sample_basin:item.Sample_basin,
        Rock_name:item.Rock_name,
        Coordinate_location:item.Coordinate_location,
        Petrographic_description:item.Petrographic_description
      }
    }

    onSelectEdit(selectedItem: any) {
      console.log("hide the elements");
      this.status = false;
      this.details= false;
      this.editform = true;
    }

    captureCoreInstance(){
      this.http.get('http://127.0.0.1:8899/apiv1/get_rock_sample/' + this.id)
        .subscribe(response => {
          this.updatevalue = response;
          this.formGroup.patchValue({
            Sample_id:this.stripFormValue(this.updatevalue.Sample_id),
            Date_collected:this.stripFormValue(this.updatevalue.Date_collected),
            Date_received:this.stripFormValue(this.updatevalue.Date_received),
            Sample_basin:this.stripFormValue(this.updatevalue.Sample_basin),
            Rock_name:this.stripFormValue(this.updatevalue.Rock_name),
            Coordinate_location:this.stripFormValue(this.updatevalue.Coordinate_location),
            Petrographic_description:this.stripFormValue(this.updatevalue.Petrographic_description)
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
            console.log('firat test: ' + product.Petrographic_analysis_reports)
            this.ims = product.Petrographic_analysis_reports
            console.log('images  array:' + this.ims.length)
            for (var image of this.ims) {
              console.log(' Testing each image:' + image.replace('backend', 'http://127.0.0.1:8899'))
              this.cutImg.push({'link': image.replace('backend', 'http://127.0.0.1:8899'),
            'name':image.replace('backend/static/files/','')});
             
            }
          }
        });
  
    }



    stripFormValue(formValue: any){
      if (formValue == 'None'){
        return null;
      }else {

        return formValue
      }

    }


  navigateBack() {
    this.authservice.reload();
  }

  selectFile(event:any) {
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

}


