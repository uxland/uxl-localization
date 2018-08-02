import { createSelector } from "reselect";
const formatSelectorFactory = localizationSelector => createSelector(localizationSelector, localization => localization.formats);
const languageSelectorFactory = localizationSelector => createSelector(localizationSelector, localization => localization.language);
const localesSelectorFactory = localizationSelector => createSelector(localizationSelector, localization => localization.locales);
const defaultLocalizationSelector = (state) => state.localization;
export const localizationSelectors = {};
export const setLocalizationSelector = selector => {
    localizationSelectors.localizationSelector = selector;
    localizationSelectors.formatsSelector = formatSelectorFactory(selector);
    localizationSelectors.languageSelector = languageSelectorFactory(selector);
    localizationSelectors.localesSelector = localesSelectorFactory(selector);
};
setLocalizationSelector(defaultLocalizationSelector);
export default localizationSelectors;
//# sourceMappingURL=selectors.js.map