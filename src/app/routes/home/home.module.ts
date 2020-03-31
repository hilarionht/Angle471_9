import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/_helpers';

const routes: Routes = [
    { path: '', component: HomeComponent , canActivate: [AuthGuard]},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [HomeComponent],
    exports: [
        RouterModule
    ]
})
export class HomeModule { }