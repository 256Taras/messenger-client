import { Inject, Injectable, Optional } from "@angular/core";

import { ENVIRONMENTS, Environments } from "./environment.interface";
import { ENVIRONMENTS_DEFAULT } from "./environment-constants";

@Injectable({
  providedIn: "root"
})
export class EnvironmentService {
  public constructor(
    @Optional()
    @Inject(ENVIRONMENTS)
    private readonly _environments: Environments
  ) {}

  public getEnvironments(): Environments {
    return this._environments ?? ENVIRONMENTS_DEFAULT;
  }
}
