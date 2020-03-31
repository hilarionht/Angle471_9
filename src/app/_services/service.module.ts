import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { Page } from '@app/_models';
import { RoleService } from './role.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    UserService,
    RoleService,
    Page
  ]
})
export class ServiceModule { }
