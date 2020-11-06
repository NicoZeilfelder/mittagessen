import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../services/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() user: User;
  @Output() logoutEvent: EventEmitter<User> = new EventEmitter<User>();

  logout(): void {
    this.logoutEvent.emit(null);
  }
}
