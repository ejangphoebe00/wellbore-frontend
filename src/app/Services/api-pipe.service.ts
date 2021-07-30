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
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) { }

  viewingStatus() {
    if (this.getToken() == null) {
      this.router.navigate(['/login']);
    }
  }

  getToken() {
    return localStorage.getItem("token")
  }

  getRole() {
    return localStorage.getItem("role")
  }

  getUpdateId() {
    return localStorage.getItem("update-id")
  }

  getEmail() {
    return localStorage.getItem("Email")
  }


  Login(data: any): Observable<any> {
    console.log("i am server")
    return this.http.post('http://127.0.0.1:8899/user/login', data)
  }

  logOutSucess() {
    this.toastr.success("Successfully Logged Out", "", {
      timeOut: 2000,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation: 'increasing'
    })
  }


  loginSucess() {
    this.toastr.success("Successfully Logged In", "", {
      timeOut: 2000,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation: 'increasing'
    })
  }

  loginFaliure() {
    this.toastr.error("Wrong Email Or Password", "", {
      timeOut: 2000,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation: 'decreasing'
    })
  }

  reload() {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }
  }

  logoutuser() {
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
    this.logOutSucess();
  }

  adddWellbore(data: any): Observable<any> {
    console.log("add user")
    return this.http.post('http://127.0.0.1:8899/apiv1/add_wellbore', data)
  }

  addSecurityGrade(data: any): Observable<any> {
    console.log("add security grade")
    return this.http.post('http://127.0.0.1:8899/apiv1/add_file_security_grade', data)
  }

  addFileGrades(data: any): Observable<any> {
    console.log("add security grade")
    return this.http.post('http://127.0.0.1:8899/apiv1/add_file_format', data)
  }

  adddWellboreCore(data: any): Observable<any> {
    console.log("add user")
    return this.http.post('http://127.0.0.1:8899/apiv1/add_welbore_core', data)
  }

  getWelboreIds(): Observable<any> {
    console.log("Retrieved Ids")
    return this.http.get('http://127.0.0.1:8899/apiv1/get_wellbore')
  }

  getCoreReportSecurity(): Observable<any> {
    console.log(" Retrieved Reports")
    return this.http.get('http://127.0.0.1:8899/apiv1/get_file_security_grades')
  }

  getFormat(): Observable<any> {
    console.log(" Retrieved Formats")
    return this.http.get('http://127.0.0.1:8899/apiv1/get_file_formats')
  }

  getCompanies(): Observable<any> {
    console.log(" Retrieved companies")
    return this.http.get('http://127.0.0.1:8899/apiv1/get_companies')
  }

  getStrat():Observable<any>{
    console.log(" Retrieved strats")
    return this.http.get('http://127.0.0.1:8899/apiv1/get_strat_litho_units')
  }





  wellboreFaliure() {
    this.toastr.error("Adding a user failed please Try Again", "", {
      timeOut: 2000,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation: 'decreasing'
    })
  }


  addWebSecurity(data: any): Observable<any> {
    console.log("add security")
    return this.http.post('http://127.0.0.1:8899/apiv1/add_web_security_level', data)
  }

  securityStatus() {
    this.toastr.error("add web security failed. Try Again", "", {
      timeOut: 2000,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation: 'decreasing'
    })
  }

  securityStatusUpdate() {
    this.toastr.error("updating web security failed. Try Again", "", {
      timeOut: 2000,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation: 'decreasing'
    })
  }


  getSecurity(): Observable<any> {
    console.log("get Security")
    return this.http.get('http://127.0.0.1:8899/apiv1/get_web_security_level')
  }

  getLogs(): Observable<any> {
    console.log("get Logs")
    return this.http.get('http://127.0.0.1:8899/user/get_users_logs')
  }

  getAllUsers(): Observable<any> {
    console.log("get Logs")
    return this.http.get('http://127.0.0.1:8899/user/get_users')
  }

  updateWebSecurity(data: any): Observable<any> {
    console.log("update Security")
    return this.http.put('http://127.0.0.1:8899/apiv1/edit_web_security_level/' + this.getUpdateId(), data)

  }


}
