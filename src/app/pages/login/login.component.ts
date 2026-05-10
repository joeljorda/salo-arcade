import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  errorMessage = '';
  isLoading = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Introdueix un email i una contrasenya vàlids.';
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    const { email, password } = this.loginForm.getRawValue();

    this.authService.login(email, password).subscribe({
      next: (loginOk) => {
        this.isLoading = false;

        if (loginOk) {
          const returnUrl =
            this.route.snapshot.queryParamMap.get('returnUrl') ?? '/favorites';

          this.router.navigateByUrl(returnUrl);
          return;
        }

        this.errorMessage = 'Credencials incorrectes.';
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Error en iniciar sessió.';
      },
    });
  }
}