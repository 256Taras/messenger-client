import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface AsyncStorage {
  readonly storage: Storage;

  getItem<T>(key: string): Observable<T>;
  setItem<T>(key: string, value: T): void;
  removeItem(key: string): void;
  clear(): void;
}

export const STORAGE_KEY = "LOCAL_STATE";

export abstract class AbstractStorage implements AsyncStorage {
  protected readonly state$!: BehaviorSubject<Record<string, any>>;
  protected key = STORAGE_KEY;

  protected constructor(public readonly storage: Storage) {
    this.state$ = new BehaviorSubject<Record<string, any>>(
      this.getLocalState()
    );
  }

  private get state(): Record<string, any> {
    return this.state$.getValue();
  }

  public get length(): number {
    return Object.keys(this.state).length;
  }

  public clear(): void {
    this.setState({});
  }

  public getItem<T = any>(key: string): Observable<T> {
    return this.state$.pipe(map((state) => state[key] ?? null));
  }

  public removeItem(key: string): void {
    const state = { ...this.state };
    if (key in state) {
      delete state[key];

      this.setState(state);
    }
  }

  public setItem<T = any>(key: string, value: T): void {
    this.setState({ ...this.state$.getValue(), [key]: value });
  }

  protected setState(state: Record<string, any>): void {
    this.state$.next(state);
    this.setLocalState(state);
  }

  protected setLocalState(state: Record<string, any>): void {
    try {
      this.storage.setItem(this.key, JSON.stringify(state));
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error(error);
    }
  }

  protected getLocalState(): Record<string, any> {
    const state = this.storage.getItem(this.key);

    return state ? JSON.parse(state) : {};
  }
}
