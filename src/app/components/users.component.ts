import { Component } from '@angular/core';

import { IntercomService } from "../utils/intercom.service";
import { USERS, USER_RESULT } from "../utils/event-literals";

@Component({
  selector: 'github-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users;
  
  constructor(private intercom:IntercomService) {
    this.intercom.subscribe(USER_RESULT, this.onUserResult.bind(this));
  }
  
  onGetUsers() {
    let event = {
      type: USERS
    }
    
    this.intercom.dispatch(event);
  }
  
  onUserResult(event) {
    this.users = event.payload;
  }
}
