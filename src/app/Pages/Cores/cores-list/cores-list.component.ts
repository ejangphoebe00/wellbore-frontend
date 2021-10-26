import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { NgPopupsService } from 'ng-popups';
import {Gallery} from 'angular-gallery';



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
  ims:any;
 
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
      private gallery: Gallery

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

    showGallery(index: number) {
      this.authservice
      .getCores()
      .subscribe((response: any) => {
        this.users = response
        // this.users.forEach((e: { Core_photographs: any; }) => {
        //   this.ims.push({
        //     path: e.Core_photographs,
           
        //   })
        // })
        console.log('all Imagess')
        for (var product of response) {
          console.log(product.Core_photograph)
          // this.ims = product.Core_photograph
          // console.log((this.ims).length)

     }

        let prop = {
          images: [
             {path: 'data:image/jpeg;base64,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'},
              {path: 'data:image/jpeg;base64,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'},
              {path: 'https://cdn01.alison-static.net/courses/2735/alison_courseware_intro_2735.jpg'},
              {path: 'data:image/jpeg;base64,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'}
          ],
          index 
      };
      this.gallery.load(prop);

      });
    

     
     
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

