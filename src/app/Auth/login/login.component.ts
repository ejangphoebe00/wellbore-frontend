import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
      UserEmailAddress: new FormControl(),
      Password: new FormControl()
    });
  }

  loginProcess() {
    if (this.formGroup.valid) {
      localStorage.setItem("Email", this.formGroup.value.UserEmailAddress);
      this.authservice.Login(this.formGroup.value).subscribe(result => {

        if (result.message == "Login Successful") {
          this.title = result.access_token;
          console.log(result)
          console.log(result.access_token);
          localStorage.setItem("role", result.user_role);
          localStorage.setItem("user-id", result.CraneUserId);
          localStorage.setItem("token", this.title);
          this.authservice.loginSucess()
          setTimeout(() => {
            this.router.navigate(['/samples']);
          }, 1000);
        } else {
          this.authservice.loginFaliure()
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
    else {
      console.log("form fields invalid")
    }
  }

  recover() {
    console.log("test recovery")
    this.router.navigate(['/recovery']);
  }

}
