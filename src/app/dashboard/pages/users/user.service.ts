import { Injectable } from '@angular/core';
import { User } from './models';
import { BehaviorSubject, Observable, Subject, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'Marcos',
      surname: 'Rodriguez',
      email: 'mark@mail.com',
      password: '123456',
    },
    {
      id: 2,
      name: 'Julian',
      surname: 'Perez',
      email: 'jperez@mail.com',
      password: '123456',
    },
  ];

  private subjectUsers$ = new Subject<User[]>();

  private sendNotification$ = new Subject<string>();
  // private sendNotificationObservable$ = this.sendNotification$.asObservable();

  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();

  constructor() {
    // this.sendNotification$.next()
    // this.sendNotificationObservable$.subscribe({})

    this.sendNotification$.subscribe({
      next: (message) => alert(message),
    });
  }

  sendNotification(notification: string): void {
    this.sendNotification$.next(notification);
  }

  loadUsers(): void {
    this._users$.next(this.users);
  }

  getUsers(): Observable<User[]> {
    this._users$.next(this.users);
    return this.users$;
  }

  createUser(user: User): void {
    this._users$.pipe(take(1)).subscribe({
      next: (users) => {
        this._users$.next([...users, user]);
      },
    });
  }

  updateUser(id: number, data: User): void {
    this._users$.pipe(take(1)).subscribe({
      next: (users) => {
        this._users$.next(
          users.map((u) => (u.id === id ? { ...u, ...data } : u))
        );
      },
    });
  }

  // deleteUserById(user: User): void {
  //   this.users = [
  //     ...this.users,
  //     user,
  //   ]
  // }
  // updateUserById(user: User): void {
  //   this.users = [
  //     ...this.users,
  //     user,
  //   ]
  // }
}
