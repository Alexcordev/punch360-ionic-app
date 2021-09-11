import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class AddCookieInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`AddCookieInterceptor intercepted ${req.url} with method ${req.method}`);
    const reqWithCookie: HttpRequest<any> = req.clone({
      withCredentials: true
    });
    console.log('session cookie ' + JSON.stringify(reqWithCookie));
    return next.handle(reqWithCookie);
  }


  constructor() { }
}
