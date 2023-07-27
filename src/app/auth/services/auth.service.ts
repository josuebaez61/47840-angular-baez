import { Injectable } from '@angular/core';
import { UserService } from 'src/app/dashboard/pages/users/user.service';
import { LoginPayload } from '../models';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { User } from 'src/app/dashboard/pages/users/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authUser$ = new BehaviorSubject<User | null>(null);
  public authUser$ = this._authUser$.asObservable();

  constructor(private userService: UserService) {}

  login(payload: LoginPayload): Observable<User> {
    return this.userService.loadUsers().pipe(
      take(1),
      map((users) => {
        const authUser = users.find(
          (u) => u.password === payload.password && u.email === u.email
        );

        if (!authUser) throw new Error('Invalid credentials');

        this._authUser$.next(authUser);
        localStorage.setItem('token', authUser.token);
        return authUser;
      })
    );
  }

  verifyToken(): Observable<User> {
    return this.userService.loadUsers().pipe(
      take(1),
      map((users) => {
        const authUser = users.find(
          (u) => u.token === localStorage.getItem('token')
        );
        if (!authUser) throw new Error('Invalid credentials');
        this._authUser$.next(authUser);
        return authUser;
      })
    );
  }
}
