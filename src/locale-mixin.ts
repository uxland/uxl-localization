import { reduxMixin } from "@uxland/uxl-redux/redux-mixin";
import { dedupingMixin } from "@polymer/polymer/lib/utils/mixin";
import { computed, property } from "@uxland/uxl-polymer2-ts";
import { LocalizationSelectors } from "./selectors";
import "intl-messageformat";
import { Localizer, LocalizerFactory } from "./localizer-factory";

export interface ILocalization {
    localize: Localizer;
    useKeyIfMissing: boolean;
    formats: any;
    language: string;
    locales: Object;
}

export interface ILocalizationMixin<T> extends ILocalization, Node {
    new (): ILocalizationMixin<T> & T;
}

export const localeMixin = (store, selectors: LocalizationSelectors, factory: LocalizerFactory) =>
    dedupingMixin(p => {
        class LocaleMixin extends reduxMixin(store)(p) {
            private cachedMessages = {};
            @property({ statePath: selectors.formatsSelector })
            formats: any;
            @property({ statePath: selectors.languageSelector })
            language: string;
            @property({ statePath: selectors.localesSelector })
            locales: Object;
            @property() useKeyIfMissing: boolean = true;
            localize: (key: string, ...args: any[]) => string;
            @computed("localize", ["formats", "language", "locales", "useKeyIfMissing"])
            private computeLocalize(formats: any, language: string, locales: Object, useKeyIfMissing: boolean) {
                return factory(language, locales, formats, useKeyIfMissing);
            }
        }
        return LocaleMixin;
    });

export default localeMixin;
