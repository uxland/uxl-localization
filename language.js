import locActionNamesFactory from "./constants";
import { createAction } from "@uxland/uxl-redux/create-action";
import { createBasicReducer } from "@uxland/uxl-redux/create-basic-reducer";
const setLanguageActionName = locActionNamesFactory('set-language');
export const languageReducer = createBasicReducer(setLanguageActionName);
export const setLanguageActionCreator = createAction(setLanguageActionName);
//# sourceMappingURL=language.js.map