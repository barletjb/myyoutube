import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { UserRegistered } from '../../../models/user-models';
import { Router, RouterLink } from '@angular/router';
import { passwordMatchValidator } from '../../../validators/form-validator';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
class Register {
  private readonly authService: AuthService = inject(AuthService);
  private readonly router = inject(Router);

  protected registerForm: FormGroup = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: passwordMatchValidator },
  );

  user: UserRegistered = {
    username: '',
    email: '',
    password: '',
    createdAt: new Date(),
  };

  isInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string | null {
    const field = this.registerForm.get(fieldName);

    if (field?.hasError('required')) {
      return `${fieldName} est requis`;
    }

    if (field?.hasError('email')) {
      return "Format d'email invalide";
    }

    if (field?.hasError('minlength')) {
      return `Minimum ${field.errors?.['minlength'].requiredLength} caractères`;
    }

    return null;
  }

  isPasswordMismatch(): boolean {
    const confirm = this.registerForm.get('confirmPassword');
    return !!(this.registerForm.hasError('passwordMismatch') && confirm?.touched);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.user = this.registerForm.value;
      this.authService.register(this.user);
      this.router.navigate(['/']);
    }
  }
}

export default Register;
