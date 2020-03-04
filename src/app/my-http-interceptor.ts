import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OutletContext } from '@angular/router';



// @Injectable()
export class MyHttpInterceptor 
// implements HttpInterceptor 
{

    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     Logger.LOG_DEBUG('MyHttpInterceptor - intercept - request: ' + JSON.stringify(request));
    //     const requestCloned = request.clone({
    //         // setHeaders: {
    //         //   Authorization: 'AuthMyLuca'
    //         // },
    //         withCredentials: true
    //      });
    //     Logger.LOG_DEBUG('MyHttpInterceptor - intercept - requestCloned: ' + JSON.stringify(requestCloned));
    //     return next.handle(requestCloned);
    // }
}
