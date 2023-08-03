import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.services';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../dashboard/pages/users/models';
import { RouterTestingModule } from '@angular/router/testing';
import { MockProvider } from 'ng-mocks';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [MockProvider(Router)],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('Al realizar un login valido, auth user deberia tener valor', (done) => {
    const mockUser: User = {
      id: 2,
      email: 'mockuser@mail.com',
      password: '123456',
      name: 'Mock',
      surname: 'User',
      token: 'AG1Ptx4ZBtwJCAoyJxQy',
    };

    service.login({ email: 'mockuser@mail.com', password: '123456' });
    httpController
      .expectOne({
        method: 'GET',
        url:
          environment.baseApiUrl +
          '/users?email=mockuser@mail.com&password=123456',
      })
      .flush([mockUser]);

    service.authUser$.pipe(take(1)).subscribe({
      next: (authUser) => {
        expect(authUser).toEqual(mockUser);
        done();
      },
    });
  });
});
