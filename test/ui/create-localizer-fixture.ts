import { LocalizationSelectors } from "../../src";

const assert = chai.assert;
import * as sinon from "sinon";
import createMockStore from "redux-mock-store";
import { createLocalizer } from "../../src/create-localizer";
suite("locale mixin test suite", () => {
    let mockStore: any;
    let fixtureContainer: HTMLDivElement = fixture("test-fixture");
    let localizationSelectors: LocalizationSelectors;
    const testLocales = {
        ca: { test: { property1: "propietat1" } },
        en: { test: { property1: "property1" } }
    };
    setup(() => {
        sinon.restore();
        mockStore = createMockStore([])();
        localizationSelectors = {
            localizationSelector: null,
            formatsSelector: sinon.stub().returns(null),
            languageSelector: sinon.stub().returns("ca"),
            localesSelector: sinon.stub().returns(testLocales)
        };
    });
    test("create localizer test", () => {
        let spy = sinon.spy();
        createLocalizer(mockStore, spy, localizationSelectors);
        assert.isTrue(spy.calledOnce);
    });
    test("create localizer updates when localization properties change", () => {
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
    test("create localizer does not update when localization properties do not change", () => {
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
