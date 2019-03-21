import { LocalizationSelectors, createLocalizer } from "../../src";
import {assert} from 'chai';
import * as sinon from "sinon";
import createMockStore from "redux-mock-store";
describe("locale mixin test suite", () => {
    let mockStore: any;
    let localizationSelectors: LocalizationSelectors;
    const testLocales = {
        ca: { test: { property1: "propietat1" } },
        en: { test: { property1: "property1" } }
    };
    beforeEach(() => {
        sinon.restore();
        mockStore = createMockStore([])();
        localizationSelectors = {
            localizationSelector: null,
            formatsSelector: sinon.stub().returns(null),
            languageSelector: sinon.stub().returns("ca"),
            localesSelector: sinon.stub().returns(testLocales)
        };
    });
    it("create localizer test", () => {
        let spy = sinon.spy();
        createLocalizer(mockStore, spy, localizationSelectors);
        assert.isTrue(spy.calledOnce);
    });
    it("create localizer updates when localization properties change", () => {
        let spy = sinon.spy();
        createLocalizer(mockStore, spy, localizationSelectors);
        assert.isTrue(spy.calledOnce);

        (<sinon.SinonStub>localizationSelectors.languageSelector).returns("en");
        mockStore.dispatch({ type: "aux" });
        assert.isTrue(spy.calledTwice);

        (<sinon.SinonStub>localizationSelectors.localesSelector).returns({ ca: {}, en: {} });
        mockStore.dispatch({ type: "aux" });
        assert.isTrue(spy.calledThrice);

        (<sinon.SinonStub>localizationSelectors.formatsSelector).returns({ ca: {}, en: {} });
        mockStore.dispatch({ type: "aux" });
        assert.isTrue(spy.callCount === 4);
    });
    it("create localizer does not update when localization properties do not change", () => {
        let spy = sinon.spy();
        createLocalizer(mockStore, spy, localizationSelectors);
        assert.isTrue(spy.calledOnce);

        mockStore.dispatch({ type: "aux" });
        assert.isTrue(spy.calledOnce);

        mockStore.dispatch({ type: "aux" });
        assert.isTrue(spy.calledOnce);

        mockStore.dispatch({ type: "aux" });
        assert.isTrue(spy.calledOnce);
    });
});
