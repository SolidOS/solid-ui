let e=require("lit");var t=`image/png`,n=class extends e.LitElement{static formAssociated=!0;static properties={label:{type:String,reflect:!0},heading:{type:String,reflect:!0},captureLabel:{type:String,attribute:`capture-label`,reflect:!0},confirmLabel:{type:String,attribute:`confirm-label`,reflect:!0},retakeLabel:{type:String,attribute:`retake-label`,reflect:!0},cancelLabel:{type:String,attribute:`cancel-label`,reflect:!0},presentation:{type:String,reflect:!0},theme:{type:String,reflect:!0},facingMode:{type:String,attribute:`facing-mode`,reflect:!0},constraints:{type:String,reflect:!0},captureFormat:{type:String,attribute:`capture-format`,reflect:!0},captureQuality:{type:Number,attribute:`capture-quality`},open:{type:Boolean,reflect:!0},disabled:{type:Boolean,reflect:!0},name:{type:String,reflect:!0},required:{type:Boolean,reflect:!0},showTrigger:{type:Boolean,attribute:`show-trigger`,reflect:!0},showCancelButton:{type:Boolean,attribute:`show-cancel-button`,reflect:!0},autoCloseOnCapture:{type:Boolean,attribute:`auto-close-on-capture`},fileNamePrefix:{type:String,attribute:`file-name-prefix`,reflect:!0},value:{attribute:!1},mediaConstraints:{attribute:!1},_errorMessage:{state:!0},_previewUrl:{state:!0},_startingPreview:{state:!0}};static styles=e.css`
    :host {
      display: block;
      --photo-capture-trigger-background: var(--lavender-900, #7c4cff);
      --photo-capture-trigger-text: var(--color-header-text, #ffffff);
      --photo-capture-surface: var(--color-background, #ffffff);
      --photo-capture-text: var(--gray-900, #101828);
      --photo-capture-muted-text: var(--gray-600, #4a5565);
      --photo-capture-border: var(--gray-200, #e5e7eb);
      --photo-capture-hover: var(--gray-100, #f3f4f6);
      --photo-capture-shadow: var(--box-shadow-sm, 0 1px 4px rgba(0, 0, 0, 0.12));
      --photo-capture-overlay: rgba(0, 0, 0, 0.6);
      --photo-capture-frame-max-width: 260px;
      --photo-capture-radius: 8px;
      --photo-capture-button-radius: var(--border-radius-base, 0.3125rem);
      --photo-capture-gap: var(--spacing-2xs, 0.625rem);
      color: var(--photo-capture-text);
      box-sizing: border-box;
    }

    :host([theme='dark']) {
      --photo-capture-surface: var(--gray-900, #111827);
      --photo-capture-text: var(--white, #ffffff);
      --photo-capture-muted-text: var(--gray-300, #d1d5dc);
      --photo-capture-border: var(--gray-700, #364153);
      --photo-capture-hover: rgba(255, 255, 255, 0.08);
      --photo-capture-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    .trigger-button,
    .action-button,
    .cancel-button,
    .close-button {
      font: inherit;
      cursor: pointer;
    }

    .trigger-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 35px;
      padding: 0.5rem 0.9rem;
      border: none;
      border-radius: var(--photo-capture-button-radius);
      background: var(--photo-capture-trigger-background);
      color: var(--photo-capture-trigger-text);
      transition: transform 0.2s ease;
    }

    .trigger-button:active {
      transform: translateY(1px);
    }

    .trigger-button:disabled,
    .action-button:disabled,
    .cancel-button:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }

    .inline-root[hidden] {
      display: none;
    }

    .dialog {
      border: none;
      padding: 0;
      background: transparent;
      outline: none;
      overflow: visible;
      max-width: none;
      max-height: none;
    }

    .dialog::backdrop {
      background: var(--photo-capture-overlay);
    }

    .panel {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--photo-capture-gap);
      width: min(100%, 340px);
      padding: 1rem;
      border: 1px solid var(--photo-capture-border);
      border-radius: var(--photo-capture-radius);
      background: var(--photo-capture-surface);
      color: var(--photo-capture-text);
      box-shadow: var(--photo-capture-shadow);
    }

    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      width: 100%;
    }

    .panel-heading {
      margin: 0;
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.4;
    }

    .close-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.75rem;
      height: 1.75rem;
      padding: 0;
      border: none;
      border-radius: 999px;
      background: transparent;
      color: var(--photo-capture-muted-text);
      font-size: 1.125rem;
      line-height: 1;
    }

    .close-button:hover,
    .close-button:focus-visible,
    .action-button:hover,
    .action-button:focus-visible,
    .cancel-button:hover,
    .cancel-button:focus-visible {
      background: var(--photo-capture-hover);
    }

    .viewport {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 200px;
      border-radius: 0.5rem;
      overflow: hidden;
      background: color-mix(in srgb, var(--photo-capture-surface) 92%, #000 8%);
    }

    .viewport video,
    .viewport img {
      display: block;
      width: 100%;
      max-width: var(--photo-capture-frame-max-width);
      height: auto;
      border-radius: 0.5rem;
      margin: 0 auto;
      object-fit: cover;
    }

    .status {
      width: 100%;
      text-align: center;
      color: var(--photo-capture-muted-text);
      font-size: 0.875rem;
    }

    .status.error {
      color: var(--color-error, #b00020);
    }

    .actions {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: var(--photo-capture-gap);
      width: 100%;
    }

    .action-button,
    .cancel-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 2.25rem;
      padding: 0.45rem 0.85rem;
      border-radius: var(--photo-capture-button-radius);
      border: 1px solid var(--photo-capture-border);
      background: var(--photo-capture-surface);
      color: var(--photo-capture-text);
      font-size: var(--font-size-xxs, 0.75rem);
      font-weight: var(--font-weight-xbold, 700);
      line-height: 1.5;
    }

    .action-button--primary {
      background: var(--photo-capture-trigger-background);
      color: var(--photo-capture-trigger-text);
      border-color: transparent;
    }
  `;_value=null;_stream=null;_internals;_associatedForm=null;_handleFormData=e=>{let t=e.formData;!t||!this.name||!this.value||this.disabled||t.append(this.name,this.value,this.value.name)};_handleFormReset=()=>{this._clearValue({emitEvents:!1}),this.open&&this._queuePreviewStart()};get _supportsFormInternals(){return!!this._internals&&typeof this._internals.setFormValue==`function`}constructor(){super(),this.label=`Take Photo`,this.heading=`Take a photo`,this.captureLabel=`Take Photo`,this.confirmLabel=`Use Photo`,this.retakeLabel=`Retake`,this.cancelLabel=`Cancel`,this.presentation=`inline`,this.theme=`light`,this.facingMode=`user`,this.constraints=``,this.captureFormat=t,this.captureQuality=void 0,this.open=!1,this.disabled=!1,this.name=``,this.required=!1,this.showTrigger=!1,this.showCancelButton=!0,this.autoCloseOnCapture=!1,this.fileNamePrefix=``,this.mediaConstraints=void 0,this._errorMessage=``,this._previewUrl=``,this._startingPreview=!1,this._internals=typeof this.attachInternals==`function`?this.attachInternals():null}get value(){return this._value}set value(e){let t=e instanceof File?e:null,n=this._value;n!==t&&(this._value=t,this._syncPreviewFromValue(t),this._syncFormValue(),this._syncValidity(),this.requestUpdate(`value`,n))}get form(){return(this._supportsFormInternals?this._internals?.form:null)??this._associatedForm}get validationMessage(){return(typeof this._internals?.validationMessage==`string`?this._internals.validationMessage:``)||(this.required&&!this.value?`Please capture a photo.`:``)}get willValidate(){return typeof this._internals?.willValidate==`boolean`?this._internals.willValidate:!this.disabled}checkValidity(){return this._internals&&typeof this._internals.checkValidity==`function`?this._internals.checkValidity():!(this.required&&!this.value)}reportValidity(){return this._internals&&typeof this._internals.reportValidity==`function`?this._internals.reportValidity():this.checkValidity()}connectedCallback(){super.connectedCallback(),this._syncAssociatedForm(),this._syncFormValue(),this._syncValidity()}disconnectedCallback(){this._syncAssociatedForm(null),this._stopStream(),this._revokePreviewUrl(),super.disconnectedCallback()}formResetCallback(){this._handleFormReset()}formDisabledCallback(e){this.disabled=e}updated(e){if(this._syncAssociatedForm(),this.presentation===`dialog`){let e=this.shadowRoot?.querySelector(`dialog`);e&&(this.open&&!e.open?e.showModal():!this.open&&e.open&&e.close())}if(e.has(`open`)&&!this.open&&this._stopStream(),this.open&&!this.value&&!this._stream&&!this._startingPreview&&(e.has(`open`)||e.has(`presentation`)||e.has(`_previewUrl`)||e.has(`value`))&&this._queuePreviewStart(),(e.has(`name`)||e.has(`disabled`)||e.has(`value`))&&this._syncFormValue(),(e.has(`required`)||e.has(`disabled`)||e.has(`value`))&&this._syncValidity(),this._stream){let e=this.shadowRoot?.querySelector(`video.capture-preview`);e&&e.srcObject!==this._stream&&(e.srcObject=this._stream)}}_setOpen(e){this.open!==e&&(this.open=e,this.dispatchEvent(new CustomEvent(`open-change`,{detail:{open:e},bubbles:!0,composed:!0})))}_emitError(e,t=`Unable to access the camera`){this._errorMessage=t,this.dispatchEvent(new CustomEvent(`error`,{detail:{error:e,message:t},bubbles:!0,composed:!0}))}_syncAssociatedForm(e=this.closest(`form`)){this._associatedForm!==e&&(this._associatedForm&&(this._associatedForm.removeEventListener(`formdata`,this._handleFormData),this._associatedForm.removeEventListener(`reset`,this._handleFormReset)),this._associatedForm=e,this._associatedForm&&!this._supportsFormInternals&&(this._associatedForm.addEventListener(`formdata`,this._handleFormData),this._associatedForm.addEventListener(`reset`,this._handleFormReset)))}_syncFormValue(){if(!this._supportsFormInternals)return;let e=this._internals;if(e){if(this.disabled||!this.name||!this.value){e.setFormValue(null);return}e.setFormValue(this.value)}}_syncValidity(){if(!(!this._internals||!this._supportsFormInternals||typeof this._internals.setValidity!=`function`)){if(this.disabled||!this.required||this.value){this._internals.setValidity({});return}this._internals.setValidity({valueMissing:!0},`Please capture a photo.`)}}_syncPreviewFromValue(e){this._revokePreviewUrl(),e&&(this._stopStream(),this._previewUrl=URL.createObjectURL(e))}_clearValue(e){this.value=null,this._errorMessage=``,e.emitEvents&&this._dispatchValueEvents()}_dispatchValueEvents(){let e={value:this.value};this.dispatchEvent(new CustomEvent(`input`,{detail:e,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent(`change`,{detail:e,bubbles:!0,composed:!0}))}_fileExtensionForMimeType(e){switch(e){case`image/jpeg`:return`jpg`;case`image/webp`:return`webp`;case`image/gif`:return`gif`;default:return`png`}}_createFileFromBlob(e){let n=e.type||this.captureFormat||t,r=this._fileExtensionForMimeType(n),i=(this.fileNamePrefix||this.name||`photo`).trim()||`photo`;return new File([e],`${i}-${Date.now()}.${r}`,{type:n})}_queuePreviewStart(){this._startPreview().catch(()=>void 0)}_resolveMediaConstraints(){if(this.mediaConstraints)return this.mediaConstraints;if(this.constraints)try{return JSON.parse(this.constraints)}catch(e){throw Error(`Invalid constraints JSON: ${e.message}`)}return{video:!this.facingMode||{facingMode:{ideal:this.facingMode}}}}async _startPreview(){if(!(!this.open||this.value||this._startingPreview)){if(!navigator.mediaDevices?.getUserMedia){this._emitError(Error(`navigator.mediaDevices.getUserMedia not available`),`Camera access is not available in this browser`);return}this._startingPreview=!0,this._errorMessage=``;try{let e=await navigator.mediaDevices.getUserMedia(this._resolveMediaConstraints());if(!this.open){e.getTracks().forEach(e=>e.stop());return}this._stream=e,this.requestUpdate(),await this.updateComplete;let t=this.shadowRoot?.querySelector(`video.capture-preview`);t&&(t.srcObject=e,await t.play?.().catch(()=>void 0))}catch(e){this._emitError(e,e?.message||`Unable to start the camera preview`)}finally{this._startingPreview=!1}}}_stopStream(){if(!this._stream)return;this._stream.getTracks().forEach(e=>e.stop()),this._stream=null;let e=this.shadowRoot?.querySelector(`video.capture-preview`);e&&(e.srcObject=null)}_revokePreviewUrl(){this._previewUrl&&URL.revokeObjectURL(this._previewUrl),this._previewUrl=``}async _captureSnapshot(){let e=this.shadowRoot?.querySelector(`video.capture-preview`);if(!e)return;let n=e.videoWidth||e.clientWidth||640,r=e.videoHeight||e.clientHeight||480,i=document.createElement(`canvas`);i.width=n,i.height=r;let a=i.getContext(`2d`);if(!a){this._emitError(Error(`Canvas 2D context unavailable`),`Unable to capture a photo in this browser`);return}a.drawImage(e,0,0,n,r);let o=await new Promise(e=>{i.toBlob(e,this.captureFormat||t,this.captureQuality)});if(!o){this._emitError(Error(`Camera snapshot failed`),`Unable to create an image from the current camera frame`);return}this.value=this._createFileFromBlob(o),this._errorMessage=``}async _retakePhoto(){this._clearValue({emitEvents:!0}),await this._startPreview()}_confirmPhoto(){!this.value||!this._previewUrl||(this._dispatchValueEvents(),this.dispatchEvent(new CustomEvent(`photo-captured`,{detail:{file:this.value,blob:this.value,objectUrl:this._previewUrl,contentType:this.value.type||this.captureFormat||t},bubbles:!0,composed:!0})),this.autoCloseOnCapture&&this._setOpen(!1))}_handleCancel(){this._stopStream(),this._clearValue({emitEvents:!1}),this._setOpen(!1),this.dispatchEvent(new CustomEvent(`cancel`,{bubbles:!0,composed:!0}))}_openCapture(){this.disabled||this._setOpen(!0)}_renderViewport(){return this._previewUrl?e.html`<img class="capture-preview" part="preview-image" src="${this._previewUrl}" alt="Captured photo preview" />`:e.html`<video class="capture-preview" part="preview-video" autoplay playsinline muted></video>`}_renderStatus(){return this._errorMessage?e.html`<div class="status error" part="error-message">${this._errorMessage}</div>`:this._startingPreview?e.html`<div class="status" part="status-message">Opening camera…</div>`:this.value?e.html`<div class="status" part="status-message">Review the photo before confirming it.</div>`:e.html`<div class="status" part="status-message">Preview the camera and take a photo when ready.</div>`}_renderActions(){return e.html`
      <div class="actions" part="actions">
        ${this.showCancelButton?e.html`
            <button
              class="cancel-button"
              part="cancel-button"
              type="button"
              @click="${this._handleCancel}"
            >${this.cancelLabel}</button>
          `:e.nothing}

        ${this.value?e.html`
            <button
              class="action-button"
              part="retake-button"
              type="button"
              @click="${this._retakePhoto}"
            >${this.retakeLabel}</button>
            <button
              class="action-button action-button--primary"
              part="confirm-button"
              type="button"
              @click="${this._confirmPhoto}"
            >${this.confirmLabel}</button>
          `:e.html`
            <button
              class="action-button action-button--primary"
              part="capture-button"
              type="button"
              ?disabled="${this._startingPreview||!this._stream}"
              @click="${this._captureSnapshot}"
            >${this.captureLabel}</button>
          `}
      </div>
    `}_renderPanel(){return e.html`
      <div class="panel" part="panel">
        <div class="panel-header" part="header">
          <h2 class="panel-heading" part="heading"><slot name="heading">${this.heading}</slot></h2>
          ${this.showCancelButton?e.html`
              <button
                class="close-button"
                part="close-button"
                type="button"
                aria-label="${this.cancelLabel}"
                @click="${this._handleCancel}"
              >&times;</button>
            `:e.nothing}
        </div>
        <div class="viewport" part="viewport">${this._renderViewport()}</div>
        ${this._renderStatus()}
        ${this._renderActions()}
      </div>
    `}render(){return e.html`
      ${this.showTrigger||this.presentation===`dialog`?e.html`
          <button
            class="trigger-button"
            part="trigger-button"
            type="button"
            ?disabled="${this.disabled}"
            @click="${this._openCapture}"
          ><slot>${this.label}</slot></button>
        `:e.nothing}

      ${this.presentation===`dialog`?e.html`
          <dialog
            class="dialog"
            part="dialog"
            aria-modal="true"
            aria-label="${this.heading}"
            @cancel="${e=>{e.preventDefault(),this._handleCancel()}}"
            @click="${e=>{e.target===e.currentTarget&&this._handleCancel()}}"
          >
            ${this.open?this._renderPanel():e.nothing}
          </dialog>
        `:e.html`
          <div class="inline-root" part="inline-root" ?hidden="${!this.open}">
            ${this.open?this._renderPanel():e.nothing}
          </div>
        `}
    `}};exports.PhotoCapture=n;
//# sourceMappingURL=PhotoCapture.cjs.js.map