import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function noHomeroValidator(): ValidatorFn {
  // AbstractControl significa que puede ser un FormArray, FormControl o FormGroup
  return (control: AbstractControl): ValidationErrors | null => {
    if (control instanceof FormControl) {
      if (
        typeof control.value === 'string' &&
        control.value?.toLowerCase().includes('homero')
      ) {
        return {
          noHomero: true,
        };
      }
    }

    return null;
    // NULL seria el caso en el que el control sea VALIDO
    // es como decir que no hay ningun error...
  };
}
