import { reduxMixin } from "@uxland/uxl-redux/redux-mixin";
import { dedupingMixin } from "@polymer/polymer/lib/utils/mixin";
import { property } from "@uxland/uxl-polymer2-ts";
import { LocalizationSelectors } from "./selectors";
import "intl-messageformat";
import { Localizer, LocalizerFactory } from "./localizer-factory";
import {LitElement} from '@polymer/lit-element/lit-element';
import {PropertyValues} from "@polymer/lit-element/lib/updating-element";

export interface ILocalization extends LitElement{
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
    dedupingMixin((p: any) => {
        class LocaleMixin extends reduxMixin(store)(p) {
            @property({ statePath: selectors.formatsSelector })
            formats: any;
            @property({ statePath: selectors.languageSelector })
            language: string;
            @property({ statePath: selectors.localesSelector })
            locales: Object;
            @property()
            useKeyIfMissing: boolean = true;
            @property()
            localize: Localizer;
            update(changedProps: PropertyValues){
                if(changedProps != null && (changedProps.has('language') || changedProps.has('formats') || changedProps.has('locales') || changedProps.has('useKeyIfMissing')))
                    this.localize = factory(this.language, this.locales, this.formats, this.useKeyIfMissing);
                return  super.update(changedProps);
            }

        }
    return (<any>LocaleMixin) as ILocalizationMixin<T>;
    });

export default localeMixin;