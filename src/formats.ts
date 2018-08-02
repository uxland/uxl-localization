
import locActionNamesFactory from "./constants";
import {Action, default as createAction} from "@uxland/uxl-redux/create-action";
import {createBasicReducer} from "@uxland/uxl-redux/create-basic-reducer";
const setFormatsActionName = locActionNamesFactory('set-formats');
export const formatReducer: (state: any, action: Action<any, any>) => any = createBasicReducer(setFormatsActionName);
export const setFormatsActionCreator = createAction<any, any>(setFormatsActionName);