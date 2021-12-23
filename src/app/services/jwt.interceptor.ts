import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private localstorageService: LocalstorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.localstorageService.getToken();
    const ifapiurl = request.url.startsWith('http://localhost:8000/');
    if (token && ifapiurl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    return next.handle(request);
  }
}