import {
  ConnectMixin,
  ConnectMixinConstructor,
  connect,
  watch,
} from "@uxland/lit-redux-connect";
import { MixinFunction, dedupingMixin } from "@uxland/uxl-utilities";
import "intl-messageformat";
import { LitElement, PropertyValues } from "lit";
import { property } from "lit/decorators";
import { Store } from "redux";
import { Localizer, LocalizerFactory } from "./localizer-factory";
import { LocalizationSelectors } from "./selectors";

export interface LocalizationMixin extends LitElement {
  localize: Localizer;
  useKeyIfMissing: boolean;
  formats: any;
  language: string;
  locales: Object;
}
export interface LocalizationMixinConstructor
  extends ConnectMixinConstructor,
    LocalizationMixin {
  new (...args: any[]): LocalizationMixin & LitElement & ConnectMixin;
}
export type LocaleMixinFunction = MixinFunction<LocalizationMixinConstructor>;

export const localeMixin: (
  store: Store<any, any>,
  selectors: LocalizationSelectors,
  factory: LocalizerFactory
) => LocaleMixinFunction = (store, selectors, factory) =>
  dedupingMixin((superClass: ConnectMixinConstructor) => {
    const watchOptions = { store };
    class LocaleMixin
      extends connect(store)(superClass)
      implements LocalizationMixin
    {
      @watch(selectors.formatsSelector, watchOptions)
      formats: any;
      @watch(selectors.languageSelector, watchOptions)
      language: string;
      @watch(selectors.localesSelector, watchOptions)
      locales: Object;
      @property()
      useKeyIfMissing: boolean = true;
      @property()
      localize: Localizer;
      update(changedProps: PropertyValues) {
        if (
          changedProps != null &&
          (changedProps.has("language") ||
            changedProps.has("formats") ||
            changedProps.has("locales") ||
            changedProps.has("useKeyIfMissing"))
        )
          this.localize = factory(
            this.language,
            this.locales,
            this.formats,
            this.useKeyIfMissing
          );

        return super.update(changedProps);
      }
    }
    return <any>LocaleMixin;
  });
