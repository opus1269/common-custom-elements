/**
 * Modal dialogs
 *
 * @module els/common/dialogs
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, listen, property, query } from '@polymer/decorators/lib/decorators.js';
import { html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/neon-animation/animations/fade-out-animation.js';
import '@polymer/neon-animation/animations/scale-up-animation.js';
import { BaseElement } from '../base-element/base-element.js';
/** Polymer dialog to display an error */
let ErrorDialogElement = class ErrorDialogElement extends BaseElement {
    /** Polymer dialog to display an error */
    constructor() {
        super(...arguments);
        /** Display confirm button state */
        this.showConfirmButton = false;
    }
    /**
     * Dialog confirm button click
     *
     * @event
     */
    onConfirmTapped() {
        this.fireEvent('confirm-tap');
    }
    /**
     * Show the dialog
     */
    open(title, text) {
        title = title || 'Unknown';
        text = text || 'Unknown';
        text = text.replace(/\n/g, '<br/>');
        this.$.dialogTitle.innerHTML = title;
        this.$.dialogText.innerHTML = text;
        this.dialog.open();
    }
    /**
     * Hide the dialog
     */
    close() {
        this.dialog.close();
    }
    static get template() {
        // language=HTML format=false
        return html `<style include="shared-styles iron-flex iron-flex-alignment">
  :host {
    display: block;
    position: relative;
  }

  .dialog {
    min-width: 25vw;
    max-width: 75vw;
  }
</style>

<paper-dialog id="dialog" class="dialog" modal entry-animation="scale-up-animation" exit-animation="fade-out-animation">
  <h2 id="dialogTitle" class="vertical layout center"></h2>
  <paper-dialog-scrollable>
    <paper-item id="dialogText" class="text"></paper-item>
  </paper-dialog-scrollable>
  <div class="buttons">
    <paper-button dialog-dismiss="" autofocus="">[[localize('close', 'CLOSE')]]</paper-button>
    <paper-button id="confirmButton" dialog-confirm="" hidden$="[[!showConfirmButton]]">
      [[localize('ok', 'OK')]]
    </paper-button>
  </div>
</paper-dialog>
`;
    }
};
__decorate([
    property({ type: Boolean, notify: true })
], ErrorDialogElement.prototype, "showConfirmButton", void 0);
__decorate([
    query('#dialog')
], ErrorDialogElement.prototype, "dialog", void 0);
__decorate([
    listen('click', 'confirmButton')
], ErrorDialogElement.prototype, "onConfirmTapped", null);
ErrorDialogElement = __decorate([
    customElement('error-dialog')
], ErrorDialogElement);
export { ErrorDialogElement };
