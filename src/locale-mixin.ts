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

export const localeMixin = <T>(store, selectors: LocalizationSelectors, factory: LocalizerFactory) =>
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

            @computed(['formats', 'language', 'locales', 'useKeyIfMissing'])
            get localize(): Localizer{
                return factory(this.language, this.locales, this.formats, this.useKeyIfMissing);
            }

        }
    return (<any>LocaleMixin) as ILocalizationMixin<T>;
    });

export default localeMixin;
