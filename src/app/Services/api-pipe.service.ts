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

  getAllGrades(): Observable<any> {
    console.log("get security grades")
    return this.http.get('http://127.0.0.1:8899/apiv1/get_file_security_grades')
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

  addStratLitho(data:any): Observable<any>{
    console.log("add strat")
    return this.http.post('http://127.0.0.1:8899/apiv1/add_strat_litho_unit',data)
  }

  getWellboreCores(): Observable<any>{
    console.log("add user")
    return this.http.get('http://127.0.0.1:8899/apiv1/get_welbore_cores')
  }

  getWebSeurityId(): Observable<any>{
    console.log("add user")
    return this.http.get('http://127.0.0.1:8899/apiv1/get_web_security_level')
  }
  
  addUser(data:any): Observable<any>{
    console.log("add user")
    return this.http.post('http://127.0.0.1:8899/user/registration',data)
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

  // getAllCompanies(): Observable<any> {
  //   console.log("get Logs")
  //   return this.http.get('http://127.0.0.1:8899/apiv1/get_companies')
  // }

  getAllformats(): Observable<any> {
    console.log("get Logs")
    return this.http.get('http://127.0.0.1:8899/apiv1/get_file_formats')
  }

  

  getWellbores(): Observable<any> {
    console.log("get Logs")
    return this.http.get('http://127.0.0.1:8899/apiv1/get_wellbore')
  }

  updateWebSecurity(data: any): Observable<any> {
    console.log("update Security")
    return this.http.put('http://127.0.0.1:8899/apiv1/edit_web_security_level/' + this.getUpdateId(), data)

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
      // .catch(ApiPipeService._handleError)
  }

  deleteCompany(company:any): Observable<any>{
    console.log("deleted company")
    return this.httpClient.delete('http://127.0.0.1:8899/apiv1/delete_company/${company}')
  }

  searchByName(name:any): Observable<any>{
    return this.httpClient.get('http://127.0.0.1:8899/apiv1/get_company/?name=${company.companyLongName}')
  }

  companyStatus(){
    this.toastr.success("add company added","",{
      timeOut: 2000,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation:'decreasing'
    })
  }

  // CATALOG SECURITY

  addCatalogSecurityFlag(data:any): Observable<any>{
    console.log("added catalog security flag")
    return this.httpClient.post('http://127.0.0.1:8899/apiv1/add_catalog_security_flag', data)
  }

  editCatalogSecurity(id:any, data:any): Observable<any>{
    console.log("edited catalog security flag")
    return this.httpClient.put('http://127.0.0.1:8899/apiv1/edit_catalog_security_flag/?id=${CatalogSecurityFlag_id}', data)
  }

  getAllCatalogSecurityFlags(): Observable<any>{
    console.log("getting all catalog security flags")
    return this.httpClient.get('http://127.0.0.1:8899/apiv1/get_all_catalog_security_flags')
  }

  deleteCatalogSecurityFlag(id:any): Observable<any>{
    console.log("deleted catalog security flag")
    return this.httpClient.delete('http://127.0.0.1:8899/apiv1/delete_catalog_security_flag/?id=${CatalogSecurityFlag_id}')
  }

  // STRAT-LITHO-UNIT

  addStratLithoUnit(data:any): Observable<any>{
    console.log("added strat-litho-unit")
    return this.httpClient.post('http://127.0.0.1:8899/apiv1/add_strat_litho_unit', data)
  }

  editStratLithoUnit(Stratlitho_id:any, data:any): Observable<any>{
    console.log("edited strat-litho-unit")
    return this.httpClient.put('http://127.0.0.1:8899/apiv1/edit_strat_litho_unit/${StratLitho_id}', data)
  }

  getAllStratLithoUnits(): Observable<any>{
    console.log("getting all strat-litho-units")
    return this.httpClient.get('http://127.0.0.1:8899/apiv1/get_strat_litho_units')
  }

  deleteStratLithoUnit(stratlitho_id:any): Observable<any>{
    console.log("deleted catalog security flag")
    return this.httpClient.delete('http://127.0.0.1:8899/apiv1/delete_strat_litho_unit/${stratlitho_id}')
  }

  // CORE TYPES

  addCoreType(data:any): Observable<any>{
    console.log("added core type")
    return this.httpClient.post('http://127.0.0.1:8899/apiv1/add_core_type', data)
  }

  editCoreType(CoreType_id:any, data:any): Observable<any>{
    console.log("edited core type")
    return this.httpClient.put('http://127.0.0.1:8899/apiv1/edit_core_type/${CoreType_id}', data)
  }

  getAllCoreTypes(): Observable<any>{
    console.log("getting all coretypes")
    return this.httpClient.get('http://127.0.0.1:8899/apiv1/get_core_types')
  }

  deleteCoreTypes(CoreType_id:any): Observable<any>{
    console.log("deleted core types")
    return this.httpClient.delete('http://127.0.0.1:8899/apiv1/delete_core_type/${CoreType_id}')
  }



}
