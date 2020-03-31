import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AuthGuard } from '@app/_helpers';
import { PersonsComponent } from '../persons/persons.component';
const routes: Routes = [
  { path: '', redirectTo: 'config' },
  { path: 'user/:id', component: UserComponent, canActivate: [AuthGuard] },
  // { path: 'role/:id', component: RoleComponent , canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent , canActivate: [AuthGuard] },
  { path: 'roles', component: RolesComponent , canActivate: [AuthGuard] },
  { path: 'persons', component: PersonsComponent , canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent , canActivate: [AuthGuard] }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
