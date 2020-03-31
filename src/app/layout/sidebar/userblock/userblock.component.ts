import { Component, OnInit } from '@angular/core';

import { UserblockService } from './userblock.service';
import { AuthenticationService } from '@app/_services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {
    user: any;
    role: any;
    constructor(
        public userblockService: UserblockService,
        public authService: AuthenticationService,
        public router: Router
        ) {
        this.user = this.authService.user;
        console.log(this.user, 'userblock');
        //this.role = authService.user.role;
        // this.user = {
        //     picture: 'assets/img/user/01.jpg'
        // };
    }

    ngOnInit() {
    }

    userBlockIsVisible() {
        return this.userblockService.getVisibility();
    }
    profile() {
        this.router.navigate(['/config/profile']);
    }
}
