import { ServerTranslateLoader } from "./server-translate.loader";

describe("ServerTranslateLoader", () => {
  let loader: ServerTranslateLoader;

  beforeEach(() => {
    loader = new ServerTranslateLoader(null as any, null as any);
  });

  it("should create", () => {
    expect(loader).toBeTruthy();
  });
});
