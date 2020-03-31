import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { AuthenticationService } from '@app/_services';
import { LoaderService } from '@app/_services/loader.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        public loaderService: LoaderService
        ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.show();
        // add authorization header with jwt token if available
        // tslint:disable-next-line:prefer-const
        let currentUser = this.authenticationService.currentUserValue;
        const isLoggedIn = currentUser && currentUser.token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request).pipe(tap((event: HttpEvent<any>) => { }),
                    catchError(this.handleError),
                    finalize(() => {
                        this.loaderService.hide();
                    })
        );
    }
    handleError(error: HttpErrorResponse) {
        //const er = error.error.message || error.statusText;
        //let errorMessage = '';
        // if (error.error instanceof ErrorEvent) {
        //   // client-side error
        //   errorMessage = `Error: ${error.error.message}`;
        // } else {
        //     console.log(error);
        //   // server-side error
        //   // errorMessage = error.error; //`Error Code: ${error.status}\nMessage: ${error.error.message}`;
        // }
        // if (error.status === 404 || error.status === 403) {
        //        this.injector.get(Router).navigateByUrl(`/login`);
        // }
        window.alert(error);
        return throwError(error);
      }
}