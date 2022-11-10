import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, shareReplay, switchMap, tap } from 'rxjs';
import { RegistrationUser, User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  private readonly baseURL = 'http://localhost:3000';

  private isUsersLoaded = false;

  private users$ = new BehaviorSubject<User[]>([]);

  getUsers() {
    if (this.isUsersLoaded) return this.users$.asObservable();

    return this.http.get<User[]>(`${this.baseURL}/users`).pipe(
      tap((res) => this.users$.next(res)),
      switchMap(() => this.users$.asObservable())
    );
  }

  addUser(user: RegistrationUser) {
    return this.http.post<User>(`${this.baseURL}/users`, user).pipe(
      tap((res) => this.users$.next([...this.users$.value, res])),
      concatMap(() => this.users$.asObservable())
    );
  }
}
