import { Injectable } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from './models';
import { BehaviorSubject, Observable, Subject, delay, map, mergeMap, of, take } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient } from '@angular/common/http';

const USER_DB: Observable<User[]> = of([
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
]).pipe(delay(1000));

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();

  constructor(private notifier: NotifierService, private http: HttpClient) {}

  loadUsers(): void {
    // USER_DB.subscribe({
    //   next: (usuariosFromDb) => this._users$.next(usuariosFromDb),
    // });
    this.http.get<User[]>('http://localhost:3000/users').subscribe({
      next: (v) => {
        this._users$.next(v)
      }
    })

  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  getUserById(id: number) {
    return this.users$.pipe(
      take(1),
      map(( users ) =>  users.find((u) => u.id === id)),
    )
  }

  createUser(user: CreateUserData): void {
    // TAKE 1 = solo quiero recibir una emision
    // SUPER IMPORTANTE PORQUE DE LO CONTRARIO,
    // CREARIAN UN BUCLE INFINITO
    // this.users$.pipe(take(1)).subscribe({
    //   next: (arrayActual) => {
    //     this._users$.next([
    //       ...arrayActual,
    //       { ...user, id: arrayActual.length + 1 },
    //     ]);
    //     this.notifier.showSuccess('Usuario creado');
    //   },
    // });

    this.http.post<User>('http://localhost:3000/users', user)
    .pipe(
      mergeMap((user) => {
        return this._users$.pipe(take(1)).pipe(
          map((users) => {
            return [...users, user]
          })
        )
      })
    )
    .subscribe({
      next: (users) => this._users$.next(users),
    })
  }

  updateUserById(id: number, usuarioActualizado: UpdateUserData): void {
    this.users$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._users$.next(
          arrayActual.map((u) =>
            u.id === id ? { ...u, ...usuarioActualizado } : u
          )
        );
        this.notifier.showSuccess('Usuario Actualizado');
      },
    });
  }

  deleteUserById(id: number): void {
    this._users$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._users$.next(arrayActual.filter((u) => u.id !== id));
        this.notifier.showSuccess('Usuario eliminado');
      },
    });
  }
}
