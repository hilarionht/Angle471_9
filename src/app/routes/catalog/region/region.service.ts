import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AbstractRestService } from '@app/shared/services/abstract.rest.service';
import { Region } from './Region.model';
import { Page } from '@app/_models';

@Injectable({ providedIn: 'root'})
export class RegionService extends AbstractRestService <Region, number> {

  constructor(
      http: HttpClient,
      page: Page
    ) {
      super(http, `${environment.apiUrl}/Region`, page);
    }
}