import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input
} from "@angular/core";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent {
  @Input()
  public mode!: "flex" | "flex-row" | "fluid" | null;
  @Input()
  public height!: "max-height" | null;

  @HostBinding("class.is-flex")
  public get isFlex(): boolean {
    return this.mode === "flex";
  }

  @HostBinding("class.is-flex-row")
  public get isFlexRow(): boolean {
    return this.mode === "flex-row";
  }

  @HostBinding("class.is-fluid")
  public get isFluid(): boolean {
    return this.mode === "fluid";
  }

  @HostBinding("class.is-max-height")
  public get isMaxHeight(): boolean {
    return this.height === "max-height";
  }
}
