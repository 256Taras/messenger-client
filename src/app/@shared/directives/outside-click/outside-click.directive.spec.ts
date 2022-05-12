import { OutsideClickDirective } from "./outside-click.directive";
import { ElementRef, Renderer2 } from "@angular/core";
import { TestBed } from "@angular/core/testing";

describe("OutsideClickDirective", () => {
  let directive: OutsideClickDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OutsideClickDirective,
        Renderer2,
        { provide: ElementRef, useClass: { nativeElement: {} } }
      ]
    });
    directive = TestBed.inject(OutsideClickDirective);
  });

  it("should be created", () => {
    expect(directive).toBeTruthy();
  });
});
