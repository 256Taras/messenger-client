import { Breakpoints } from "@angular/cdk/layout";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { LayoutService } from "@shared/services/layout/layout.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-components",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
  public readonly breakpoints = Breakpoints;

  public layoutType$!: Observable<string>;

  public constructor(private readonly layoutService: LayoutService) {}

  public ngOnInit(): void {
    this.layoutType$ = this.layoutService.layoutType$;
  }
}
