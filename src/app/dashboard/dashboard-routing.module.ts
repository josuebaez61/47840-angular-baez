import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { UsersComponent } from "./pages/users/users.component";
import { UserDetailComponent } from "./pages/users/pages/user-detail/user-detail.component";
import { ProductsComponent } from "./pages/products/products.component";

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
        loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'products',
        loadChildren: () => import('./pages/products/products.module').then((m) => m.ProductsModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./pages/categories/categories.module').then((m) => m.CategoriesModule),
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ]),
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule{}
