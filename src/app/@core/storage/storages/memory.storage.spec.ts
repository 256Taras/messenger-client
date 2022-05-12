import { MemoryStorage } from "./memory.storage";

describe("MemoryStorage", () => {
  let service: MemoryStorage;
  const key = "ver1";
  // eslint-disable-next-line no-undef
  const value = "New Value" as any;

  beforeEach(() => {
    service = new MemoryStorage();
  });

  it("should create", () => {
    expect(service).toBeTruthy();
  });

  it("should return value", () => {
    service.setItem(key, value);
    // eslint-disable-next-line no-undef
    expect(service.getItem(key)).toBe(value);
  });

  it("should return correct length", () => {
    expect(service.length).toBe(0);
    service.setItem(key, value);
    expect(service.length).toBe(1);
  });

  it("should return remove item", () => {
    service.setItem(key, value);
    expect(service.getItem(key)).toBe(value);
    service.removeItem(key);
    expect(service.getItem(key)).toBeNull();
  });

  it("should clear storage", () => {
    service.setItem(key, value);
    service.clear();
    expect(service.length).toBe(0);
  });
});
