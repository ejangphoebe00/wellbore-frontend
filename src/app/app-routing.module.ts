import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';

import { LoginComponent } from './Auth/login/login.component';
import { AddUsersComponent } from './Pages/add-users/add-users.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { AddwebSecurityComponent } from './Pages/addweb-security/addweb-security.component';
import { WebSecurityLevelsComponent } from './Pages/web-security-levels/web-security-levels.component';
import { UserLogsComponent } from './user-logs/user-logs.component';
import { UsersListComponent } from './Pages/users-list/users-list.component';
import { AddWellboreComponent } from './Pages/add-wellbore/add-wellbore.component';
import { AddFileFormatsComponent } from './Pages/add-file-formats/add-file-formats.component';
import { AddFileSecurityGradeComponent } from './Pages/add-file-security-grade/add-file-security-grade.component';
import { WellboreCoreComponent } from './Pages/wellbore-core/wellbore-core.component';
import { AddCoreCatalogComponent } from './Pages/add-core-catalog/add-core-catalog.component';
import { WellboresComponent } from './Pages/wellbores/wellbores.component';
import { FileFormatsComponent } from './Pages/file-formats/file-formats.component';
import { FileSecurityGradesComponent } from './Pages/file-security-grades/file-security-grades.component';
import { CoreTypesComponent } from './Pages/CoreTypes/core-types/core-types.component';
import { ViewCoreTypeComponent } from './Pages/CoreTypes/view-core-type/view-core-type.component';
import { AddCompanyComponent } from './Pages/Company/add-company/add-company.component';
import { ViewCompaniesComponent } from './Pages/Company/view-companies/view-companies.component';
import { CompanyDetailsComponent } from './Pages/Company/company-details/company-details.component';
import { CatalogSecurityComponent } from './Pages/CatalogSecurity/catalog-security/catalog-security.component';
import { ViewCatalogueSecurityLevelsComponent } from './Pages/CatalogSecurity/view-catalogue-security-levels/view-catalogue-security-levels.component';
import { StratLithoUnitComponent } from './Pages/StratLithoUnit/strat-litho-unit/strat-litho-unit.component';
import { ViewStratLithoUnitComponent } from './Pages/StratLithoUnit/view-strat-litho-unit/view-strat-litho-unit.component';
import { WellsComponent } from './Pages/wells/wells.component';
import { CoreCatalogsComponent } from './Pages/core-catalogs/core-catalogs.component';





const routes: Routes = [
  {path: 'dashboard', component: BaseComponent,
  children: [
  {path: 'add-users', component: AddUsersComponent},
  // {path: 'dashboard', component: DashboardComponent},
  {path: '', component: DashboardComponent},
  {path: 'add-web-security', component:  AddwebSecurityComponent},
  {path: 'web-security-levels', component:WebSecurityLevelsComponent},
  {path: 'user-logs', component:UserLogsComponent},  
  {path: 'users', component:UsersListComponent},  
  {path: 'add-wellbore', component:AddWellboreComponent}, 
  {path: 'add-file-formats', component:AddFileFormatsComponent}, 
  {path: 'add-file-grades', component:AddFileSecurityGradeComponent}, 
  {path: 'add-wellbore-core', component:WellboreCoreComponent}, 
  {path: 'add-core-catalog', component:AddCoreCatalogComponent}, 
  {path: 'file-formats', component: FileFormatsComponent},  
  {path: 'file-security', component: FileSecurityGradesComponent},  
  {path: 'wellbores', component:WellboresComponent}, 
  {path: 'core-types', component: CoreTypesComponent},
  {path: 'view-core-type', component: ViewCoreTypeComponent},
  {path: 'add-company', component: AddCompanyComponent},
  {path: 'view-companies', component: ViewCompaniesComponent},
  {path: 'company/:id', component: CompanyDetailsComponent},
  {path: 'catalog-security', component: CatalogSecurityComponent},
  {path: 'view-catalog-security', component: ViewCatalogueSecurityLevelsComponent},
  {path: 'strat-litho-unit', component: StratLithoUnitComponent},
  {path: 'view-strat-litho-unit', component: ViewStratLithoUnitComponent},
  {path: 'wells', component: WellsComponent}, 
  {path: 'CoreCatalogs', component:  CoreCatalogsComponent},
  
]
},

 
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent, pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
