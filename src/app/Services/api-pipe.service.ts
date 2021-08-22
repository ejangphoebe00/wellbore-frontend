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

  checkLoginStatus(){
    if (this.getToken()!= null) {
      this.router.navigate(['/dashboard']);
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
  
  getUserId() {
    return localStorage.getItem("user-id")
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

  switchSucess() {
    this.toastr.success("Successfully Logged Out to switch", "Login with new account details", {
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

  switchAccounts() {
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
    this.switchSucess();
  }

  adddWellbore(data: any): Observable<any> {
    console.log("add user")
    return this.http.post('http://127.0.0.1:8899/apiv1/add_wellbore', data)
  }

  updateWellbore(data: any): Observable<any> {
    console.log("update Security")
    return this.http.put('http://127.0.0.1:8899/apiv1/edit_wellbore/'+this.getUpdateId(), data)

  }

  updatePassword(data: any): Observable<any> {
    console.log("update Security")
    return this.http.put('http://127.0.0.1:8899/user/edit_profile/'+this.getUserId(), data)
  }

  updateFileGrades(data: any): Observable<any> {
    console.log("update Security")
    return this.http.put('http://127.0.0.1:8899/apiv1/edit_file_format/'+this.getUpdateId(), data)
  }

  updateSecurityGrade(data: any): Observable<any> {
    console.log("update Security")
    return this.http.put('http://127.0.0.1:8899/apiv1/edit_file_security_grade/'+this.getUpdateId(), data)
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

  updateWellboreCore(data: any): Observable<any> {
    console.log("updatewellborecore")
    return this.http.put('http://127.0.0.1:8899/apiv1/edit_welbore_core/'+this.getUpdateId(), data)
  }

  updateCoreCatalog(data: any): Observable<any> {
    console.log("updatewellborecore")
    return this.http.put('http://127.0.0.1:8899/apiv1/edit_core_catalog/'+this.getUpdateId(), data)
  }

  getWelboreIds(): Observable<any> {
    console.log("Retrieved Ids")
    return this.http.get('http://127.0.0.1:8899/apiv1/get_wellbore')
  }

  getwellboreCores(): Observable<any> {
    console.log("Wellbore Cores")
    return this.http.get('http://127.0.0.1:8899/apiv1/get_welbore_cores')
  }

  getCatalogList(): Observable<any> {
    console.log("Catalog List")
    return this.http.get('http://127.0.0.1:8899/apiv1/get_core_catalogs')
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

  getKdaWellbores(): Observable<any> {
    console.log("get kda")
    return this.http.get('http://127.0.0.1:8899/apiv1/get_kfda_welbores')
  }

 getTdaWellbores(): Observable<any> {
    console.log("get Tda")
    return this.http.get('http://127.0.0.1:8899/apiv1/get_tda_welbores')
  }

  updateWebSecurity(data: any): Observable<any> {
    console.log("update Security")
    return this.http.put('http://127.0.0.1:8899/apiv1/edit_web_security_level/' + this.getUpdateId(), data)

  }

  getSpecificData(): Observable<any> {
    console.log("update Security")
    return this.http.get('http://127.0.0.1:8899/apiv1/edit_web_security_level/' + this.getUpdateId())

  }


  // COMPANY

  addCompany(data:any): Observable<any>{
    console.log("add company")
    return this.httpClient.post('http://127.0.0.1:8899/apiv1/add_company', data)
  }

  editCompany(data:any): Observable<any>{
    console.log("edit company")
    return this.httpClient.put('http://127.0.0.1:8899/apiv1/edit_company/${company}', data)
  }

  getAllCompanies(): Observable<any>{
    console.log("get Companies")
    return this.httpClient.get('http://127.0.0.1:8899/apiv1/get_companies')
      // .catch(ApiPipeService._handleError)
  }

  // deleteCompany(company:any): Observable<any>{
  //   console.log("deleted company")
  //   return this.httpClient.delete('http://127.0.0.1:8899/apiv1/delete_company/${company}')
  // }


  companyStatus(){
    this.toastr.success("add company failed. Try Again","",{
      timeOut: 2000,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation:'decreasing'
    })
  }

  companyStatusUpdate() {
    this.toastr.error("updating company failed. Try Again", "", {
      timeOut: 2000,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation: 'decreasing'
    })
  }

  // CATALOG SECURITY

  addCatalogSecurityFlag(data:any): Observable<any>{
    console.log("added catalog security flag")
    return this.httpClient.post('http://127.0.0.1:8899/apiv1/add_catalog_security_flag', data)
  }

  editCatalogSecurity(data:any): Observable<any>{
    console.log("edited catalog security flag")
    return this.httpClient.put('http://127.0.0.1:8899/apiv1/edit_catalog_security_flag/?id=${CatalogSecurityFlag_id}', data)
  }

  getAllCatalogSecurityFlags(): Observable<any>{
    console.log("getting all catalog security flags")
    return this.httpClient.get('http://127.0.0.1:8899/apiv1/get_catalog_security_flags')
  }

  // deleteCatalogSecurityFlag(id:any): Observable<any>{
  //   console.log("deleted catalog security flag")
  //   return this.httpClient.delete('http://127.0.0.1:8899/apiv1/delete_catalog_security_flag/?id=${CatalogSecurityFlag_id}')
  // }

  catalogSecurityStatus(){
    this.toastr.success("adding catalog security failed. Try Again","",{
      timeOut: 2000,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation:'decreasing'
    })
  }

  catalogSecurityStatusUpdate() {
    this.toastr.error("updating catalog security failed. Try Again", "", {
      timeOut: 2000,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation: 'decreasing'
    })
  }

  // STRAT-LITHO-UNIT

  addStratLithoUnit(data:any): Observable<any>{
    console.log("added strat-litho-unit")
    return this.httpClient.post('http://127.0.0.1:8899/apiv1/add_strat_litho_unit', data)
  }

  editStratLithoUnit(data:any): Observable<any>{
    console.log("edited strat-litho-unit")
    return this.httpClient.put('http://127.0.0.1:8899/apiv1/edit_strat_litho_unit/${StratLitho_id}', data)
  }

  getAllStratLithoUnits(): Observable<any>{
    console.log("getting all strat-litho-units")
    return this.httpClient.get('http://127.0.0.1:8899/apiv1/get_strat_litho_units')
  }

  // deleteStratLithoUnit(stratlitho_id:any): Observable<any>{
  //   console.log("deleted strat-litho-unit")
  //   return this.httpClient.delete('http://127.0.0.1:8899/apiv1/delete_strat_litho_unit/${id}')
  // }


  stratLithoStatus(){
    this.toastr.success("add strato litho failed. Try Again","",{
      timeOut: 2000,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation:'decreasing'
    })
  }

  stratLithoStatusUpdate() {
    this.toastr.error("updating strato litho failed. Try Again", "", {
      timeOut: 2000,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation: 'decreasing'
    })
  }

  // CORE TYPES

  addCoreType(data:any): Observable<any>{
    console.log("added core type")
    return this.httpClient.post('http://127.0.0.1:8899/apiv1/add_core_type', data)
  }

  editCoreType(data:any): Observable<any>{
    console.log("edited core type")
    return this.httpClient.put('http://127.0.0.1:8899/apiv1/edit_core_type/${CoreType_id}', data)
  }

  getAllCoreTypes(): Observable<any>{
    console.log("getting all coretypes")
    return this.httpClient.get('http://127.0.0.1:8899/apiv1/get_core_types')
  }

  // deleteCoreTypes(CoreType_id:any): Observable<any>{
  //   console.log("deleted core types")
  //   return this.httpClient.delete('http://127.0.0.1:8899/apiv1/delete_core_type/${CoreType_id}')
  // }

  coreTypesStatus(){
    this.toastr.success("adding catalog security failed. Try Again","",{
      timeOut: 2000,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation:'decreasing'
    })
  }

  coreTypeStatusUpdate() {
    this.toastr.error("updating catalog security failed. Try Again", "", {
      timeOut: 2000,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation: 'decreasing'
    })
  }

  addCoreCatalog(data:any): Observable<any>{
    console.log("added catalog security flag")
    return this.httpClient.post('http://127.0.0.1:8899/apiv1/add_core_catalog', data)
  }

  stripFormValue(formValue: any){
    if (formValue == 'None'){
      return null;
    }else {

      return formValue
    }

  } 




}
