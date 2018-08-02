export const createLocalizer = (store, localizerFactory, selectors, useKeyIfMissing = true) => {
    let currentFormats;
    let currentLanguage;
    let currentLocales;
    let localizer;
    const setLocalizer = () => {
        const formats = selectors.formatsSelector(store.getState());
        const language = selectors.languageSelector(store.getState());
        const locales = selectors.localesSelector(store.getState());
        if (formats !== currentFormats || language !== currentLanguage || locales !== currentLocales) {
            currentFormats = formats;
            currentLanguage = language;
            currentLocales = locales;
            localizer = localizerFactory(currentLanguage, currentLocales, currentFormats, useKeyIfMissing);
        }
    };
    store.subscribe(setLocalizer);
    setLocalizer();
    return (key, ...args) => localizer(key, ...args);
};
export default createLocalizer;
//# sourceMappingURL=create-localizer.js.map