
import { NgModule } from '@angular/core';
import { ProvinceComponent } from './province/province.component';
import { RegionComponent } from './region/region.component';
import { SectorComponent } from './sector/sector.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSelectModule } from 'ngx-select-ex';
import { LocalityComponent } from './locality/locality.component';
import { PhoneTypeComponent } from './phone-type/phone-type.component';
import { LevelComponent } from './level/level.component';
import { PhoneReferenceComponent } from './phone-reference/phone-reference.component';
import { ToasterService } from '@app/_services';
import { AuthGuard } from '@app/_helpers';
import { DepartamentComponent } from './departament/department.component';

const routes: Routes = [
  { path: '', redirectTo: 'catalog' },
  { path: 'region', component: RegionComponent, canActivate : [ AuthGuard ] },
  { path: 'provinc', component: ProvinceComponent , canActivate: [AuthGuard]},
  { path: 'phoneType', component: PhoneTypeComponent , canActivate: [AuthGuard]},
  { path: 'phoneReference', component: PhoneReferenceComponent , canActivate: [AuthGuard]},
  { path: 'department/:id', component: DepartamentComponent , canActivate: [AuthGuard]},
  { path: 'locality/:id/:provinceId', component: LocalityComponent , canActivate: [AuthGuard]}
  // { path: 'level', component: LevelComponent , canActivate: [AuthGuard]},
  // { path: 'institution', component: InstitutionComponent , canActivate: [AuthGuard]},
  // { path: 'sector', component: SectorComponent , canActivate: [AuthGuard]},
  // { path: 'ambit', component: AmbitComponent , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    NgxSelectModule,
    NgxDatatableModule
  ],
  declarations: [
    ProvinceComponent,
    RegionComponent,
    SectorComponent,
    DepartamentComponent,
    LocalityComponent,
    PhoneTypeComponent,
    PhoneReferenceComponent,
    LevelComponent
  ],
  exports: [
    RouterModule
  ], providers: [
    ToasterService
  ]
})
export class CatalogModule { }
