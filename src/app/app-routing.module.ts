import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';

import { LoginComponent } from './Auth/login/login.component';
import { AddUsersComponent } from './Pages/Users/add-users/add-users.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { AddwebSecurityComponent } from './Pages/Web-security/addweb-security/addweb-security.component';
import { WebSecurityLevelsComponent } from './Pages/Web-security/web-security-levels/web-security-levels.component';
import { UserLogsComponent } from './Pages/Users/user-logs/user-logs.component';
import { UsersListComponent } from './Pages/Users/users-list/users-list.component';
import { AddWellboreComponent } from './Pages/Wellbores-/add-wellbore/add-wellbore.component';
import { AddFileFormatsComponent } from './Pages/File-format/add-file-formats/add-file-formats.component';
import { AddFileSecurityGradeComponent } from './Pages/File-security/add-file-security-grade/add-file-security-grade.component';
import { WellboreCoreComponent } from './Pages/Wellbore-core-/wellbore-core/wellbore-core.component';
import { AddCoreCatalogComponent } from './Pages/Core-catalog/add-core-catalog/add-core-catalog.component';
import { WellboresComponent } from './Pages/Wellbores-/wellbores/wellbores.component';
import { FileFormatsComponent } from './Pages/File-format/file-formats/file-formats.component';
import { FileSecurityGradesComponent } from './Pages/File-security/file-security-grades/file-security-grades.component';
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
import { RecoverPasswordComponent } from './password/recover-password/recover-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';






const routes: Routes = [
  {path: 'samples', component: BaseComponent,
    children: [
      {path: 'add-users', component: AddUsersComponent},
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
      {path: 'catalog-security', component: CatalogSecurityComponent},
      {path: 'view-catalog-security', component: ViewCatalogueSecurityLevelsComponent},
      {path: 'strat-litho-unit', component: StratLithoUnitComponent},
      {path: 'view-strat-litho', component: ViewStratLithoComponent},
      {path: 'wells', component: WellsComponent},
      {path: 'core-catalogs', component:  CoreCatalogsComponent},
      {path: 'update-password', component:  UpdatePasswordComponent},
      {path: 'king-fisher', component:  KfdaComponent},
      {path: 'tillenga', component:  TdaComponent},
      {path: 'inactive', component:  DormantComponent},
      {path: 'add-cores', component: AddCoresComponent},
      {path: 'cores', component: CoresListComponent},
      {path: 'add-fluids', component: AddFluidsComponent},
      {path: 'fluids',component:FluidsListComponent},
      {path: 'add-cuttings', component:AddCuttingsComponent},
      {path: 'cuttings', component: CuttingsListComponent},
      {path: 'add-rock-sample', component:AddRockSampleComponent},
      {path: 'rocks', component:RocksListComponent},
      {path: 'stats', component: StatGraphsComponent},
      {path: 'gal', component: GalleryComponent}

  ]
},


  {path: 'login', component: LoginComponent},
  {path: 'recovery', component:RecoverPasswordComponent },
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: '', component: LoginComponent, pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
