import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSelectModule } from 'ngx-select-ex';
import { ProfileComponent } from './user/profile/profile.component';
import { UserComponent } from './user/user.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../../shared/shared.module';
import { UserRoutingModule } from './user.routing.module';
import { PipesModule } from '@app/shared/pipes/pipes.module';
import { TableModule } from 'primeng/table';
import { CustomerService } from '../persons/persons.service';

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule,
    PipesModule,
    NgxSelectModule,
    NgxDatatableModule,
    TableModule
  ],
  declarations: [
    UserComponent,
    UsersComponent,
    RolesComponent,
    ProfileComponent
  ],
  providers: [
    CustomerService
  ],
  exports: [
    RouterModule
  ]
})
export class UserModule { }
