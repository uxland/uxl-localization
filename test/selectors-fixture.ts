import {AppLocalizationState, localizationSelectors, setLocalizationSelector} from "../src/selectors";

const assert = chai.assert;
suite('formats-fixture', () => {
    const setFormatsActionName = 'uxl-localization:set-formats:action';
    test('default localization selector', () => {
        const state: AppLocalizationState = {localization: {formats: null, language: null, locales: {}}}
        assert.strictEqual(localizationSelectors.localizationSelector(state), state.localization);
        assert.strictEqual(localizationSelectors.formatsSelector(state), state.localization.formats);
        assert.strictEqual(localizationSelectors.languageSelector(state), state.localization.language);
        assert.strictEqual(localizationSelectors.localesSelector(state), state.localization.locales);
    });
    test('set localization selector', () => {
        const state = {aux:{aux:{formats: null, language: null, locales: {}}}};
        const selector = s => s.aux.aux;
        setLocalizationSelector(selector);
        assert.strictEqual(localizationSelectors.localizationSelector(state), state.aux.aux);
        assert.strictEqual(localizationSelectors.formatsSelector(state), state.aux.aux.formats);
        assert.strictEqual(localizationSelectors.languageSelector(state), state.aux.aux.language);
        assert.strictEqual(localizationSelectors.localesSelector(state), state.aux.aux.locales);
    });
});