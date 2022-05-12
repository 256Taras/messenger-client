import { Injectable } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { BehaviorSubject, Observable, tap } from "rxjs";

import { LAYOUT_SHORT_TYPES_MAP, LAYOUT_TYPES } from "./layout-constants";

@Injectable({
  providedIn: "root"
})
export class LayoutService {
  private readonly _layoutSubject$ = new BehaviorSubject<string>(
    Breakpoints.Handset
  );

  public constructor(private readonly _breakpointObserver: BreakpointObserver) {
    this._intiSubscribers();
  }

  public get layoutType$(): Observable<string> {
    return this._layoutSubject$.asObservable();
  }

  public get snapshotLayoutType(): string {
    return this._layoutSubject$.value;
  }

  public is(size: string): boolean {
    return size === this.snapshotLayoutType;
  }

  private _intiSubscribers(): void {
    this._breakpointObserver
      .observe(LAYOUT_TYPES)
      .pipe(
        tap((result) => {
          let type;
          for (const query of Object.keys(result.breakpoints)) {
            if (result.breakpoints[query]) {
              type = LAYOUT_SHORT_TYPES_MAP[query];
              break;
            }
          }

          this._layoutSubject$.next(type ?? Breakpoints.Handset);
        })
      )
      .subscribe();
  }
}
