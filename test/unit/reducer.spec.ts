import { reducer } from "../../src";
import {assert} from 'chai';
describe("reducer fixture", () => {
    it("include formats, language and locales", () => {
        const state = reducer(<any>{}, { type: "@@init" });
        assert.deepEqual(Object.keys(state), ["formats", "language", "locales"]);
    });
});
