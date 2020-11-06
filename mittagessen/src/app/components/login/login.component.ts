import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LoginService, User} from "../../services/login.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public form: FormGroup;
  public loginState: LoginState = LoginState.LOGIN
  public LoginState = LoginState;
  public user: User;
  public users: User[];

  @Output() loginEvent: EventEmitter<User> = new EventEmitter<User>();

  constructor(private readonly loginService: LoginService) {
    this.form = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null),
      email: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(this.loginService.getUser().subscribe(users => {
      this.users = users;
    }));
  }

  onLogin(): void {
    if (this.form.get('id').value) {
      this.loginEvent.emit(this.users.find(user => user.id === this.form.get('id').value));
    } else {
      this.form.markAsTouched();
    }
  }

  onSignUp(): void {
    if (this.form.valid) {
      this.subscriptions.push(this.loginService.createUser(this.form.get('name').value, this.form.get('email').value)
        .subscribe((user: User) => {
          this.user = user;
          this.form.patchValue(this.user);
        }));
    } else {
      this.form.markAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

export enum LoginState {
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP'
}
