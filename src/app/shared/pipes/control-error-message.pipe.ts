import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'controlErrorMessage'
})
export class ControlErrorMessagePipe implements PipeTransform {

  transform(error: { key: string, value: any }, ...args: unknown[]): unknown {
    const errorMessages: Record<string, string> = {
      required: 'Este campo es requerido',
      email: 'Debe ser un email valido',
      minlength: 'El largo no cumple con el requerido'
    };

    return errorMessages[error.key] || 'Campo invalido';
  }

}
