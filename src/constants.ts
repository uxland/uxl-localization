import { actionNameBuilder } from "@uxland/uxl-redux/action-name-builder";
const prefix = "uxl-localization";
export const locActionNamesFactory = (action: string) => {
    const actionsBuilder = actionNameBuilder(prefix);
    return actionsBuilder(action);
};
export default locActionNamesFactory;
