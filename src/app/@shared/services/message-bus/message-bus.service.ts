import { Injectable } from "@angular/core";
import { filter, map, Observable, Subject } from "rxjs";
import { IMessageType } from "@shared/constants/message-type";

interface IMessage<T = any> {
  channel: string;
  data: T;
}

@Injectable({
  providedIn: "root"
})
export class MessageService {
  private readonly _message$ = new Subject<IMessage>();

  public dispatch<T>(channel: IMessageType, message?: T): void {
    this._message$.next({ channel: channel, data: message });
  }

  public on<T>(channel: IMessageType): Observable<T> {
    return this._message$
      .pipe(filter((m) => m.channel === channel))
      .pipe(map((x) => x.data));
  }
}
