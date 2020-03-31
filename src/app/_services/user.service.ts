import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { User } from '@app/_models/user.model';
import { Page } from '@app/_models';
import { CrudService } from '@app/shared/services/crud.service';


@Injectable({ providedIn: 'root' })
export class UserService extends CrudService <User, number> {
    constructor(
        http: HttpClient,
        page: Page
        ) {
        super(http, `${environment.apiUrl}/user`, page);
    }
}
