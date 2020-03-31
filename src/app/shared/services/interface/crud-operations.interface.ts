
import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:no-shadowed-variable
export interface CrudOperations<T, ID, Page> {
	save(t: T): Observable<T>;
	update(id: ID, t: T): Observable<T>;
	findOne(id: ID): Observable<T>;
	findAll(page: Page): Observable<T[]>;
	list(): Observable<T[]>;
	delete(id: ID): Observable<any>;
	search(page: Page, word: string): Observable<T[]>;
}
