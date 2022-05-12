import { Pipe, PipeTransform } from "@angular/core";

import { NavigationPath } from "../common/navigation.interface";
import { NavigationService } from "../service/navigation.service";

@Pipe({
  name: "navPath"
})
export class NavPathPipe implements PipeTransform {
  public constructor(private readonly navigationService: NavigationService) {}

  public transform(
    path: NavigationPath,
    params?: Record<string, string | number | undefined>
  ): (string | number)[] {
    return this.navigationService.getRoute(path, params);
  }
}
