import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';

// UN GUARD DEBE RETORNAR UN BOOLEANO O UNA REDIRECCION
export const adminGuard: CanActivateFn = (route, state) => {



  const router = inject(Router);

  return inject(Store).select(selectIsAdmin).pipe(
    map((isAdmin) => {
      if (!isAdmin) {
        console.log(adminGuard.name, 'Redirigiendo al inicio')
        return router.createUrlTree(['/dashboard/home'])
      }

      return true;
    })
  )
};
