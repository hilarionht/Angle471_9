import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    valForm: FormGroup;
    passwordForm: FormGroup;

    constructor(public settings: SettingsService, fb: FormBuilder) {

        // tslint:disable-next-line:prefer-const
        let password = new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')]));
        // tslint:disable-next-line:prefer-const
        let certainPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);

        this.passwordForm = fb.group({
            password,
            confirmPassword: certainPassword
        });

        this.valForm = fb.group({
            username: ['', Validators.required],
            email: [null, Validators.compose([Validators.required, CustomValidators.email])],
            accountagreed: [null, Validators.required],
            passwordGroup: this.passwordForm
        });
    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        // tslint:disable-next-line:forin
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        // tslint:disable-next-line:forin
        for (let c in this.passwordForm.controls) {
            this.passwordForm.controls[c].markAsTouched();
        }

        if (this.valForm.valid) {
            console.log('Valid!');
            console.log(value);
        }
    }

    ngOnInit() {
    }

}
