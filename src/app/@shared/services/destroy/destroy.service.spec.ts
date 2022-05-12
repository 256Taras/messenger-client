import { TestBed } from "@angular/core/testing";
import { DestroyService } from "@shared/services/destroy/destroy.service";

describe("Destroy service", () => {
  let service: DestroyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestroyService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
