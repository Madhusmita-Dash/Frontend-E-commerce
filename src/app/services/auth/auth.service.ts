import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'; // Import throwError
import { catchError } from 'rxjs/operators'; // Import catchError for error handling

const BASIC_URL = 'http://localhost:9095/'; // Your backend URL

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  register(signupRequest: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Send POST request to the backend API
    return this.http.post<any>(BASIC_URL + 'signup', signupRequest, { headers }).pipe(
      catchError((error) => {
        console.error('Signup error', error);  // Log error for debugging
        return throwError(error);  // Propagate error
      })
    );
  }
}
