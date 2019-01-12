import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import RegisterData from "../data/model/register-data.model";
import User from "../../core/model/user.model";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable()
export default class SecurityService
{
  constructor(private http: HttpClient) {}

  public registerUser(data: RegisterData): Observable<User>
  {
    return this.http.post<{ user: User }>('/security/register', data).pipe(
      map(result => result.user)
    );
  }

  public registerConfirm(confirmationKey: string): Observable<User>
  {
    return this.http.post<{ user: User }>('/security/confirm-register/' + confirmationKey, {}).pipe(
      map(result => result.user)
    );
  }
}
