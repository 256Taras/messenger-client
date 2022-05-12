import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoggerConfig, LoggerService } from "./logger.service";

@NgModule({
  imports: [CommonModule],
  declarations: []
})
export class LoggerModule {
  public static forRoot(
    config: LoggerConfig
  ): ModuleWithProviders<LoggerModule> {
    return {
      ngModule: LoggerModule,
      providers: [
        LoggerService,
        {
          provide: "LoggerConfig",
          useValue: config
        }
      ]
    };
  }
}
