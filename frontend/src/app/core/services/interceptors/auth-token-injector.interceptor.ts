import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LocalStorageService} from '../local-storage.service';

@Injectable()
export class AuthTokenInjectorInterceptor implements HttpInterceptor
{
  constructor (private localStorageService: LocalStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    const token = this.localStorageService.get('token');
    if (token !== null) {
      const tokenizedRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.localStorageService.get('token'))
      });
      return next.handle(tokenizedRequest);
    }

    return next.handle(req);
  }
}
