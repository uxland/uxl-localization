import merge from 'lodash-es/merge';
import locActionNamesFactory from "./constants";
import { createAction } from "@uxland/uxl-redux/create-action";
const setLocaleActionName = locActionNamesFactory('set-locales');
export const localesReducer = (state = {}, action) => action.type === setLocaleActionName ? merge(Object.assign({}, state), action.payload) : state;
export const setLocalesActionCreator = createAction(setLocaleActionName);
//# sourceMappingURL=locales.js.map