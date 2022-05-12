import {
  isPlatformBrowser,
  isPlatformServer,
  isPlatformWorkerApp,
  isPlatformWorkerUi
} from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PlatformService {
  public readonly isBrowser: boolean;
  public readonly isServer: boolean;
  public readonly isWorkerUi: boolean;
  public readonly isWorkerApp: boolean;

  public constructor(@Inject(PLATFORM_ID) private readonly platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isServer = isPlatformServer(this.platformId);
    this.isWorkerUi = isPlatformWorkerUi(this.platformId);
    this.isWorkerApp = isPlatformWorkerApp(this.platformId);
  }
}
