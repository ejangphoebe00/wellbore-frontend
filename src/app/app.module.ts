import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from "angular-datatables";
import { ToastrModule } from 'ngx-toastr';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Auth/login/login.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { AddUsersComponent } from './Pages/add-users/add-users.component';
import { TokenInterceptorService } from './Interceptor/token-interceptor.service';
import { AddwebSecurityComponent } from './Pages/addweb-security/addweb-security.component';
import { WebSecurityLevelsComponent } from './Pages/web-security-levels/web-security-levels.component';
import { StratLithoUnitComponent } from './StratLithoUnit/strat-litho-unit/strat-litho-unit.component';
import { CoreTypesComponent } from './CoreTypes/core-types/core-types.component';
import { UserLogsComponent } from './user-logs/user-logs.component';
import { UsersListComponent } from './Pages/users-list/users-list.component';
import { AddCompanyComponent } from './Company/add-company/add-company.component';
import { ViewCompaniesComponent } from './Company/view-companies/view-companies.component';
import { CatalogSecurityComponent } from './CatalogSecurity/catalog-security/catalog-security.component';
import { ViewCatalogueSecurityLevelsComponent } from './CatalogSecurity/view-catalogue-security-levels/view-catalogue-security-levels.component';
import { ViewStratLithoUnitComponent } from './StratLithoUnit/view-strat-litho-unit/view-strat-litho-unit.component';
import { ViewCoreTypeComponent } from './CoreTypes/view-core-type/view-core-type.component';
import { BaseComponent } from './base/base.component';
// import { CompanyDetailsComponent } from './Company/company-details/company-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AddUsersComponent,
    AddwebSecurityComponent,
    ViewCompaniesComponent,
    WebSecurityLevelsComponent,
    AddCompanyComponent,
    CatalogSecurityComponent,
    ViewCatalogueSecurityLevelsComponent,
    StratLithoUnitComponent,
    CoreTypesComponent,
    UserLogsComponent,
    UsersListComponent,
    ViewStratLithoUnitComponent,
    ViewCoreTypeComponent,
    BaseComponent,
    // CompanyDetailsComponent,

  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],

  bootstrap: [AppComponent]
})
export class AppModule { }
