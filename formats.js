import locActionNamesFactory from "./constants";
import { default as createAction } from "@uxland/uxl-redux/create-action";
import { createBasicReducer } from "@uxland/uxl-redux/create-basic-reducer";
const setFormatsActionName = locActionNamesFactory('set-formats');
export const formatReducer = createBasicReducer(setFormatsActionName);
export const setFormatsActionCreator = createAction(setFormatsActionName);
//# sourceMappingURL=formats.js.map