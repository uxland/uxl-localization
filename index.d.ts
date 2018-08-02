declare module '@uxland/uxl-localization/constants' {
	export const locActionNamesFactory: (action: string) => any;
	export default locActionNamesFactory;

}
declare module '@uxland/uxl-localization/formats' {
	import { Action } from "@uxland/uxl-redux/create-action";
	export const formatReducer: (state: any, action: Action<any, any>) => any;
	export const setFormatsActionCreator: any;

}
declare module '@uxland/uxl-localization/language' {
	import { Action } from "@uxland/uxl-redux/create-action";
	export const languageReducer: (state: any, action: Action<any, any>) => any;
	export const setLanguageActionCreator: any;

}
declare module '@uxland/uxl-localization/locales' {
	import { Action } from "@uxland/uxl-redux/create-action";
	export const localesReducer: (state: any, action: Action<Object, any>) => any;
	export const setLocalesActionCreator: any;

}
declare module '@uxland/uxl-localization/reducer' {
	import { Reducer } from "redux";
	export interface LocalizationState {
	    formats: any;
	    language: string;
	    locales: Object;
	}
	export const reducer: Reducer;
	export default reducer;

}
declare module '@uxland/uxl-localization/selectors' {
	import { LocalizationState } from '@uxland/uxl-localization/reducer';
	export interface LocalizationSelectors {
	    localizationSelector: (state: any) => LocalizationState;
	    formatsSelector: (state: any) => string;
	    languageSelector: (state: any) => string;
	    localesSelector: (state: any) => Object;
	}
	export interface AppLocalizationState {
	    localization: LocalizationState;
	}
	export const localizationSelectors: LocalizationSelectors;
	export const setLocalizationSelector: (selector: (state: any) => LocalizationState) => void;
	export default localizationSelectors;

}
declare module '@uxland/uxl-localization/localizer-factory' {
	export type Localizer = (key: string, ...args: any[]) => string;
	export type LocalizerFactory = (language: string, locales: Object, formats: any, useKeyIfMissing: boolean) => Localizer;
	export const localizerFactory: LocalizerFactory;
	export default localizerFactory;

}
declare module '@uxland/uxl-localization/create-localizer' {
	import { AnyAction, Store } from "redux";
	import { LocalizationSelectors } from '@uxland/uxl-localization/selectors';
	import { LocalizerFactory } from '@uxland/uxl-localization/localizer-factory';
	export const createLocalizer: (store: Store<any, AnyAction>, localizerFactory: LocalizerFactory, selectors: LocalizationSelectors, useKeyIfMissing?: boolean) => (key: string, ...args: any[]) => string;
	export default createLocalizer;

}

declare module '@uxland/uxl-localization'{
	export * from '@uxland/uxl-localization/constants';
	export * from '@uxland/uxl-localization/formats';
	export * from '@uxland/uxl-localization/language';
	export * from '@uxland/uxl-localization/locales';
	export * from '@uxland/uxl-localization/reducer';
	export * from '@uxland/uxl-localization/selectors';
	export * from '@uxland/uxl-localization/localizer-factory';
	export * from '@uxland/uxl-localization/create-localizer';
}