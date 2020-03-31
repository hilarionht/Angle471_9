import { Role, Page } from '@app/_models';
import { Injectable } from '@angular/core';
import { CrudService } from '@app/shared/services/crud.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { AbstractRestService } from '@app/shared/services/abstract.rest.service';

@Injectable({ providedIn: 'root'})
export class RoleService extends AbstractRestService <Role, number> {

  constructor(
      http: HttpClient,
      page: Page
    ) {
      console.log('data service role');
      super(http, `${environment.apiUrl}/role`, page);
    }
}
