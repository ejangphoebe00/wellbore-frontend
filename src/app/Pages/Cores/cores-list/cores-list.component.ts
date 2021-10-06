import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { NgPopupsService } from 'ng-popups';


@Component({
  selector: 'app-cores-list',
  templateUrl: './cores-list.component.html',
  styleUrls: ['./cores-list.component.css']
})
export class CoresListComponent implements OnInit {

    //file upload
  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: any;
  fileresponse: any;
 
  selectedFiles: any;
  selectedFilesSecond: any;
  currentFile: any;
  currentFile2: any;

  // fileName = '';
  // uploadProgress:number = 0;
  // uploadSub: Subscription = any;

  

  afuConfig = {
    uploadAPI: {
      url:"http://127.0.0.1:8899/apiv1/add_file/7"
    }
};

  formGroup!: FormGroup;
  title!: string;
  wellboreIds: any;
  WBCoringContractor_id: any;
  role:any;
  userEmail: any;
  loggedin:any;
  id: any;
  deleteresp: any;
  status: boolean = true;
  editform: boolean = false;
  uploadFile: boolean = false;
  details:boolean= false;
  updatevalue: any;
  catalogs:any;

 
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

    ) { }

    ngOnInit(): void {
      
      this.getWelboreId();
      this.getWBCoringContractorId();
      this.cores();
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
        Coring_contractor:new FormControl(),
        Wellbore_id:new FormControl(),
        Core_number:new FormControl(),
        Coring_date:new FormControl(),
        Top_MD:new FormControl(),
        Bottom_MD:new FormControl(),
        Cut_length:new FormControl(),
        Percentage_recovery:new FormControl(),
        Top_formation:new FormControl(),
        Bottom_formation:new FormControl(),
        Core_analysis_reports: new FormControl(),
        Core_photograph:new FormControl(),
        fileSource: new FormControl()
      });
    }

    selectFile(event:any) {
      this.selectedFiles = event.target.files;
    }

    selectFileAgain (event:any) {
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
            console.log(response)
            this.users = response;

            this.dtTrigger.next();
          });
        }



    logout(){
      this.authservice.logoutuser()

    }




    updateCoreCatProcess(){
      console.log("tested")
      if(this.formGroup.valid){
        console.log(this.formGroup.value)
        this.authservice.updateCores(this.formGroup.value).subscribe(result =>{
          if(result.message == "Core updated successfuly."){
            this.toastr.success("Core updated successfuly.","",{
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
      this.id = selectedItem.Core_sample_id;

      this.ngPopups.confirm("Are you sure you want to delete ?",{
        // theme: 'material',
        color:'OrangeRed',
        okButtonText: 'Yes',
        cancelButtonText:'No',
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

        Coring_contractor:item.Coring_contractor,
        Wellbore_id:item.Wellbore_id,
        Core_number:item.Core_number,
        Coring_date:item.Coring_date,
        Top_MD:item.Top_MD,
        Bottom_MD:item.Bottom_MD,
        Cut_length:item.Cut_length,
        Percentage_recovery:item.Percentage_recovery,
        Top_formation:item.Top_formation,
        Bottom_formation:item.Bottom_formation
      }
    }

    onSelectEdit(selectedItem: any) {
      console.log("hide the elements");
      this.status = false;
      this.details= false;
      this.editform = true;
    }


    onFile(){
      console.log("Clicked")
      this.status = false;
      this.details= false;
      this.uploadFile = true;
    }

    captureCoreInstance(){
      this.http.get('http://127.0.0.1:8899/apiv1/get_core/' + this.id)
        .subscribe(response => {
          this.updatevalue = response;
          this.formGroup.patchValue({
            Coring_contractor:this.stripFormValue(this.updatevalue.Coring_contractor),
            Wellbore_id:this.stripFormValue(this.updatevalue.Wellbore_id),
            Core_number:this.stripFormValue(this.updatevalue.Core_number),
            Coring_date:this.stripFormValue(this.updatevalue.Coring_date),
            Top_MD:this.stripFormValue(this.updatevalue.Top_MD),
            Bottom_MD:this.stripFormValue(this.updatevalue.Bottom_MD),
            Cut_length:this.stripFormValue(this.updatevalue.Cut_length),
            Percentage_recovery:this.stripFormValue(this.updatevalue.Percentage_recovery),
            Top_formation:this.stripFormValue(this.updatevalue.Top_formation),
            Bottom_formation:this.stripFormValue(this.updatevalue.Bottom_formation) 
          });
          console.log(this.updatevalue)
        });


    }

    getWelboreId(){
      this.authservice.getWelboreIds().subscribe(res =>{
        this.wellboreIds = res;
        console.log(this.wellboreIds);
      })
    }
  
    changeContractingId(e:any) {
      console.log(e.value)
      this.WBCoringContractor_id.setValue(e.target.value, {
        onlySelf: true
      })
    }
  
    changeWellboreId(e:any) {
      console.log(e.value)
      this.wellboreIds.setValue(e.target.value, {
        onlySelf: true
      })
    }
  
    getWBCoringContractorId(){
      this.authservice.getCompanies().subscribe(res =>{
        this.WBCoringContractor_id = res;
        console.log(this.WBCoringContractor_id);
      })
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

//   onFileSelected(event: { target: { files: File[]; }; }) {
//     const file:File = event.target.files[0];
  
//     if (file) {
//         this.fileName = file.name;
//         const formData = new FormData();
//         formData.append("thumbnail", file);

//         const upload$ = this.http.post("/api/thumbnail-upload", formData, {
//             reportProgress: true,
//             observe: 'events'
//         })
//         .pipe(
//            //  finalize(() => this.reset())
//         );
      
//         this.uploadSub = upload$.subscribe(event => {
//           if (event.type == HttpEventType.UploadProgress) {
//             this.uploadProgress = Math.round(100 * (event.loaded / event.total));
//           }
//         })
//     }
// }

// }

onChange(event:any) {
  this.file = event.target.files[0];
}

// OnClick of button Upload
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

get f(){
  return this.formGroup.controls;
}

onFileChange(event:any) {
  
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.formGroup.patchValue({
      fileSource: file
    });
  }
}

submit(){
  const formData = new FormData();
  formData.append('file', this.formGroup.get('fileSource')!.value);
  console.log( this.formGroup.get('fileSource')!.value)
 
  this.http.post('http://127.0.0.1:8899/apiv1/add_file/1', formData)
    .subscribe(res => {
      console.log(res);
      alert('Uploaded Successfully.');
    })
}

}

