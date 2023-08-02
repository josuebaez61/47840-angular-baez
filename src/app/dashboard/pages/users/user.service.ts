import { Injectable } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from './models';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { generateRandomString } from 'src/app/shared/utils/helpers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();


  private _isLoading$ = new BehaviorSubject(false);
  public isLoading$ = this._isLoading$.asObservable();

  constructor(private notifier: NotifierService, private httpClient: HttpClient) {}

  loadUsers(): void {
    // USER_DB.subscribe({
    //   next: (usuariosFromDb) => this._users$.next(usuariosFromDb),
    // });
    this._isLoading$.next(true);
    this.httpClient.get<User[]>(environment.baseApiUrl + '/users', {
      headers: new HttpHeaders({
        'token': '12345678910'
      }),
      // params: {
      //   page: 1,
      //   limit: 50,
      // }
    }).subscribe({
      next: (response) => {
        // SI TODO SALE OK...
        this._users$.next(response);
      },
      error: () => {
        // SI TODO SALE MAL
        this.notifier.showError('Error al cargar los usuarios');
      },
      complete: () => {
        this._isLoading$.next(false);
        // SE COMPLETO EL OBSERVABLE
      },
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

  createUser(payload: CreateUserData): void {
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

    // CON HTTP CLIENT:

    // this.users$.pipe(take(1)).subscribe({
    //   next: (arrayActual) => {
    //     this._users$.next([...arrayActual, userCreated])
    //   }
    // })

    const token = generateRandomString(20);

    this.httpClient.post<User>(environment.baseApiUrl  + '/users', { ...payload, token })
      .pipe(
        mergeMap((userCreate) => this.users$.pipe(
          take(1),
          map(
            (arrayActual) => [...arrayActual, userCreate])
          )
        )
      )
      .subscribe({
        next: (arrayActualizado) => {
          this._users$.next(arrayActualizado);
        }
      })
  }

  updateUserById(id: number, usuarioActualizado: UpdateUserData): void {
    // this.users$.pipe(take(1)).subscribe({
    //   next: (arrayActual) => {
    //     this._users$.next(
    //       arrayActual.map((u) =>
    //         u.id === id ? { ...u, ...usuarioActualizado } : u
    //       )
    //     );
    //     this.notifier.showSuccess('Usuario Actualizado');
    //   },
    // });

    // CON HTTP CLIENT

    this.httpClient.put(environment.baseApiUrl + '/users/' + id, usuarioActualizado).subscribe({
      next: () => this.loadUsers(),
    })

  }

  deleteUserById(id: number): void {
    // this._users$.pipe(take(1)).subscribe({
    //   next: (arrayActual) => {
    //     this._users$.next(arrayActual.filter((u) => u.id !== id));
    //     this.notifier.showSuccess('Usuario eliminado');
    //   },
    // });

    // LOGICA ESPERADA
    // 1 - Quiero comunicarme con la API y eliminar el usuario
    // 2 - Quiero actualizar el listado (array de usuarios)

    // OBSERVABLE 1 (se comunica con la API)
    this.httpClient.delete(environment.baseApiUrl + '/users/' + id)
      .pipe(
        // mergeMap(
        //   // En este punto el la comunicacion ya sucedio (PUNTO 1)
        //   (responseUserDelete) => this.users$.pipe(
        //     take(1),
        //     map((arrayActual) => arrayActual.filter((u) => u.id !== id)) // En este punto del codigo ya actualizamos el array (PUNTO NUMERO 2)
        //   )
        // )
      ).subscribe({
        next: (arrayActualizado) => this.loadUsers(),
      })

    // OBSERVABLE 2
    // this.users$.pipe(take(1))


  }
}
