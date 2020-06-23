import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { PaginatedResult, Pagination } from '../models/Pagination';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getUsers(page?, itemsPerPage?): Observable<PaginatedResult<User[]>>{
  const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
  let params = new HttpParams();

  if (page != null && itemsPerPage != null){
    params = params.append('pageNumber' , page);
    params = params.append('pageSize' , itemsPerPage);
  }
  return this.http.get<User[]>(this.baseUrl + 'user', { observe: 'response', params})
  .pipe(
    map( response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') != null){
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))
      }
      return paginatedResult;
    })
  );
}

getUser(id): Observable<User>{
  return this.http.get<User>(this.baseUrl + 'user/' + id);
}
updateUser(id: number, user: User){
  return this.http.put(this.baseUrl + 'user/' + id, user);
}
}
