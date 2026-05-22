import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../../models/user-models';
import { AuthService } from '../../../services/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  userLogin: User = {
    username: '',
    password: '',
  };

  onSubmit() {
    if (this.loginForm.valid) {
      this.userLogin = this.loginForm.value;
      if (this.authService.checkCredentials(this.userLogin.username, this.userLogin.password)) {
        this.authService.login(this.userLogin.username, this.userLogin.password);
        this.router.navigate(['/']);
      } else {
        console.log('Une erreur est survenue');
      }
    }
  }
}

