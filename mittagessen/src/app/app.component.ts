import {Component} from '@angular/core';
import {User} from "./services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public user: User

  setUser(user: User): void {
    this.user = user;
  }
}
