import locActionNamesFactory from "./constants";
import {Action, createAction} from "@uxland/uxl-redux";
import {createBasicReducer} from "@uxland/uxl-redux";
const setFormatsActionName = locActionNamesFactory('set-formats');
export const formatReducer: (state: any, action: Action<any, any>) => any = createBasicReducer(setFormatsActionName);
export const setFormatsActionCreator = createAction<any, any>(setFormatsActionName);