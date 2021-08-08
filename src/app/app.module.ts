import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from "angular-datatables";
import { ToastrModule } from 'ngx-toastr';
import { NgPopupsModule } from 'ng-popups';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Auth/login/login.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { AddUsersComponent } from './Pages/add-users/add-users.component';
import { TokenInterceptorService } from './Interceptor/token-interceptor.service';
import { AddwebSecurityComponent } from './Pages/Web-security/addweb-security/addweb-security.component';
import { WebSecurityLevelsComponent } from './Pages/Web-security/web-security-levels/web-security-levels.component';
import { UserLogsComponent } from './user-logs/user-logs.component';
import { UsersListComponent } from './Pages/users-list/users-list.component';
// import { CdComponent } from './Pages/cd/cd.component';
import { AddWellboreComponent } from './Pages/Wellbores-/add-wellbore/add-wellbore.component';
import { AddFileFormatsComponent } from './Pages/File-format/add-file-formats/add-file-formats.component';
import { AddFileSecurityGradeComponent } from './Pages/File-security/add-file-security-grade/add-file-security-grade.component';
import { WellboreCoreComponent } from './Pages/Wellbore-core-/wellbore-core/wellbore-core.component';
import { AddCoreCatalogComponent } from './Pages/Core-catalog/add-core-catalog/add-core-catalog.component';
import { WellboresComponent } from './Pages/Wellbores-/wellbores/wellbores.component';
import { FileFormatsComponent } from './Pages/File-format/file-formats/file-formats.component';
import { FileSecurityGradesComponent } from './Pages/File-security/file-security-grades/file-security-grades.component';
import { BaseComponent } from './base/base.component';
import { CoreTypesComponent } from './Pages/CoreTypes/core-types/core-types.component';
import { ViewCoreTypeComponent } from './Pages/CoreTypes/view-core-type/view-core-type.component';
import { AddCompanyComponent } from './Pages/Company/add-company/add-company.component';
import { ViewCompaniesComponent } from './Pages/Company/view-companies/view-companies.component';
import { CatalogSecurityComponent } from './Pages/CatalogSecurity/catalog-security/catalog-security.component';
import { ViewCatalogueSecurityLevelsComponent } from './Pages/CatalogSecurity/view-catalogue-security-levels/view-catalogue-security-levels.component';
import { StratLithoUnitComponent } from './Pages/StratLithoUnit/strat-litho-unit/strat-litho-unit.component';
import { ViewStratLithoUnitComponent } from './Pages/StratLithoUnit/view-strat-litho-unit/view-strat-litho-unit.component';
import { WellsComponent } from './Pages/Wellbore-core-/wells/wells.component';
import { CoreCatalogsComponent } from './Pages/Core-catalog/core-catalogs/core-catalogs.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AddUsersComponent,
    AddwebSecurityComponent,
    WebSecurityLevelsComponent,
    UserLogsComponent,
    UsersListComponent,
    AddWellboreComponent,
    AddFileFormatsComponent,
    AddFileSecurityGradeComponent,
    WellboreCoreComponent,
    AddCoreCatalogComponent,
    WellboresComponent,
    FileFormatsComponent,
    FileSecurityGradesComponent,
    BaseComponent,
    CoreTypesComponent,
    ViewCoreTypeComponent,
    AddCompanyComponent,
    ViewCompaniesComponent,
    CatalogSecurityComponent,
    ViewCatalogueSecurityLevelsComponent,
    StratLithoUnitComponent,
    ViewStratLithoUnitComponent,
    WellsComponent,
    CoreCatalogsComponent,
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgPopupsModule.forRoot(),
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
