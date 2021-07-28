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
    private httpClient:HttpClient,
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
    return this.httpClient.post('http://127.0.0.1:8899/user/login',data)
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
    return this.httpClient.post('http://127.0.0.1:8899/apiv1/add_web_security_level',data)
  }

  securityStatus(){
    this.toastr.error("add web security failed. Try Again","",{
      timeOut: 2000,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation:'decreasing'
    })
  }

  getSecurity(): Observable<any>{
    console.log("get Security")
    return this.httpClient.get('http://127.0.0.1:8899/apiv1/get_web_security_level')
  }

  getLogs(): Observable<any>{
    console.log("get Logs")
    return this.httpClient.get('http://127.0.0.1:8899/user/get_users_logs')
  }

  getAllUsers(): Observable<any>{
    console.log("get Logs")
    return this.httpClient.get('http://127.0.0.1:8899/user/get_users')
  }

  // COMPANY

  addCompany(data:any): Observable<any>{
    console.log("add company")
    return this.httpClient.post('http://127.0.0.1:8899/apiv1/add_company', data)
  }
  editCompany(company:any, data:any): Observable<any>{
    console.log("edit company")
    return this.httpClient.put('http://127.0.0.1:8899/apiv1/edit_company/${company}', data)
  }
  getAllCompanies(): Observable<any>{
    console.log("get Companies")
    return this.httpClient.get('http://127.0.0.1:8899/apiv1/get_companies')
  }
  getCompany(company:any): Observable<any>{
    console.log("get Company")
    return this.httpClient.get('http://127.0.0.1:8899/apiv1/get_company/${company}')
  }
  deleteCompany(company:any): Observable<any>{
    console.log("deleted company")
    return this.httpClient.delete('http://127.0.0.1:8899/apiv1/delete_company/${company}')
  }
  searchByName(name:any): Observable<any>{
    return this.httpClient.get('http://127.0.0.1:8899/apiv1/get_company/?name=${company.companyShortName}')
  }
  companyStatus(){
    this.toastr.error("add company failed. Try Again","",{
      timeOut: 2000,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation:'decreasing'
    })
  }

}
