import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { adminGuard } from '../core/guards/admin.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        // /dashboard/home
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'users',
        canActivate: [adminGuard],
        loadChildren: () =>
          import('./pages/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./pages/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./pages/categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: 'counter',
        loadChildren: () =>
          import('./pages/counter/counter.module').then((m) => m.CounterModule),
      },
      {
        path: 'buyers',
        loadChildren: () =>
          import('./pages/buyers/buyers.module').then((m) => m.BuyersModule),
      },
      {
        path: 'sales',
        loadChildren: () =>
          import('./pages/sales/sales.module').then((m) => m.SalesModule),
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
