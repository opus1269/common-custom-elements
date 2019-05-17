/**
 * Modal dialogs
 *
 * @module els/common/dialogs
 * @preferred
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
import * as ChromeGA from '@opus1269/chrome-ext-utils/src/analytics.js';
import * as ChromeLocale from '@opus1269/chrome-ext-utils/src/locales.js';
import * as ChromeUtils from '@opus1269/chrome-ext-utils/src/utils.js';
/** Polymer dialog to confirm an action */
let ConfirmDialogElement = class ConfirmDialogElement extends BaseElement {
    /** Polymer dialog to confirm an action */
    constructor() {
        super(...arguments);
        /** Confirm button label */
        this.confirmLabel = ChromeLocale.localize('ok', 'OK');
    }
    /**
     * Dialog confirm button click
     *
     * @event
     */
    onConfirmTapped() {
        ChromeGA.event(ChromeGA.EVENT.BUTTON, 'ConfirmDialog.onConfirmTapped');
        this.fireEvent('confirm-tap');
    }
    /**
     * Show the dialog
     *
     * @param title - title
     * @param text - main text
     * @param confirmLabel - label for confirm button
     */
    open(text = 'Continue?', title = 'This operation cannot be undone', confirmLabel = '') {
        if (!ChromeUtils.isWhiteSpace(confirmLabel)) {
            this.set('confirmLabel', confirmLabel);
        }
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
    <paper-button dialog-dismiss="" autofocus="">[[localize('cancel', 'CANCEL')]]</paper-button>
    <paper-button id="confirmButton" dialog-confirm="">[[confirmLabel]]</paper-button>
  </div>
</paper-dialog>
`;
    }
};
__decorate([
    property({ type: String })
], ConfirmDialogElement.prototype, "confirmLabel", void 0);
__decorate([
    query('#dialog')
], ConfirmDialogElement.prototype, "dialog", void 0);
__decorate([
    listen('click', 'confirmButton')
], ConfirmDialogElement.prototype, "onConfirmTapped", null);
ConfirmDialogElement = __decorate([
    customElement('confirm-dialog')
], ConfirmDialogElement);
export { ConfirmDialogElement };
