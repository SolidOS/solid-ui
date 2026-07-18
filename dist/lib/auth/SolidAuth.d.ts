import { default as Account } from './Account';
import { AuthContext } from '.';
export declare const DEFAULT_SIGNUP_URL = "https://solidproject.org/get_a_pod";
export default class SolidAuth implements AuthContext {
    signupUrl: string;
    private _initialized;
    private profileLoaded;
    private listeners;
    constructor(signupUrl?: string);
    initialize(): Promise<void>;
    loadProfile(): Promise<void>;
    get initialized(): boolean;
    get account(): Account | null;
    login(loginUrl?: string): Promise<void>;
    signup(): Promise<void>;
    logout(): Promise<void>;
    onSessionUpdated(callback: () => unknown): () => void;
}
//# sourceMappingURL=SolidAuth.d.ts.map