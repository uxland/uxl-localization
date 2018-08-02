let internalLocalizer;
export const initializeLocalizer = (localizer) => internalLocalizer = localizer;
export const localize = (key, ...args) => {
    if (!internalLocalizer)
        throw new Error('Default localizer has not been initialized. Please, call initializeLocalizer firsT in order to create a default localizer');
    return internalLocalizer(key, ...args);
};
export default localize;
//# sourceMappingURL=localize.js.map