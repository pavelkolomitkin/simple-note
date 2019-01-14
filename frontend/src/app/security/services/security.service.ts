import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import RegisterData from '../data/model/register-data.model';
import User from '../../core/model/user.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import LoginCredentials from '../data/model/login-credentials.model';

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

  public login(credentials: LoginCredentials)
  {
    return this.http.post<{ token: string }>('/security/login_check', {
      username: credentials.email,
      password: credentials.password
    }).pipe(
      map(result => result.token)
    );
  }

  public getAuthorizedUser()
  {
    return this.http.get<{user: User}>('/security/profile').pipe(
      map(result => result.user)
    );
  }
}
