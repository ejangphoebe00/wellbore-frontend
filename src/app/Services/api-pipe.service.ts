import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
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
