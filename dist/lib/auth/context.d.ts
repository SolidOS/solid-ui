import { default as NoopAuth } from './NoopAuth';
import { default as Account } from './Account';
export interface AuthContext {
    initialized: boolean;
    account: Account | null;
    login(loginUrl?: string): Promise<void>;
    loadProfile?(): Promise<void>;
    signup(): Promise<void>;
    logout(): Promise<void>;
    onSessionUpdated(callback: () => unknown): () => void;
}
export declare const DEFAULT_AUTH_CONTEXT: NoopAuth;
export declare const authContext: {
    __context__: AuthContext;
};
//# sourceMappingURL=context.d.ts.map