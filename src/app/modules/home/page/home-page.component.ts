import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CookieService } from "@core/storage/services/cookie.service";
import { TranslationService } from "@core/i18n/interfaces/translation-service.interface";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  /**
   * Counter storage key
   */
  public static readonly counterKey = "myCounter";

  /**
   * Counter
   */
  public counter: number;

  public constructor(
    private cookieStorage: CookieService,
    private translationService: TranslationService
  ) {
    const savedCounter = this.cookieStorage.get(HomePageComponent.counterKey);
    this.counter = savedCounter ? +savedCounter : 0;
  }

  /**
   * To increment the counter
   */
  public add(): void {
    this.counter++;
    this.cookieStorage.set(
      HomePageComponent.counterKey,
      this.counter.toString()
    );
  }

  /**
   * Set language
   * @param language Language
   */
  public setLang(language: string): void {
    this.translationService.setLanguage(language);
  }
}
