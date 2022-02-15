import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from "angular-datatables";
import { ToastrModule } from 'ngx-toastr';
import { NgPopupsModule } from 'ng-popups';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { NgxUploaderModule } from 'ngx-uploader';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsModule } from 'ng2-charts';
import {IvyGalleryModule} from 'angular-gallery';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Auth/login/login.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { AddUsersComponent } from './Pages/Users/add-users/add-users.component';
import { TokenInterceptorService } from './Interceptor/token-interceptor.service';
import { AddwebSecurityComponent } from './Pages/Web-security/addweb-security/addweb-security.component';
import { WebSecurityLevelsComponent } from './Pages/Web-security/web-security-levels/web-security-levels.component';
import { UserLogsComponent } from './Pages/Users/user-logs/user-logs.component';
import { UsersListComponent } from './Pages/Users/users-list/users-list.component';
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
// import { ViewStratLithoUnitComponent } from './Pages/StratLithoUnit/view-strat-litho-unit/view-strat-litho-unit.component';
import { WellsComponent } from './Pages/Wellbore-core-/wells/wells.component';
import { CoreCatalogsComponent } from './Pages/Core-catalog/core-catalogs/core-catalogs.component';
import { UpdatePasswordComponent } from './Auth/update-password/update-password.component';
import { KfdaComponent } from './Pages/Wellbores-/kfda/kfda.component';
import { TdaComponent } from './Pages/Wellbores-/tda/tda.component';
import { DormantComponent } from './Pages/Users/dormant/dormant.component';
import { ViewStratLithoComponent } from './Pages/StratLithoUnit/view-strat-litho/view-strat-litho.component';
import { AddCoresComponent } from './Pages/Cores/add-cores/add-cores.component';
import { CoresListComponent } from './Pages/Cores/cores-list/cores-list.component';
import { AddFluidsComponent } from './Pages/Fluids/add-fluids/add-fluids.component';
import { FluidsListComponent } from './Pages/Fluids/fluids-list/fluids-list.component';
import { AddCuttingsComponent } from './Pages/Cuttings/add-cuttings/add-cuttings.component';
import { CuttingsListComponent } from './Pages/Cuttings/cuttings-list/cuttings-list.component';
import { AddRockSampleComponent } from './Pages/Rocks/add-rock-sample/add-rock-sample.component';
import { RocksListComponent } from './Pages/Rocks/rocks-list/rocks-list.component';
import { StatGraphsComponent } from './Pages/Statistics/stat-graphs/stat-graphs.component';
import { GalleryComponent } from './gal/gallery/gallery.component';
import { LightboxModule } from 'ngx-lightbox';
import { GalleryModule } from '@ngx-gallery/core';
import { FileSaverModule } from 'ngx-filesaver';
import { NgImageSliderModule } from 'ng-image-slider';
import { RecoverPasswordComponent } from './password/recover-password/recover-password.component';

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
    // ViewStratLithoUnitComponent,
    WellsComponent,
    CoreCatalogsComponent,
    UpdatePasswordComponent,
    KfdaComponent,
    TdaComponent,
    DormantComponent,
    ViewStratLithoComponent,
    AddCoresComponent,
    CoresListComponent,
    AddFluidsComponent,
    FluidsListComponent,
    AddCuttingsComponent,
    CuttingsListComponent,
    AddRockSampleComponent,
    RocksListComponent,
    StatGraphsComponent,
    GalleryComponent,
    RecoverPasswordComponent,
  ],
  imports: [
    BrowserModule,
    DataTablesModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgPopupsModule.forRoot(),
    ToastrModule.forRoot(),
    AngularFileUploaderModule,
    NgxChartsModule,
    NgxUploaderModule,
    MatIconModule,    //*FAB Button
    MatButtonModule, //*FAB Button
    ChartsModule,
    IvyGalleryModule,
    GalleryModule,
    LightboxModule,
    FileSaverModule,
    NgImageSliderModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],

  bootstrap: [AppComponent]
})
export class AppModule { }
