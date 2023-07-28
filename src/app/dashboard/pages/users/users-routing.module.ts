import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        // /dashboard/users
        path: '',
        component: UsersComponent,
      },
      {
        // /dashboard/users/:id
        path: ':id',
        component: UserDetailComponent,
      },
      // {
      //   path: 'some-module',
      //   // loadChildren: () => import('..')
      // }
    ])
  ],
  exports: [RouterModule],
})
export class UsersRoutingModule { }
