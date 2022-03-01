import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  formGroup!: FormGroup;
  title!: string;
  date: any;
  public showPassword!: boolean;
  public showPasswordOnPress!: boolean;

  constructor(
    private authservice: ApiPipeService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // this.authservice.checkLoginStatus();
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      // UserEmailAddress: new FormControl(),
      Password: new FormControl()
    });
  }

  loginProcess() {
    if (this.formGroup.valid) {
      // localStorage.setItem("Email", this.formGroup.value.UserEmailAddress);
      this.authservice.recover(this.formGroup.value).subscribe(result => {

        if (result.message == "An email has been sent with instructions to reset your password.") {
          this.toastr.success("An email has been sent with instructions to reset your password.", "", {
            timeOut: 2000,
            positionClass: 'toast-top-center',
            progressBar: true,
            progressAnimation: 'increasing'
          })
        } else {
          this.authservice.loginFaliure()
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
    else {
      console.log("form fields invalid")
    }
  }

 

}
