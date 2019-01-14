import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {State} from "../../../app.state";

import { map } from 'rxjs/operators';

@Injectable()
export class AuthUserGuard implements CanActivate, CanActivateChild{

  constructor(private store: Store<State>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.getAuthChecker();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.getAuthChecker();
  }


  private getAuthChecker()
  {
    return this.store.pipe(
      select(state => state.security.authorizedUser),
      map((user) => {
        if (user !== null)
        {
          return true;
        }
        else
        {
          this.router.navigate(['/security', 'login']);
          return false;
        }
      })
    );
  }
}
