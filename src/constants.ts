import { actionNameBuilder } from "@uxland/uxl-redux";
const prefix = "uxl-localization";

export const locActionNamesFactory = (action: string) => {
    const actionsBuilder = actionNameBuilder(prefix);
    return actionsBuilder(action);
};

export default locActionNamesFactory;
