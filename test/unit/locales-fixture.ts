import { localesReducer, setLocalesActionCreator } from "../../src/locales";
import {assert} from 'chai';
describe("locales-fixture", () => {
    const setLocalesActionName = "uxl-localization:set-locales:action";
    it("reducer returns state if action is different", () => {
        const current = { ca: { label: "my label" } };
        const state = localesReducer(current, { type: "Other", payload: { ca: { label2: "other label" } } });
        assert.strictEqual(state, current);
    });
    it("reducer initialize locales to empty", () => {
        const state = localesReducer(undefined, { type: "any" });
        assert.deepEqual(state, {});
    });
    it("reducer merges locales", () => {
        const newLocales = {
            ca: {
                level2: {
                    level21: {
                        item211: "myItem211"
                    }
                },
                level3: {
                    level31: "item31"
                }
            }
        };
        let state = localesReducer(undefined, { type: setLocalesActionName, payload: newLocales });
        assert.deepEqual(state, newLocales);
        const currentState = {
            ca: {
                level2: {
                    level21: {
                        item211: "initial",
                        item212: "other item"
                    },
                    level22: {
                        item221: "aux"
                    }
                }
            }
        };
        state = localesReducer(currentState, { type: setLocalesActionName, payload: newLocales });
        assert.deepEqual(state, {
            ca: {
                level2: {
                    level21: {
                        item211: "myItem211",
                        item212: "other item"
                    },
                    level22: {
                        item221: "aux"
                    }
                },
                level3: {
                    level31: "item31"
                }
            }
        });
    });
    it("action creator", () => {
        const locales = { ca: { item: "my item" } };
        const action = setLocalesActionCreator({ ...locales });
        assert.deepEqual(action, { type: setLocalesActionName, payload: locales });
    });
});
