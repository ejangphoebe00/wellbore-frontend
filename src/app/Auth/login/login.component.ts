import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiPipeService } from 'src/app/Services/api-pipe.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  title!: string;
  constructor(
    private authservice: ApiPipeService,
    private router: Router
  ) { }

  ngOnInit(): void {
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
      this.authservice.Login(this.formGroup.value).subscribe(result => {

        if (result.message == "Login Successful") {
          this.title = result.access_token;
          console.log(result)
          console.log(result.access_token);
          localStorage.setItem("role",result.user_role);
          localStorage.setItem("token", this.title);
          localStorage.setItem("Email", this.formGroup.value.Email);
          this.authservice.loginSucess()
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1000);
        } else {
          this.authservice.loginFaliure()
        }
      }, error => {
        console.log('oops', error)
        if (error) {
          this.authservice.loginFaliure()
        }
      }

      )
    }
  }

}
