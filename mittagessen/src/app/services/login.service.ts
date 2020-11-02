import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() {
  }

  getUser(): Observable<User[]> {
    return of(JSON.parse(localStorage.getItem('mittagessen-user')));
  }

  createUser(name: string, email: string): Observable<User> {
    let user: User[] = JSON.parse(localStorage.getItem('mittagessen-user')) || [];

    user.push({
      name: name,
      email: email,
      role: Role.Besteller,
      id: Math.random().toString(36).slice(2).toUpperCase()
    } as User);

    localStorage.setItem('mittagessen-user', JSON.stringify(user));
    return of(user[user.length - 1] as User);
  }
}

export interface User {
  name: string;
  id: string;
  email: string;
  role: Role;
}

export enum Role {
  Besteller = 'besteller',
  Einkaeufer = 'einkäufer',
}
