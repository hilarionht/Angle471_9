
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '@app/_models';


export abstract class AbstractRestService<T,  ID> {
    constructor(protected http: HttpClient, protected actionUrl: string, private page: Page ) {
    }

    getAll(): Observable<T[]> {
        return this.http.get(this.actionUrl) as Observable<T[]>;
      }

    findOne(id: number ): Observable<T> {
        return this.http.get(`${this.actionUrl}/${id}`) as Observable<T>;
      }
    save(t: T): Observable<T> {
      // tslint:disable-next-line:max-line-length
      return this.http.post<T>(`${ this.actionUrl }`, t ) as Observable<T>;
    }

    update(id: ID, t: T): Observable<T> {
      return this.http.put<T>( `${ this.actionUrl }` , t )  as Observable<T>;
    }
    findAllOrder(page: Page): Observable<T[]> {
      // tslint:disable-next-line:max-line-length {"limit":' + page.limit + ',"numberPage":' + page.numberPage + '}&isPaginate=true'
        return this.http.get<T[]>( this.actionUrl + `/?paginate={"limit": ${ page.limit },"numberPage": ${ page.numberPage }}&isPaginate=true&filter={"order":{ ${page.prop}""${ page.dir }}}` )  as Observable<T[]>;
    }
    findAll(page: Page): Observable<T[]> {
      // tslint:disable-next-line:max-line-length {"limit":' + page.limit + ',"numberPage":' + page.numberPage + '}&isPaginate=true'
        return this.http.get<T[]>( this.actionUrl + `/?paginate={"limit": ${ page.limit },"numberPage": ${ page.numberPage }}&isPaginate=true` )  as Observable<T[]>;
      }
    list(): Observable<T[]> {
      // tslint:disable-next-line:max-line-length {"limit":' + page.limit + ',"numberPage":' + page.numberPage + '}&isPaginate=true'
        return this.http.get<T[]>( this.actionUrl + `/?isPaginate=false` )  as Observable<T[]>;
      }
    delete(id: ID): Observable<T> {
      // tslint:disable-next-line:max-line-length
      return this.http.delete<T>(`${ this.actionUrl }/${ id }` )  as Observable<T>;
    }
    search(page: Page, word: string ): Observable<T[]> {
      console.log(page, 'page .....');
      // tslint:disable-next-line:max-line-length
      return this.http.get<T[]>(this.actionUrl + `/?word=${ word }?&paginate={"limit": ${ page.limit } ,"numberPage": + ${ page.numberPage } }&isPaginate=true}`)  as Observable<T[]>;
      // return this.http.get<T[]>(this.actionUrl + '/?word='+ word +'?&paginate={"limit":' + page.limit + ',"numberPage":' + page.numberPage + '}&isPaginate=true' )  as Observable<T[]>;
    }
  }
