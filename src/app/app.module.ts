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
import { UserLogsComponent } from './user-logs/user-logs.component';
import { UsersListComponent } from './Pages/users-list/users-list.component';
import { CdComponent } from './Pages/cd/cd.component';
import { AddWellboreComponent } from './Pages/add-wellbore/add-wellbore.component';
import { AddFileFormatsComponent } from './Pages/add-file-formats/add-file-formats.component';
import { AddFileSecurityGradeComponent } from './Pages/add-file-security-grade/add-file-security-grade.component';
import { WellboreCoreComponent } from './Pages/wellbore-core/wellbore-core.component';
import { AddCoreCatalogComponent } from './Pages/add-core-catalog/add-core-catalog.component';

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
    CdComponent,
    AddWellboreComponent,
    AddFileFormatsComponent,
    AddFileSecurityGradeComponent,
    WellboreCoreComponent,
    AddCoreCatalogComponent
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
