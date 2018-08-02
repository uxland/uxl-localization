import * as tslib_1 from "tslib";
import { reduxMixin } from "@uxland/uxl-redux/redux-mixin";
import { dedupingMixin } from "@polymer/polymer/lib/utils/mixin";
import { computed, property } from "@uxland/uxl-polymer2-ts";
import "intl-messageformat";
export const localeMixin = (store, selectors, factory) => dedupingMixin(p => {
    class LocaleMixin extends reduxMixin(store)(p) {
        constructor() {
            super(...arguments);
            this.cachedMessages = {};
            this.useKeyIfMissing = true;
        }
        computeLocalize(formats, language, locales, useKeyIfMissing) {
            return factory(language, locales, formats, useKeyIfMissing);
        }
    }
    tslib_1.__decorate([
        property({ statePath: selectors.formatsSelector }),
        tslib_1.__metadata("design:type", Object)
    ], LocaleMixin.prototype, "formats", void 0);
    tslib_1.__decorate([
        property({ statePath: selectors.languageSelector }),
        tslib_1.__metadata("design:type", String)
    ], LocaleMixin.prototype, "language", void 0);
    tslib_1.__decorate([
        property({ statePath: selectors.localesSelector }),
        tslib_1.__metadata("design:type", Object)
    ], LocaleMixin.prototype, "locales", void 0);
    tslib_1.__decorate([
        property(),
        tslib_1.__metadata("design:type", Boolean)
    ], LocaleMixin.prototype, "useKeyIfMissing", void 0);
    tslib_1.__decorate([
        computed("localize", ["formats", "language", "locales", "useKeyIfMissing"]),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, String, Object, Boolean]),
        tslib_1.__metadata("design:returntype", void 0)
    ], LocaleMixin.prototype, "computeLocalize", null);
    return LocaleMixin;
});
export default localeMixin;
//# sourceMappingURL=locale-mixin.js.map