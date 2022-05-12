import { BrowserTranslateLoader } from "./browser-translate.loader";

describe("BrowserTranslateLoader", () => {
  let loader: BrowserTranslateLoader;

  beforeEach(() => {
    loader = new BrowserTranslateLoader(null as any, null as any);
  });

  it("should create", () => {
    expect(loader).toBeTruthy();
  });
});
