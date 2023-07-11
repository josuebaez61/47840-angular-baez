import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';

const ELEMENT_DATA: User[] = [
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
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public users: User[] = ELEMENT_DATA;

  constructor(private matDialog: MatDialog) {
    // interface Alumno {
    //   nombre: string;
    //   nota: number;
    // }
    // interface Profesor {
    //   nombre: string;
    //   email: string;
    // }

    // const alumno: Alumno = { nombre: 'Juan', nota: 10 };
    // const otroAlumno: any = { nombre: 'Pepito', nota: 5 };
    // const profesor: Profesor = { nombre: 'Emilia', email: 'email@mail.com' }

    // function isAlumno(obj: unknown): obj is Alumno {
    //   if (!obj) return false;
    //   return typeof obj === 'object' && 'nombre' in obj && 'nota' in obj;
    // }

    // if (isAlumno(otroAlumno)) {
    //   otroAlumno
    // }
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
}
