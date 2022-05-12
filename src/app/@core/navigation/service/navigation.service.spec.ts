import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { NavigationService } from "./navigation.service";
import { NavigationPath } from "../common/navigation.interface";

describe("NavigationService", () => {
  let service: NavigationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [NavigationService]
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(NavigationService);
  });

  it("should be home", () => {
    expect(service.getRoute(NavigationPath.Home)).toEqual(["/"]);
  });
});
