
import locActionNamesFactory from "./constants";
import {Action, createAction} from "@uxland/uxl-redux/create-action";
import {createBasicReducer} from "@uxland/uxl-redux/create-basic-reducer";
const setLanguageActionName = locActionNamesFactory('set-language');
export const languageReducer: (state: any, action: Action<any, any>) => any = createBasicReducer(setLanguageActionName);
export const setLanguageActionCreator = createAction<string, any>(setLanguageActionName);