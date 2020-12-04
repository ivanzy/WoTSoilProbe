let observers: Observer.Interfaces.ISubject[] = [];

const registerObserver = (theObserver: Observer.Interfaces.ISubject) => {
  observers.push(theObserver);
};

const removeObserver = (theObserver: Observer.Interfaces.ISubject): void => {
  for (let i = 0; i < observers.length; i++) {
    if (observers[i] === theObserver) {
      observers.splice(i, 1);
    }
  }
};

const notify = (command: Observer.Interfaces.ICommand) => {
  for (const subject of observers) {
    if (command.id == subject.id) subject.observer.receiveNotification(command.data);
  }
};

export { registerObserver, removeObserver, notify };
