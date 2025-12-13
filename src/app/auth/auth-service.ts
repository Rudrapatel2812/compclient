import { Injectable } from '@angular/core';
import { LoginResquest } from './login-resquest';
import { LoginResponse } from './login-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token= 'auth_token';
  private _authStatus= new BehaviorSubject<boolean>(false);
  public authStatus= this._authStatus.asObservable();
  constructor(private http:HttpClient) { }

  init() {
    if (this.isAuthenticated()) {
      this._authStatus.next(true);
    }
  }

  setAuthStatus(isAuthenticated: boolean) {
    this._authStatus.next(isAuthenticated);
  }

  login(loginRequest:LoginResquest):Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.apiUrl+"api/Admin",loginRequest)
    .pipe(tap(response=>{
      if(response.success){
        localStorage.setItem(this.token,response.token);
        this.setAuthStatus(true);
      }
    }));
  }

  getToken():string | null {
    return localStorage.getItem(this.token);
  }

  logout() {
    localStorage.removeItem(this.token);
    this.setAuthStatus(false);
  }
  isAuthenticated():boolean {
    return this.getToken() !== null;
  }
}
