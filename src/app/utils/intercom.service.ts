import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class IntercomService {

  private dispatcherMap: Object = {};

  constructor() {}

  dispatch(event) {
    if (event.type && this.dispatcherMap.hasOwnProperty(event.type)) {
      let subject = this.dispatcherMap[event.type];
      subject.emit(event);
    }
  }

  subscribe(eventType, nextFn, errFn = null) {
    if (!this.dispatcherMap.hasOwnProperty(eventType)) {
      this.dispatcherMap[eventType] = new EventEmitter();
    }

    if (!errFn) {
      errFn = (err) => {
        console.log(`Error handled in IntercomService: ${err}`);
      };
    }

    let subscription = this.dispatcherMap[eventType].subscribe(nextFn, errFn);
    return subscription;
  }
}
