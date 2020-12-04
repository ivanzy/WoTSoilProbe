module Observer.Interfaces {
  export interface ISubject {
    id: number;
    observer: Observer.Interfaces.IObserver;
  }
}
