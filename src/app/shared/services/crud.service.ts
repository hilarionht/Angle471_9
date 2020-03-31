
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CrudOperations } from './interface/crud-operations.interface';
import { Page } from '@app/_models';

export abstract class CrudService<T, ID> implements CrudOperations<T, ID, Page> {
  constructor(
    private http: HttpClient,
    private base: string,
    private page: Page
  ) {  }

  save(t: T): Observable<T> {
    // tslint:disable-next-line:max-line-length
    return this.http.post<T>(this.base, t );
  }

  update(id: ID, t: T): Observable<T> {
    return this.http.put<T>(this.base , t );
  }

  findOne(id: ID): Observable<T> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<T>(this.base + '/' + id );
  }
  findAll(page: Page): Observable<T[]> {
    // tslint:disable-next-line:max-line-length {"limit":' + page.limit + ',"numberPage":' + page.numberPage + '}&isPaginate=true'
    return this.http.get<T[]>(this.base + '/?paginate={"limit":' + page.limit + ',"numberPage":' + page.numberPage + '}&isPaginate=true' );
  }
  findOrder(page: Page): Observable<T[]> {
    // tslint:disable-next-line:max-line-length {"limit":' + page.limit + ',"numberPage":' + page.numberPage + '}&isPaginate=true'
    return this.http.get<T[]>( this.base + `/?paginate={"limit": ${ page.limit },"numberPage": ${ page.numberPage }}&isPaginate=true&filter={"order":{ ${page.prop}":"${ page.dir }}}` )  as Observable<T[]>;
  }
  list(): Observable<T[]> {  
    // tslint:disable-next-line:max-line-length {"limit":' + page.limit + ',"numberPage":' + page.numberPage + '}&isPaginate=true'
      return this.http.get<T[]>(this.base + '/?isPaginate=false' );
    }
  delete(id: ID): Observable<T> {
    // tslint:disable-next-line:max-line-length
    return this.http.delete<T>(this.base + '/' + id );
  }

  search(page: Page, word: string ): Observable<T[]> {
    console.log(page, 'page .....');
    // tslint:disable-next-line:max-line-length
    return this.http.get<T[]>(this.base + '/?word='+ word +'?&paginate={"limit":' + page.limit + ',"numberPage":' + page.numberPage + '}&isPaginate=true' );
  }
}