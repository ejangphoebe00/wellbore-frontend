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

  logOutSucess(){
    this.toastr.success("Successfully Logged Out", "",{
      timeOut: 2000,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation:'increasing'
    })
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

  reload(){
  if (!localStorage.getItem('foo')) { 
    localStorage.setItem('foo', 'no reload') 
    location.reload() 
  } else {
    localStorage.removeItem('foo') 
  }
}

logoutuser(){
   localStorage.removeItem('token') 
    this.router.navigate(['/login']);
    this.logOutSucess();
}

addWebSecurity(data:any): Observable<any>{
  console.log("add security")
  return this.http.post('http://127.0.0.1:8899/apiv1/add_web_security_level',data)
}

securityStatus(){
  this.toastr.error("add web security failed. Try Again","",{
    timeOut: 2000,
    positionClass: 'toast-top-center',
    progressBar: true,
    progressAnimation:'decreasing'
  })
}




}
