import { Component, OnInit, Injector } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/_services';

@Component({
    selector: 'app-lock',
    templateUrl: './lock.component.html',
    styleUrls: ['./lock.component.scss']
})
export class LockComponent implements OnInit {

    valForm: FormGroup;
    router: Router;

    constructor(
        public settings: SettingsService, 
        fb: FormBuilder, 
        public injector: Injector,
        public authService: AuthenticationService) {

        this.valForm = fb.group({
            'password': [null, Validators.required]
        });

    }
   
    submitForm($ev, value: any) {
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            console.log('Valid!');
            console.log(value);
            this.authService.login(value.username, value.password).subscribe(() => {
                this.router.navigate(['/']);
                // this.router.navigate(['home']);
                } , (err: any) => {
                    // this.toasterService.pop('warning', 'Error de acceso', err);
            });
            this.router.navigate(['home']);
        }
    }

    ngOnInit() {
        this.router = this.injector.get(Router);
    }

}
