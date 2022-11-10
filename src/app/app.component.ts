import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationUser, User } from './models/user.model';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private usersService: UsersService) {}

  users$: Observable<User[]> = this.usersService.getUsers();

  onAddUser(user: RegistrationUser) {
    this.usersService.addUser(user).subscribe();
  }
}
