import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public users: User[] = [];

  public today = new Date();

  constructor(
    private matDialog: MatDialog,
    private userService: UserService,
    @Inject('IS_DEV') private isDev: boolean,
  ) {
    this.users = this.userService.getUsers();
    console.log(this.isDev);
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
            this.users = [
              ...this.users,
              {
                id: this.users.length + 1,
                name: v.name,
                email: v.email,
                password: v.password,
                surname: v.surname,
              },
            ];
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
      data: userToEdit
    })
    // Y DESPUES DE QUE CIERRE
    .afterClosed()
    // HAGO ESTO...
    .subscribe({
      next: (userUpdated) => {
        console.log(userUpdated)
        if (userUpdated) {
          this.users = this.users.map((user) => {
            return user.id === userToEdit.id
              ? { ...user, ...userUpdated } // VERDADERO
              : user // FALSO ;
          })
        }
      },
    });
  }
}
