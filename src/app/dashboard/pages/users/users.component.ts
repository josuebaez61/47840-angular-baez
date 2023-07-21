import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';
import { UserService } from './user.service';
import {
  Observable,
  Subject,
  Subscription,
  delay,
  filter,
  forkJoin,
  map,
  of,
  takeUntil,
  tap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'src/app/core/services/notifier.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnDestroy {
  public users: Observable<User[]>;

  public today = new Date();

  public semaforoSubscription?: Subscription;

  public allSubs: Subscription[] = [];

  public destroyed = new Subject<boolean>();

  public loading = false;
  public nombres: string[] = [];
  public numeros: number[] = [];

  constructor(
    private matDialog: MatDialog,
    private userService: UserService,
    private notifier: NotifierService,
    @Inject('IS_DEV') private isDev: boolean
  ) {
    this.users = this.userService.getUsers().pipe(
      // PRIMERO ESTO
      tap((valorOriginal) => console.log('VALOR ANTES DEL MAP', valorOriginal)),
      // LUEGO ESTO
      map((valorOriginal) =>
        valorOriginal.map((usuario) => ({
          ...usuario,
          name: usuario.name.toUpperCase(),
          surname: usuario.surname.toUpperCase(),
        }))
      ),
      // POR ULTIMO ESTO
      tap((valorMapeado) => console.log('VALOR DESPUES DEL MAP', valorMapeado))
    );

    // OPERADOR MAP, OPERADOR FILTER
    // of(1, 2, 3, 4, 5)
    //   .pipe(
    //     map((v) => v * 2),
    //     // 2, 4....
    //     filter((valorMapeado) => valorMapeado < 6),
    //   )
    //   .subscribe({
    //     next: (v) => {
    //       // 2, 4...
    //       console.log(v);
    //     }
    //   })

    const obs1$ = of(['Maria', 'Juan', 'Santiago']).pipe(delay(3000));
    const obs2$ = of([1, 2, 3, 4, 5]).pipe(
      delay(6000),
      map((r) => r.map((n) => n * 2))
    );

    this.loading = true;
    // NO FUNCIONA BIEN...
    // obs1$.subscribe({
    //   // Despues de 3000 ms
    //   next: (v) => (this.nombres = v),
    //   complete: () => (this.loading = false),
    // });

    // obs2$.subscribe({
    //   // Despues de 6000 ms
    //   next: (v) => (this.numeros = v),
    //   complete: () => (this.loading = false),
    // });

    // FUNCIONA
    forkJoin([obs1$, obs2$]).subscribe({
      next: ([nombres, numeros]) => {
        this.nombres = nombres;
        this.numeros = numeros;
      },
      complete: () => (this.loading = false),
    });

    // PRIMERO CARGO LOS USUARIOS
    // this.userService.loadUsers();
    // LUEGO LOS OBTENGO
    // this.userService.getUsers().subscribe({
    //   // then
    //   next: (users) => {
    //     // console.log(v);
    //     this.users = users;
    //     // this.userService.sendNotification('Se cargaron los usuarios');
    //   }
    // });

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
    //     // Escucha emisiones hasta que... this.destroyed
    //     // takeUntil(this.destroyed),
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
            this.notifier.showSuccess('Se cargaron los usuarios correctamente');

            this.userService.createUser({
              id: new Date().getTime(),
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
      // this.users = this.users.filter((u) => u.id !== userToDelete.id);
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
          if (userUpdated) {
            this.userService.updateUser(userToEdit.id, userUpdated);
          }
        },
      });
  }
}
