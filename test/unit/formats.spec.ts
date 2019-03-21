import { formatReducer, setFormatsActionCreator } from "../../src";
import {assert} from 'chai';
describe("formats-fixture", () => {
    const setFormatsActionName = "uxl-localization:set-formats:action";
    it("reducer initialize formats to null", () => {
        const state = formatReducer(undefined, { type: "any" });
        assert.isNull(state);
    });
    it("reducer sets format", () => {
        let state = formatReducer(undefined, { type: setFormatsActionName, payload: "formats" });
        assert.equal(state, "formats");
        const initial = "initial";
        state = formatReducer(initial, { type: setFormatsActionName, payload: "formats" });
        assert.notStrictEqual(state, initial);
        assert.equal(state, "formats");
    });
    it("action creator", () => {
        assert.deepEqual(setFormatsActionCreator(25), { type: setFormatsActionName, payload: 25 });
    });
});
