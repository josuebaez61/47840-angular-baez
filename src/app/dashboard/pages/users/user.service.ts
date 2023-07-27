import { Injectable } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from './models';
import { BehaviorSubject, Observable, generate, map, take } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { generateRandomString } from 'src/app/shared/utils/token-generator';

const MOCK_USERS: User[] = [
  {
    id: 1,
    name: 'Marcos',
    surname: 'Rodriguez',
    email: 'mark@mail.com',
    password: '123456',
    token: 'A3RTRQXSW3',
  },
  {
    id: 2,
    name: 'Julian',
    surname: 'Perez',
    email: 'jperez@mail.com',
    password: '123456',
    token: 'A3RTRVXSW3',
  },
];

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();

  constructor(private notifier: NotifierService) {}

  loadUsers(): Observable<User[]> {
    this._users$.next(MOCK_USERS);
    return this.users$;
  }

  getUserById(id: number) {
    return this.users$.pipe(
      take(1),
      map((users) => users.find((u) => u.id === id))
    );
  }

  createUser(user: CreateUserData): void {
    // TAKE 1 = solo quiero recibir una emision
    // SUPER IMPORTANTE PORQUE DE LO CONTRARIO,
    // CREARIAN UN BUCLE INFINITO
    this.users$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._users$.next([
          ...arrayActual,
          {
            ...user,
            id: arrayActual.length + 1,
            token: generateRandomString(10),
          },
        ]);
        this.notifier.showSuccess('Usuario creado');
      },
    });
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
