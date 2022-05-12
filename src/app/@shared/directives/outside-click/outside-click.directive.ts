import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output
} from "@angular/core";

@Directive({
  selector: "[appOutsideClick]"
})
export class OutsideClickDirective {
  @Output()
  public outsideClick: EventEmitter<MouseEvent> = new EventEmitter();

  public constructor(private readonly _elementRef: ElementRef) {}

  @HostListener("document:mousedown", ["$event"])
  public onClick(event: MouseEvent): void {
    if (!this._elementRef.nativeElement.contains(event.target)) {
      this.outsideClick.emit(event);
    }
  }
}
