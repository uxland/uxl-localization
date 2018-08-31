import { reduxMixin } from "@uxland/uxl-redux/redux-mixin";
import { dedupingMixin } from "@polymer/polymer/lib/utils/mixin";
import { property } from "@uxland/uxl-polymer2-ts";
import { LocalizationSelectors } from "./selectors";
import "intl-messageformat";
import { Localizer, LocalizerFactory } from "./localizer-factory";
import {LitElement} from '@polymer/lit-element/lit-element';

export interface ILocalization extends LitElement{
    localize: Localizer;
    useKeyIfMissing: boolean;
    formats: any;
    language: string;
    locales: Object;
}

export interface ILocalizationMixin<T> extends ILocalization {
    new (): ILocalizationMixin<T> & T;
}
export interface LitElementConstructor {
    new(): LitElement;

}

export const localeMixin = <T>(store, selectors: LocalizationSelectors, factory: LocalizerFactory) =>
    dedupingMixin((p: LitElementConstructor) => {
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

            _shouldRender(props: LocaleMixin, changedProps: LocaleMixin){
                if(changedProps != null && Object.getOwnPropertyNames(changedProps).some(k => k === 'language' || k === 'formats' || k === 'locales' || k === 'useKeyIfMissing'))
                    this['__data']['localize'] = factory(props.language, props.locales, props.formats, props.useKeyIfMissing);
                return true;
            }

        }
    return (<any>LocaleMixin) as ILocalizationMixin<T>;
    });

export default localeMixin;