import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { PaginatedResult, Pagination } from '../models/Pagination';
import { map } from 'rxjs/operators';
import { Message } from '../models/message';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getUsers(page?, itemsPerPage?, userParams?, likesParams?): Observable<PaginatedResult<User[]>>{
  const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
  let params = new HttpParams();

  if (page != null && itemsPerPage != null){
    params = params.append('pageNumber' , page);
    params = params.append('pageSize' , itemsPerPage);
  }

  if (userParams != null){
    params = params.append('minAge' , userParams.minAge);
    params = params.append('maxAge' , userParams.maxAge);
    params = params.append('gender' , userParams.gender);
    params = params.append('orderBy' , userParams.orderBy);
  }

  if (likesParams === 'Likers')
  {
    params = params.append('likers', 'true');
  }
  if (likesParams === 'Likees')
  {
    params = params.append('likees', 'true');
  }
  return this.http.get<User[]>(this.baseUrl + 'user', { observe: 'response', params})
  .pipe(
    map( response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') != null){
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
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

sendLike(id: number, recipientId: number){
  return this.http.post(this.baseUrl + 'user/' + id + '/like/' + recipientId, {});
}
getMessages(id: number, page?, intemPerPage?, messageContainer?){
  const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();

  let params = new HttpParams();

  params = params.append('MessageContainer', messageContainer);

  if (page != null && intemPerPage != null){
    params = params.append('pageNumber', page);
    params = params.append('pageSize', intemPerPage);
  }

  return this.http.get<Message[]>(this.baseUrl + 'user/' + id + '/messages', {observe: 'response', params})
  .pipe(
    map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') !== null){
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    })
  );
  }

  getMessageThread(id: number, recipientId: number){
    return this.http.get<Message[]>(this.baseUrl + 'user/' + id + '/messages/thread/' + recipientId);

  }

  sendMessage(id: number, message: Message) {
    return this.http.post(this.baseUrl + 'user/' + id + '/messages', message);
  }

  deleteMessage(id: number, userId: number) {
    return this.http.post(this.baseUrl + 'user/' + userId + '/messages/' + id, {});
  }

  markAsRead(userId: number, messageId: number) {
    this.http.post(this.baseUrl + 'user/' + userId + '/messages/' + messageId + '/read', {})
      .subscribe();
  }
}
