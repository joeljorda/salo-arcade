import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, delay, tap } from 'rxjs';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'salo-arcade-user';

  private readonly currentUserSubject = new BehaviorSubject<User | null>(
    this.getStoredUser()
  );

  currentUser$ = this.currentUserSubject.asObservable();

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated():boolean {
    return this.currentUserValue !== null;
  }

  login(email: string, password: string): Observable<boolean> {
    const loginSuccess = email === 'admin@test.com' && password === '1234';

    return of(loginSuccess).pipe(
      delay(700),
      tap((success) => {
        if (!success) {
          return;
        }

         const user: User = {
          id: 1,
          name: 'Admin',
          email,
        };

          localStorage.setItem(this.storageKey, JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
}

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.currentUserSubject.next(null);
  }

  private getStoredUser(): User | null {
    const storedUser = localStorage.getItem(this.storageKey);

    if (!storedUser) {
      return null;
    }

    return JSON.parse(storedUser) as User;
  }
}
