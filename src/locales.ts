import mergeDeepLeft from 'ramda/es/mergeDeepLeft';
import when from 'ramda/es/when';
import locActionNamesFactory from "./constants";
import {Action, createAction} from "@uxland/uxl-redux";
const setLocaleActionName = locActionNamesFactory('set-locales');
export const localesReducer: (state: any, action: Action<Object, any>) => any =
    (state = {}, action) => when(() => action.type === setLocaleActionName, mergeDeepLeft(action.payload))(state);
export const setLocalesActionCreator = createAction<Object, any>(setLocaleActionName);