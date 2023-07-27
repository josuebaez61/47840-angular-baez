import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public emailControl = new FormControl<string>('', [
    Validators.required,
    Validators.email,
  ]);
  public passwordControl = new FormControl<string>('', [Validators.required]);

  public loginForm = new FormGroup({
    password: this.passwordControl,
    email: this.emailControl,
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private notifier: NotifierService
  ) {}

  login(): void {
    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err: Error) => {
        this.notifier.showError(err.message);
      },
    });
  }
}
