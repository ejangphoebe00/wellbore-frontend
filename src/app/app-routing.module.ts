import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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





const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'add-users', component: AddUsersComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'add-web-security', component:  AddwebSecurityComponent},
  {path: 'web-security-levels', component:WebSecurityLevelsComponent},
  {path: 'user-logs', component:UserLogsComponent},  
  {path: 'users', component:UsersListComponent},  
  {path: 'add-wellbore', component:AddWellboreComponent}, 
  {path: 'add-file-formats', component:AddFileFormatsComponent}, 
  {path: 'add-file-grades', component:AddFileSecurityGradeComponent}, 
  {path: 'add-wellbore-core', component:WellboreCoreComponent}, 
  {path: 'add-core-catalog', component:AddCoreCatalogComponent}, 
  {path: '', component: LoginComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
