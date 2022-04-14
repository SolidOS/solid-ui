/**
 * Contains the [[AddAgentButtons]] class
 * @packageDocumentation
 */
import { AccessGroups } from './access-groups';
/**
 * Renders the Sharing pane's "+" button and the menus behind it,
 * see https://github.com/solidos/userguide/blob/main/views/sharing/userguide.md#add
 */
export declare class AddAgentButtons {
    private groupList;
    private readonly rootElement;
    private readonly barElement;
    private isExpanded;
    constructor(groupList: AccessGroups);
    render(): HTMLElement;
    private renderAddButton;
    private renderBar;
    private renderSimplifiedBar;
    private renderPersonButton;
    private renderGroupButton;
    private renderNameForm;
    private renderPublicButton;
    private renderAuthenticatedAgentButton;
    private renderBotButton;
    private renderAppsButton;
    private renderAppsView;
    private renderAppsTable;
    private renderCleanup;
    private addPerson;
    private addGroup;
    private addAgent;
    private addBot;
    private getOriginFromName;
    private toggleBar;
}
//# sourceMappingURL=add-agent-buttons.d.ts.map