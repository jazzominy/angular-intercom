import { Component } from '@angular/core';

import { UsersService } from './components/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private userService: UsersService) {}
}
