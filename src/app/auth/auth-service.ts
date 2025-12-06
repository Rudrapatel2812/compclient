import { Injectable } from '@angular/core';
import { LoginResquest } from './login-resquest';
import { LoginResponse } from './login-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token= 'auth_token';
  constructor(private http:HttpClient) { }
  login(loginRequest:LoginResquest):Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.apiUrl+"api/Admin",loginRequest)
    .pipe(tap(response=>{
      if(response.success){
        localStorage.setItem(this.token,response.token);
      }
     
    }));
  }
  logout() {
    localStorage.removeItem(this.token);
  }
  isAuthenticated():boolean {
    return localStorage.getItem(this.token)!=null;
  }
}
