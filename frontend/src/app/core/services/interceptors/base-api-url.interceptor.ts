import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../../../environments/environment';


export class BaseApiUrlInterceptor implements HttpInterceptor
{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const newRequest = req.clone({
      url: this.getRequestUrl(req)
    });

    return next.handle(newRequest);
  }

  private getRequestUrl(request: HttpRequest<any>)
  {
    let result = request.url;

    if (!this.isRequestUrlAbsolute(request))
    {
      result = environment.baseApiUrl + result;
    }

    return result;
  }

  private isRequestUrlAbsolute(request: HttpRequest<any>): Boolean
  {
    return (request.url.indexOf('http') === 0);
  }

}
