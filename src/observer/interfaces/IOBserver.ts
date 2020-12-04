﻿module Observer.Interfaces {

  export interface IObserver {
      receiveNotification(message: object): void;
  }
}