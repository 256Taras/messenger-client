import { DebugElement } from "@angular/core";
import { PageObject } from "@core/testing/page.object";

import { WrapperComponent } from "./container.component.spec";

enum ContainerAutomation {
  Container = "container"
}

export class ContainerComponentPo extends PageObject<WrapperComponent> {
  public get container(): DebugElement | null {
    return this.getByAutomationId(ContainerAutomation.Container);
  }

  public hasContainerClass(className: string): boolean {
    return this.container?.classes[className] ?? false;
  }

  public setMode(mode: "flex" | "flex-row" | "fluid"): void {
    if (this.container?.componentInstance) {
      this.container.componentInstance.mode = mode;
    }
  }

  public setHeight(height: "max-height"): void {
    if (this.container?.componentInstance) {
      this.container.componentInstance.height = height;
    }
  }
}
