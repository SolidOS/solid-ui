import { Account, AuthContext } from '../../lib/auth';
export default class StorybookAuth implements AuthContext {
    initialized: boolean;
    account: Account | null;
    login(loginUrl?: string): Promise<void>;
    signup(): Promise<void>;
    logout(): Promise<void>;
    onSessionUpdated(): () => undefined;
}
//# sourceMappingURL=StorybookAuth.d.ts.map