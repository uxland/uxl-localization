import {formatReducer, setFormatsActionCreator} from "../src/formats";

const assert = chai.assert;
suite('formats-fixture', () => {
    const setFormatsActionName = 'uxl-localization:set-formats:action';
    test('reducer initialize formats to null', () => {
        const state = formatReducer(undefined, {type: "any"});
        assert.isNull(state);
    });
    test('reducer sets format', () => {
        let state = formatReducer(undefined, {type: setFormatsActionName, payload: 'formats'});
        assert.equal(state, 'formats');
        const initial = 'initial';
        state = formatReducer(initial, {type: setFormatsActionName, payload: 'formats'});
        assert.notStrictEqual(state, initial);
        assert.equal(state, 'formats');
    });
    test('action creator', () => {
        assert.deepEqual(setFormatsActionCreator(25), {type: setFormatsActionName, payload: 25})
    });
});