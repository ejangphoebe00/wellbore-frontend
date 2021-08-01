import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseComponent } from './base/base.component';

import { LoginComponent } from './Auth/login/login.component';
import { AddUsersComponent } from './Pages/add-users/add-users.component';
import { AddCompanyComponent } from './Company/add-company/add-company.component';
import { ViewCompaniesComponent } from './Company/view-companies/view-companies.component';
import { CompanyDetailsComponent } from './Company/company-details/company-details.component';
import { CatalogSecurityComponent } from './CatalogSecurity/catalog-security/catalog-security.component';
import { ViewCatalogueSecurityLevelsComponent} from './CatalogSecurity/view-catalogue-security-levels/view-catalogue-security-levels.component';
import { StratLithoUnitComponent } from './StratLithoUnit/strat-litho-unit/strat-litho-unit.component';
import { ViewStratLithoUnitComponent } from './StratLithoUnit/view-strat-litho-unit/view-strat-litho-unit.component';
import { CoreTypesComponent } from './CoreTypes/core-types/core-types.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { AddwebSecurityComponent } from './Pages/addweb-security/addweb-security.component';
import { WebSecurityLevelsComponent } from './Pages/web-security-levels/web-security-levels.component';
import { UserLogsComponent } from './user-logs/user-logs.component';
import { UsersListComponent } from './Pages/users-list/users-list.component';
import { ViewCoreTypeComponent } from './CoreTypes/view-core-type/view-core-type.component';

const routes: Routes = [
  {path: 'dashboard', component: BaseComponent,
       children: [
         {path: 'add-users', component: AddUsersComponent},
         {path: 'add-company', component: AddCompanyComponent},
         {path: 'view-companies', component: ViewCompaniesComponent},
         {path: 'company/:id', component: CompanyDetailsComponent},
         {path: 'catalog-security', component: CatalogSecurityComponent},
         {path: 'view-catalog-security', component: ViewCatalogueSecurityLevelsComponent},
         {path: 'strat-litho-unit', component: StratLithoUnitComponent},
         {path: 'view-strat-litho-unit', component: ViewStratLithoUnitComponent},
         {path: 'core-types', component: CoreTypesComponent},
         {path: 'view-core-type', component: ViewCoreTypeComponent},
         {path: '', component: DashboardComponent},
         {path: 'add-web-security', component:  AddwebSecurityComponent},
         {path: 'web-security-levels', component:WebSecurityLevelsComponent},
         {path: 'user-logs', component:UserLogsComponent},
         {path: 'users', component:UsersListComponent},
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
