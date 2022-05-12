/**
 * Translation storage interface
 */
export abstract class TranslationStorage<T = string> {
  /**
   * Return language from storage
   */
  public abstract getLanguage(): T | null;

  /**
   * Remove language from storage
   */
  public abstract removeLanguage(): void;

  /**
   * Set language to storage
   */
  public abstract setLanguage(language: T): void;
}
