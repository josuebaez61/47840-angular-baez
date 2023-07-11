import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRepetir]',
})
export class RepetirDirective {
  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainerRef: ViewContainerRef
  ) {}

  @Input()
  set appRepetir(numero: number) {
    for (let i = 0; i < numero; i++) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
