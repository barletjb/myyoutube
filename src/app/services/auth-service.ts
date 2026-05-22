import { computed, Injectable, signal } from '@angular/core';
import { User, UserRegistered } from '../models/user-models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly privateCurrentUser = signal<Partial<User> | null>(null);

  public isConnected = computed(() => this.privateCurrentUser() !== null);

  public currentUser = computed(() => this.privateCurrentUser());

  constructor() {
    const sessionUser = sessionStorage.getItem('user');

    if (sessionUser) {
      try {
        const user: Partial<User> = JSON.parse(sessionUser);
        this.privateCurrentUser.set(user);
      } catch (error) {
        console.error("Une erreur lors de la récupération de l'user", error);
        sessionStorage.removeItem('user');
      }
    }
  }

  login(username: string, password: string) {
    const user: Partial<User> = {
      username,
      password,
      token: 'fake-jwt-token',
    };
    sessionStorage.setItem('user', JSON.stringify(user));
    this.privateCurrentUser.set(user);
  }

  logout() {
    sessionStorage.removeItem('user');
    this.privateCurrentUser.set(null);
  }

  register(newUser: UserRegistered): boolean {
    const users = this.getStoredUsers();

    users.push({
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
    });

    localStorage.setItem('users', JSON.stringify(users));

    this.login(newUser.username, newUser.password);
    return true;
  }

  getStoredUsers(): UserRegistered[] {
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored) : [];
  }

  checkCredentials(username: string, password: string): boolean {
    const users = this.getStoredUsers();
    return users.some((user) => user.username === username && user.password === password);
  }
}
