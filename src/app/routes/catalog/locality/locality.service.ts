import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AbstractRestService } from '@app/shared/services/abstract.rest.service';
import { Locality } from './locality.model';
import { Page } from '@app/_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class LocalityService extends AbstractRestService <Locality, number> {

  constructor(
      http: HttpClient,
      page: Page
    ) {
      super(http, `${environment.apiUrl}/locality`, page);
    }
    listByDepertment(id: number): Observable<Locality[]> {
      // tslint:disable-next-line:max-line-length
      return this.http.get( environment.apiUrl + `/department/?filter={"where":[{"id":${ id }}],"relations":["localities"]}`) as Observable<Locality[]>;
    }
    listPagin( page: Page, id: string ) {
      return this.http.get( environment.apiUrl + `/department/?filter={"where":{"id":${ id }},"relations":["localities"]}`);
    }
}
