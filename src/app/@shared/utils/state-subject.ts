import { BehaviorSubject, Observable } from "rxjs";

export class StateSubject<T = any> {
  public readonly subject: BehaviorSubject<T>;
  public readonly value$: Observable<T>;

  public get value(): T {
    return this.subject.value;
  }

  public set value(value: T) {
    this.subject.next(value);
  }

  public constructor(initialValue: T) {
    this.subject = new BehaviorSubject(initialValue);
    this.value$ = this.subject.asObservable();
  }
}
