import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getUsers(): Observable<User[]>{
  return this.http.get<User[]>(this.baseUrl + 'user/');
}

getUser(id): Observable<User>{
  return this.http.get<User>(this.baseUrl + 'user/' + id);
}
updateUser(id: number, user: User){
  return this.http.put(this.baseUrl + 'user/' + id, user);
}
}
