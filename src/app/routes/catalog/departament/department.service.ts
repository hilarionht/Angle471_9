import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AbstractRestService } from '@app/shared/services/abstract.rest.service';
import { Department } from './department.model';
import { Page } from '@app/_models';
import { Observable } from 'Angular9Tutorial/node_modules/rxjs';

@Injectable({ providedIn: 'root'})
export class DepartmentService extends AbstractRestService <Department, number> {

  constructor(
      http: HttpClient,
      page: Page
    ) {
      super(http, `${environment.apiUrl}/department`, page);
    }
    listbyProvince(id: number): Observable<Department[]> {
      // tslint:disable-next-line:max-line-length
      return this.http.get( environment.apiUrl + `/province/?filter={"where":[{"id":${ id }}],"relations":["departments"]}`) as Observable<Department[]>;
    }
}