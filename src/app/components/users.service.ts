import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { IntercomService } from '../utils/intercom.service';
import { USERS, USER_RESULT } from '../utils/event-literals';
import { USERS_URL } from '../utils/constants';

@Injectable()
export class UsersService {
  
  constructor(private intercom:IntercomService, private http:Http) {
    intercom.subscribe(USERS, this.onGetUsers.bind(this));
  }
  
  onGetUsers(event) {
    let randomOffset = Math.floor(Math.random()*500);
    this.http.get(USERS_URL + `?since=${randomOffset}`)
        .map(response => response.json())
        .catch(this.onError.bind(this))
        .subscribe(result => {
          let event = {
            type: USER_RESULT,
            payload: result
          };
          
          this.intercom.dispatch(event);
        });
  }
  
  onError(err) {
    console.log(err);
    return Observable.of([]);
  }
}
