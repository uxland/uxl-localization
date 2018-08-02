import {languageReducer, setLanguageActionCreator} from "../src/language";

const assert = chai.assert;
suite('language fixture', () => {
    const setFormatsActionName = 'uxl-localization:set-language:action';
    test('reducer initialize formats to null', () => {
        const state = languageReducer(undefined, {type: "any"});
        assert.isNull(state);
    });
    test('reducer sets language', () => {
        let state = languageReducer(undefined, {type: setFormatsActionName, payload: 'ca'});
        assert.equal(state, 'ca');
        const initial = 'initial';
        state = languageReducer(initial, {type: setFormatsActionName, payload: 'en'});
        assert.notStrictEqual(state, initial);
        assert.equal(state, 'en');
    });
    test('action creator', () => {
        assert.deepEqual(setLanguageActionCreator('ca'), {type: setFormatsActionName, payload: 'ca'})
    });
});