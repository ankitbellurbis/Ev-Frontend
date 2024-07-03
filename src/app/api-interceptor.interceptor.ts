import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from './service/message.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class ApiInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private messageService: MessageService, private spinner: NgxSpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // return next.handle(request);
    const token: any = JSON.parse(localStorage.getItem('userData')!)?.accessToken;
    let newRequest;

    if (token && !request.url.includes('users/login'))
      newRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache, no-store',
          Pragma: 'no-cache',
        },
      });
    else newRequest = request;

    return next.handle(newRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        // this.spinner.hide();
        if (error instanceof HttpErrorResponse && error.status == 401) {
          this.messageService.errorToast('Your session has been expired.');
          // console.error('An error occurred:', error);
          this.spinner.hide();
          localStorage.clear();
          this.router.navigate(['/login']);
        } else {
          this.spinner.hide();
          this.messageService.errorToast(error?.error?.message);
        }
        return throwError(error);
      })
    );
  }
}
