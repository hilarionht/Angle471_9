import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AbstractRestService } from '@app/shared/services/abstract.rest.service';
import { Sector } from './sector.model';
import { Page } from '@app/_models';

@Injectable({ providedIn: 'root'})
export class SectorService extends AbstractRestService <Sector, number> {

  constructor(
      http: HttpClient,
      page: Page
    ) {
      super(http, `${environment.apiUrl}/sector`, page);
    }
}