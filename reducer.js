import { combineReducers } from "redux";
import { formatReducer } from "./formats";
import { languageReducer } from "./language";
import { localesReducer } from "./locales";
export const reducer = combineReducers({ formats: formatReducer, language: languageReducer, locales: localesReducer });
export default reducer;
//# sourceMappingURL=reducer.js.map