import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the token from wherever you have stored it (e.g., local storage)
    const token = localStorage.getItem('token');

    // Clone the request and add the token to the headers
    request = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
   
      }
    });

    // Pass the modified request to the next interceptor or to the backend server
    return next.handle(request);
  }
}