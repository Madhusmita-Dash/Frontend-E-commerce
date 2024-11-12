import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8080/AppUser";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userStorageService: any;
  constructor(private http: HttpClient,) {}

  register(sigunupRequest: any): Observable<any> {
    return this.http.post(BASIC_URL + "sign-up", sigunupRequest);
  }

  login(username: string, password: string): any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {username, password};
    return this.http.post(BASIC_URL + 'authenticate', body, { headers, observe: 'response' }).pipe(
      map((res) =>{
        const token = res.headers.get('authorization').substring(7);
        const user = res.body;
        if(token && user) {
          this.userStorageService.saveToken (token);
          this.userStorageService.saveUser(user);
          return true;
        }
        return false;
      })
    );
  }}