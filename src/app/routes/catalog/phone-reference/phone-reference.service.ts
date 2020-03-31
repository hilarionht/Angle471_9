import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AbstractRestService } from '@app/shared/services/abstract.rest.service';
import { Page } from '@app/_models';
import { PhoneReference } from '.';

@Injectable({ providedIn: 'root'})
export class PhoneReferenceService extends AbstractRestService <PhoneReference, number> {

  constructor(
      http: HttpClient,
      page: Page
    ) {
      super(http, `${environment.apiUrl}/PhoneReference`, page);
    }
}