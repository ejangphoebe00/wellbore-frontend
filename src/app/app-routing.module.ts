import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './Auth/login/login.component';
import { AddUsersComponent } from './Pages/add-users/add-users.component';
import { AddCompanyComponent } from './Company/add-company/add-company.component';
import { ViewCompaniesComponent } from './Company/view-companies/view-companies.component';
import { CatalogSecurityComponent } from './Pages/catalog-security/catalog-security.component';
import { StratLithoUnitComponent } from './Pages/strat-litho-unit/strat-litho-unit.component';
import { CoreTypesComponent } from './Pages/core-types/core-types.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { AddwebSecurityComponent } from './Pages/addweb-security/addweb-security.component';
import { WebSecurityLevelsComponent } from './Pages/web-security-levels/web-security-levels.component';
import { UserLogsComponent } from './user-logs/user-logs.component';
import { UsersListComponent } from './Pages/users-list/users-list.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'add-users', component: AddUsersComponent},
  {path: 'add-company', component: AddCompanyComponent},
  {path: 'view-companies', component: ViewCompaniesComponent},
  {path: 'catalog-security', component: CatalogSecurityComponent},
  {path: 'strat-litho-unit', component: StratLithoUnitComponent},
  {path: 'core-types', component: CoreTypesComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'add-web-security', component:  AddwebSecurityComponent},
  {path: 'web-security-levels', component:WebSecurityLevelsComponent},
  {path: 'user-logs', component:UserLogsComponent},
  {path: 'users', component:UsersListComponent},
  {path: '', component: LoginComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
