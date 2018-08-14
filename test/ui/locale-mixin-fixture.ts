import createMockStore from "redux-mock-store";
import { html, LitElement } from "@polymer/lit-element/lit-element";
import * as sinon from "sinon";
import { SinonStub } from "sinon";
import { customElement, item, property } from "@uxland/uxl-polymer2-ts";
import localeMixin from "../../src/locale-mixin";
import { Store } from "redux";
import { LocalizationSelectors } from "../../src/selectors";
import { LocalizerFactory } from "../../src/localizer-factory";
import { ILocalization } from "../../src/locale-mixin";

const assert = chai.assert;
const should = chai.should();

const fixtureElementName = "test-fixture";
const defaultComponentName = "custom-element";
const getComponentName = (nameBase: string) => {
    let counter = 0;
    return () => `${nameBase}${++counter}`;
};
const getDefaultComponentName = getComponentName(defaultComponentName);

interface DefaultTestComponent extends ILocalization {
    header: HTMLHeadElement;
}

const propertySelector = sinon.spy(state => "Hello from redux state");
const addComponentToFixture = <T>(componentName: string) => {
    const container: HTMLDivElement = fixture(fixtureElementName);
    const component: T = <any>document.createElement(componentName);
    container.appendChild(<any>component);
    return component;
};
const createDefaultComponent: (store: Store, selectors: LocalizationSelectors, factory: LocalizerFactory) => DefaultTestComponent = (
    store,
    selectors,
    factory
) => {
    const componentName = getDefaultComponentName();

    @customElement(componentName)
    class Component extends localeMixin(store, selectors, factory)(LitElement) {

        _render(props: Component){
            return html `<h1 id='header'>${props.localize('test.property1')}</h1>`
        }
        @item("header") header: HTMLHeadElement;
    }

    return addComponentToFixture(componentName);
};

const action = { type: "@@NOP" };

suite("locale mixin test suite", () => {
    let mockStore: any;
    let fixtureContainer: HTMLDivElement = fixture("test-fixture");
    let localesStub: SinonStub, languageStub: SinonStub, formatsStub: SinonStub, factoryStub;
    let selectors: LocalizationSelectors;
    const testLocales = {
        ca: { test: { property1: "propietat1" } },
        en: { test: { property1: "property1" } }
    };
    setup(() => {
        sinon.restore();
        mockStore = createMockStore([])();
        languageStub = sinon.stub().returns("ca");
        localesStub = sinon.stub().returns(testLocales);
        formatsStub = sinon.stub().returns(null);
        factoryStub = sinon.stub().returns((...args) => "hello");
        selectors = {
            localesSelector: localesStub,
            formatsSelector: formatsStub,
            localizationSelector: null,
            languageSelector: languageStub
        };
    });

    test("mixin test", () => {
        let component = createDefaultComponent(mockStore, selectors, factoryStub);
        assert.isNull(component.formats);
        assert.equal(component.language, "ca");
        assert.deepEqual(component.locales, testLocales);
        should.exist(component.localize);
        assert.equal(component.localize("my-key"), "hello");
        assert.isTrue(component.useKeyIfMissing);
        /* assert.equal(component.header.innerText, 'propietat1');*/
    });
    test("localize is recomputed if locales, formats, language or useKeyifMissing properties change", async () => {
        let component = createDefaultComponent(mockStore, selectors, factoryStub);
        await component.renderComplete;
        assert.isTrue(factoryStub.calledOnce);

        languageStub.returns("en");
        mockStore.dispatch(action);
        await component.renderComplete;
        assert.isTrue(factoryStub.calledTwice);
        assert.isTrue(factoryStub.calledWithExactly("en", testLocales, null, true));
        const formats = {};
        formatsStub.returns(formats);
        mockStore.dispatch(action);
        await component.renderComplete;
        assert.isTrue(factoryStub.calledWithExactly("en", testLocales, formats, true));
        assert.isTrue(factoryStub.calledThrice);

        const newLocales = { ca: {}, en: {} };
        localesStub.returns({ ca: {}, en: {} });
        mockStore.dispatch(action);
        await component.renderComplete;
        assert.isTrue(factoryStub.callCount === 4);
        assert.isTrue(factoryStub.calledWithExactly("en", newLocales, formats, true));

        component.useKeyIfMissing = false;
        await component.renderComplete;
        assert.isTrue(factoryStub.callCount === 5);
        assert.isTrue(factoryStub.calledWithExactly("en", newLocales, formats, false));
    });
    test("localize is not recomputed if locales, formats, language or useKeyifMissing properties do not change", async() => {
        let component = createDefaultComponent(mockStore, selectors, factoryStub);
        await component.renderComplete;
        assert.isTrue(factoryStub.calledOnce);

        languageStub.returns("ca");
        mockStore.dispatch(action);
        await component.renderComplete;
        assert.isTrue(factoryStub.calledOnce);

        formatsStub.returns(null);
        mockStore.dispatch(action);
        await component.renderComplete;
        assert.isTrue(factoryStub.calledOnce);

        localesStub.returns(testLocales);
        mockStore.dispatch(action);
        await component.renderComplete;
        assert.isTrue(factoryStub.calledOnce);

        component.useKeyIfMissing = true;
        await component.renderComplete;
        assert.isTrue(factoryStub.calledOnce);
    });
});
