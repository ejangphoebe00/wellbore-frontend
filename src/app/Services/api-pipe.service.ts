import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiPipeService {

  constructor(
    private http:HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) { }

  viewingStatus(){
    if(this.getToken()== null){
      this.router.navigate(['/login']);
    }
  }

  getToken(){
    return localStorage.getItem("token")
  }

  Login(data: any): Observable<any>{
    console.log("i am server")
    return this.http.post('http://127.0.0.1:8899/user/login',data)
  }

  loginSucess(){
    this.toastr.success("Successfully Logged In", "",{
      timeOut: 2000,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation:'increasing'
    })
  }

  loginFaliure(){
    this.toastr.error("Wrong Email Or Password","",{
      timeOut: 2000,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation:'decreasing'
    })
  }




}
