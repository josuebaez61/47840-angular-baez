import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';

describe('LoginComponent', () => {
  let componentInstance: LoginComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, SharedModule],
      declarations: [LoginComponent],
    });
    const fixture = TestBed.createComponent(LoginComponent);
    componentInstance = fixture.componentInstance;
  });

  it('El input email deberia ser invalido si el dato ingresado no es un email', () => {
    componentInstance.emailControl.setValue('invalid-email');

    expect(componentInstance.emailControl.invalid).toBe(true);
  });

  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(Lo);
  //   const app = fixture.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  // it(`should have as title '47840-angular-baez'`, () => {
  //   const fixture = TestBed.createComponent(Lo);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('47840-angular-baez');
  // });
});
