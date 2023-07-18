import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';
import { UserService } from './user.service';
import { Observable, Subject, Subscription, map, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnDestroy {
  public users: User[] = [];

  public today = new Date();

  public semaforoSubscription?: Subscription;

  public allSubs: Subscription[] = [];

  public destroyed = new Subject<boolean>();

  constructor(
    private matDialog: MatDialog,
    private userService: UserService,
    @Inject('IS_DEV') private isDev: boolean
  ) {


    // PRIMERO CARGO LOS USUARIOS
    this.userService.loadUsers();
    // LUEGO LOS OBTENGO
    this.userService.getUsers().subscribe({
      // then
      next: (v) => {
        console.log(v);
        this.users = v;
        // this.userService.sendNotification('Se cargaron los usuarios');
      }
    });

    // REPASO ASINCRONIA
    //-------------------

    const meDevuelveElDinero = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
        // reject('Dinero no devuelto');
      }, 2000);
    });

    const semaforo = new Observable<string>((subscriber) => {
      let color = 'verde';
      setInterval(() => {
        color === 'verde' ? subscriber.next('rojo') : subscriber.next('verde');
        if (color === 'verde') {
          subscriber.next('rojo');
          color = 'rojo';
        } else {
          subscriber.next('verde');
          color = 'verde';
          // subscriber.complete()
        }
      }, 1000);
    });

    // ==============================
    // PIPE viene del ingles tuberia
    // ==============================
    // semaforo
    //   .pipe(
    //     takeUntil(this.destroyed),
    //     map((color) => color.toUpperCase())
    //   )
    //   .subscribe({
    //     // Cuando el observable emite
    //     // then
    //     next: (color) => {
    //       console.log(color);
    //     },
    //     // Cuando el observable emite un error
    //     // catch
    //     error: () => {},
    //     // Cuando el observable se completa
    //     // finally
    //     complete: () => {
    //       console.log('Se completo');
    //     },
    //   });

    // meDevuelveElDinero
    //   // Cuando la promesa se cumple
    //   .then((value) => console.log(value))
    //   // Cuando falla
    //   .catch((error) => alert(error))
    //   // Cuando finaliza todo el proceso, haya sido cumplida o no
    //   .finally(() => {});

    // console.log('FIRST')
    // fetch('https://reqres.in/api/users?page=2')
    //   .then((respuestaDelServidor) => respuestaDelServidor.json())
    //   .then((data) => console.log('MIDDLE'));
    // console.log('LAST')
  }

  ngOnDestroy(): void {
    console.log('SE DETRUYO');
    // this.semaforoSubscription?.unsubscribe();
    // this.allSubs.forEach((s) => s.unsubscribe());\

    this.destroyed.next(true);
  }

  onCreateUser(): void {
    this.matDialog
      // ABRO EL MODAL
      .open(UserFormDialogComponent)
      // Y DESPUES DE QUE CIERRE
      .afterClosed()
      // HAGO ESTO...
      .subscribe({
        next: (v) => {
          if (v) {
            // this.users.push()
            // this.users = [
            //   ...this.users,
            //   {
            //     id: this.users.length + 1,
            //     name: v.name,
            //     email: v.email,
            //     password: v.password,
            //     surname: v.surname,
            //   },
            // ];
            this.userService.createUser({
              id: this.users.length + 1,
              name: v.name,
              email: v.email,
              password: v.password,
              surname: v.surname,
            });
            console.log('RECIBIMOS EL VALOR: ', v);
          } else {
            console.log('SE CANCELO');
          }
        },
      });
  }

  onDeleteUser(userToDelete: User): void {
    if (confirm(`¿Está seguro de eliminar a ${userToDelete.name}?`)) {
      this.users = this.users.filter((u) => u.id !== userToDelete.id);
    }
  }

  onEditUser(userToEdit: User): void {
    this.matDialog
      // ABRO EL MODAL
      .open(UserFormDialogComponent, {
        // LE ENVIO AL MODAL, EL USUARIO QUE QUIERO EDITAR
        data: userToEdit,
      })
      // Y DESPUES DE QUE CIERRE
      .afterClosed()
      // HAGO ESTO...
      .subscribe({
        next: (userUpdated) => {
          console.log(userUpdated);
          if (userUpdated) {
            this.users = this.users.map((user) => {
              return user.id === userToEdit.id
                ? { ...user, ...userUpdated } // VERDADERO
                : user; // FALSO ;
            });
          }
        },
      });
  }
}
