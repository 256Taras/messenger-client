import { DebugElement } from "@angular/core";

import { PageObject } from "@core/testing/page.object";
import { GridBreakpointName } from "@shared/utils/grid-breakpoints.util";

import { WrapperComponent } from "./row.component.spec";

enum RowAutomation {
  Row = "row"
}

export class RowComponentPo extends PageObject<WrapperComponent> {
  public get row(): DebugElement | null {
    return this.getByAutomationId(RowAutomation.Row);
  }

  public hasRowClass(className: string): boolean {
    return this.row?.classes[className] ?? false;
  }

  public setMode(mode: string | GridBreakpointName): void {
    if (this.row?.componentInstance) {
      this.row.componentInstance.mode = mode;
    }
  }
}
