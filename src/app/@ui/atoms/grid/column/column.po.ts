import { DebugElement } from "@angular/core";
import { PageObject } from "@core/testing/page.object";
import { GridBreakpointName } from "@shared/utils/grid-breakpoints.util";

import { WrapperComponent } from "./column.component.spec";

enum ColumnAutomation {
  Column = "column"
}

export class ColumnComponentPo extends PageObject<WrapperComponent> {
  public get column(): DebugElement | null {
    return this.getByAutomationId(ColumnAutomation.Column);
  }

  public hasColumnClass(className: string): boolean {
    return this.column?.classes[className] ?? false;
  }

  public setMode(mode: string | GridBreakpointName): void {
    if (this.column?.componentInstance) {
      this.column.componentInstance.mode = mode;
    }
  }
}
