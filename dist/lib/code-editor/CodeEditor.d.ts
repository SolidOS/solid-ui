import { ThemeMode } from 'pane-registry';
export declare class CodeEditor {
    private _view;
    private _languageCompartment;
    private _editableCompartment;
    private _onDirtyChange?;
    private _isDirty;
    initialize(container: HTMLElement, initialDoc?: string, contentType?: string, theme?: ThemeMode, onDirtyChange?: (dirty: boolean) => void): Promise<void>;
    destroy(): void;
    getValue(): string;
    replaceContent(text: string): void;
    resetDirtyState(): void;
    setReadOnly(readOnly: boolean): void;
    focusEditor(): void;
    setLanguage(contentType: string): Promise<void>;
    private _getLanguageExtension;
}
//# sourceMappingURL=CodeEditor.d.ts.map