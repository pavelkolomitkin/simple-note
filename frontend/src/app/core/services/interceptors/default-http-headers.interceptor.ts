import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export class DefaultHttpHeadersInterceptor implements HttpInterceptor
{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    if (req.headers.has('enctype'))
    {
      return next.handle(req);
    }

    const headeredRequest = req.clone({
      headers: req
        .headers
        .set('Content-Type', 'application/json')
    });

    return next.handle(headeredRequest);
  }
}
