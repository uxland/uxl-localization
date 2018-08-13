import { reduxMixin } from "@uxland/uxl-redux/redux-mixin";
import { dedupingMixin } from "@polymer/polymer/lib/utils/mixin";
import { property } from "@uxland/uxl-polymer2-ts";
import { LocalizationSelectors } from "./selectors";
import "intl-messageformat";
import { Localizer, LocalizerFactory } from "./localizer-factory";
import {LitElement} from '@polymer/lit-element/lit-element';
import createLocalizer from "./create-localizer";

export interface ILocalization {
    localize: Localizer;
    useKeyIfMissing: boolean;
    formats: any;
    language: string;
    locales: Object;
}

export interface ILocalizationMixin<T> extends ILocalization, LitElement {
    new (): ILocalizationMixin<T> & T;
}

export const localeMixin = <T>(store, selectors: LocalizationSelectors, factory: LocalizerFactory) =>
    dedupingMixin((p: LitElement) => {
        class LocaleMixin extends reduxMixin(store)(p) {
            @property({ statePath: selectors.formatsSelector })
            formats: any;
            @property({ statePath: selectors.languageSelector })
            language: string;
            @property({ statePath: selectors.localesSelector })
            locales: Object;
            @property() useKeyIfMissing: boolean = true;
            localize: Localizer;

            _shouldRender(props: LocaleMixin, changedProps: LocaleMixin, prevProps: LocaleMixin){
                if(Object.getOwnPropertyNames(changedProps).some(k => k === 'language' || k === 'formats' || k === 'locales' || k === 'useKeyIfMissing'))
                    this.localize = factory(changedProps.language, changedProps.locales, changedProps.formats, changedProps.useKeyIfMissing);
                return true;
            }

        }
    return (<any>LocaleMixin) as ILocalizationMixin<T>;
    });

export default localeMixin;
