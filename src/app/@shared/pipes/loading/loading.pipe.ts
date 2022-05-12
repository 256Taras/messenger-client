import { Pipe, PipeTransform } from "@angular/core";
import { isObservable, Observable, of } from "rxjs";
import { catchError, map, startWith } from "rxjs/operators";

interface ILoadingPipeState<T = unknown> {
  loading: boolean;
  value: T | null;
  error: any | null;
}

/**
 * @description - Use custom pipe to show loading when (obs$ | async) binding is not yet resolved.
 * @Example
 * <div *ngIf="obs$ | loading | async as obs">
 *   <ng-template [ngIf]="obs.value">Value: {{ obs.value }}</ng-template>
 *   <ng-template [ngIf]="obs.error">Error {{ obs.error }}</ng-template>
 *   <ng-template [ngIf]="obs.loading">Loading...</ng-template>
 * </div>
 */

@Pipe({
  name: "loading"
})
export class LoadingPipe implements PipeTransform {
  public transform<T>(
    val: Observable<T>
  ): Observable<ILoadingPipeState> | null {
    return isObservable(val)
      ? val.pipe(
          map((value: T) => ({ loading: false, value, error: null })),
          startWith({ loading: true, value: null, error: null }),
          catchError((error) => of({ loading: false, error, value: null }))
        )
      : null;
  }
}
