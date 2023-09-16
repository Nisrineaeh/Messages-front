import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // loginUser(credentials: { username: string, password: string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  // }

  // signup(user: { username: string, password: string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/signup`, user);
  // }

  getUtilisateur(id: number) {
    const headers = this.getHeaders();
    return this.http.get<User[]>(`${this.apiUrl}/users/${id}`, {headers})
  }

  getAllusers() {
    const headers = this.getHeaders();
    return this.http.get<User[]>(`${this.apiUrl}/users`,{headers}) ;
  }

  inscription(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);

  }
  


  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }



 

}
