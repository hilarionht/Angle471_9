import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AbstractRestService } from '@app/shared/services/abstract.rest.service';
import { Province } from './Province.model';
import { Page } from '@app/_models';

@Injectable({ providedIn: 'root'})
export class ProvinceService extends AbstractRestService <Province, number> {

  constructor(
      http: HttpClient,
      page: Page
    ) {
      super(http, `${environment.apiUrl}/province`, page);
    }
}