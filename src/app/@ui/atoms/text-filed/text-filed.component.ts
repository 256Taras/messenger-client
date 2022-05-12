import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { DestroyService } from "@shared/services/destroy/destroy.service";
import { debounceTime, filter, map, takeUntil, tap } from "rxjs";
import { fromEvent } from "rxjs/internal/observable/fromEvent";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const noop = (_: string): void => {};

/**
 * @see https://angular.io/api/forms/ControlValueAccessor
 */
@Component({
  selector: "app-text-filed",
  templateUrl: "./text-filed.component.html",
  styleUrls: ["./text-filed.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFiledComponent),
      multi: true
    },
    DestroyService
  ]
})
export class TextFiledComponent implements AfterViewInit, ControlValueAccessor {
  /**
   * On touched
   */
  public onTouched: Function = noop;
  /**
   * Input element ref
   */
  @ViewChild("input")
  public input!: ElementRef;

  /**
   * @desc Input change event emitter
   */
  @Output()
  public inputChange = new EventEmitter<string>();

  /**
   * @desc label FIXME: add to template
   */
  @Input()
  public label: string = "";
  /**
   * @desc placeholder
   */
  @Input()
  public placeholder: string = "";

  /**
   * @desc value
   */
  @Input()
  public value: string = "";

  /**
   * @desc time for debounce
   */
  @Input()
  public timeForDebounce: number = 500;

  /**
   * @desc
   */
  public onChange: Function = noop;

  /**
   * @constructor
   * @param _changeDetector {ChangeDetectorRef}
   * @param _destroy$ {DestroyService}
   */
  public constructor(
    private readonly _changeDetector: ChangeDetectorRef,
    private readonly _destroy$: DestroyService
  ) {}

  /**
   * @desc
   * @private
   */
  private _isFocus: boolean = false;
  /**
   * @desc
   */
  public get isFocus(): boolean {
    return this._isFocus;
  }

  /**
   * @desc
   * @param value {boolean}
   */
  public set isFocus(value) {
    this._isFocus = value;
  }

  public onInputValueChange(event: Event): void {
    const targetDivElement = event.target as HTMLInputElement;
    const value = targetDivElement.value;

    this.onChange(value);
  }

  /**
   * @desc  this method is called by the Forms module to write a value into a form control
   * @param { string } value
   */
  public writeValue(value: string): void {
    this.value = value;
    this._changeDetector.detectChanges();
  }

  /**
   * @desc  When a form value changes due to user input, we need to report the value back to the parent form
   * @param fn - function
   */
  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  /***
   * @desc When the user first interacts with the form control, the control is considered to have the status touched, which is useful for styling
   * @param fn
   */
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * @desc
   */
  public ngAfterViewInit(): void {
    this._onInput();
  }

  /**
   * @desc
   * @private
   */
  private _onInput(): void {
    let query: string;
    fromEvent(this.input.nativeElement, "input")
      .pipe(
        tap(() => {
          query = this.input.nativeElement.value;
        }),
        debounceTime(this.timeForDebounce),
        filter(() => query.length > 0),
        map(() => this.inputChange.emit(query)),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }
}
