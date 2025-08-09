import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
// import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private httpService: HttpService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Don't add auth token to login requests
    if (request.url.includes('/login')) {
      console.log('Login request detected, skipping auth token');
      return next.handle(request);
    }

    const authToken = this.httpService.getAuthToken();
    if (authToken) {
      console.log('Adding auth token to request:', request.url);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }
    return next.handle(request);
  }
}
