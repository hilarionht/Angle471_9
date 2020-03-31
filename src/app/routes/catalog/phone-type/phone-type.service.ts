import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AbstractRestService } from '@app/shared/services/abstract.rest.service';
import { Page } from '@app/_models';
import { PhoneType } from './phone-type.model';

@Injectable({ providedIn: 'root'})
export class PhoneTypeService extends AbstractRestService <PhoneType, number> {

  constructor(
      http: HttpClient,
      page: Page
    ) {
      super(http, `${environment.apiUrl}/phonetype`, page);
    }
}