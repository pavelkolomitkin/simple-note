import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../../../environments/environment';


export class BaseApiUrlInterceptor implements HttpInterceptor
{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const newRequest = req.clone({
      url: environment.baseApiUrl + req.url
    });

    return next.handle(newRequest);
  }

}
