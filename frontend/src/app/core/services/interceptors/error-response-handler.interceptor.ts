import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from "@ngrx/store";
import {State} from "../../../app.state";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {GlobalNotifyErrorMessage} from "../../data/actions";
import {NotifyMessage} from "../../data/model/notify-message.model";

@Injectable()
export class ErrorResponseHandlerInterceptor implements HttpInterceptor
{
  static UNAUTHORIZE_ERROR_CODE = 401;

  constructor(
    private store: Store<State>,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      tap(
        (event) => {

        },
        (error) => {
          if (error instanceof HttpResponse)
          {
            if (error.status === ErrorResponseHandlerInterceptor.UNAUTHORIZE_ERROR_CODE)
            {
              this.store.dispatch(new GlobalNotifyErrorMessage(new NotifyMessage('You are unauthorized!')));
              this.router.navigateByUrl('/security/login');

              return;
            }

            this.store.dispatch(new GlobalNotifyErrorMessage(new NotifyMessage('Application error. Please try later.')));
          }
        })
    );

  }

}
