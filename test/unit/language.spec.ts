import { languageReducer, setLanguageActionCreator } from "../../src";
import {assert} from 'chai';
describe("language fixture", () => {
    const setFormatsActionName = "uxl-localization:set-language:action";
    it("reducer initialize formats to null", () => {
        const state = languageReducer(undefined, { type: "any" });
        assert.isNull(state);
    });
    it("reducer sets language", () => {
        let state = languageReducer(undefined, { type: setFormatsActionName, payload: "ca" });
        assert.equal(state, "ca");
        const initial = "initial";
        state = languageReducer(initial, { type: setFormatsActionName, payload: "en" });
        assert.notStrictEqual(state, initial);
        assert.equal(state, "en");
    });
    it("action creator", () => {
        assert.deepEqual(setLanguageActionCreator("ca"), { type: setFormatsActionName, payload: "ca" });
    });
});
