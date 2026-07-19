import { FormControlComponent } from '../../lib/components';
export default class PhotoCapture extends FormControlComponent<File> {
    accessor label: string;
    accessor heading: string;
    accessor captureLabel: string;
    accessor confirmLabel: string;
    accessor retakeLabel: string;
    accessor cancelLabel: string;
    accessor facingMode: string;
    accessor constraints: string;
    accessor captureFormat: string;
    accessor captureQuality: number | undefined;
    accessor showCancelButton: boolean;
    accessor fileNamePrefix: string;
    accessor mediaConstraints: MediaStreamConstraints | undefined;
    protected controlElement: null;
    protected render(): import('lit-html').TemplateResult<1>;
    private onClick;
}
//# sourceMappingURL=PhotoCapture.d.ts.map