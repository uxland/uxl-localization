import merge from 'lodash-es/merge';
import locActionNamesFactory from "./constants";
import {Action, createAction} from "uxl-redux/create-action";
const setLocaleActionName = locActionNamesFactory('set-locales');
export const localesReducer: (state: any, action: Action<Object, any>) => any =
    (state = {}, action) => action.type === setLocaleActionName ? merge({...state}, action.payload) : state;
export const setLocalesActionCreator = createAction<Object, any>(setLocaleActionName);