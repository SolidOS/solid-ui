import { AuthContext } from './context';
export default class NoopAuth implements AuthContext {
    readonly initialized = false;
    readonly account: null;
    login(): Promise<void>;
    signup(): Promise<void>;
    logout(): Promise<void>;
    onSessionUpdated(): () => undefined;
}
//# sourceMappingURL=NoopAuth.d.ts.map