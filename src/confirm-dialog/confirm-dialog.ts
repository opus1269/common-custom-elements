/**
 * Modal dialogs
 *
 * @module els/common/dialogs
 * @preferred
 */

/** */

/*
 *  Copyright (c) 2015-2019, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/screensaver/blob/master/LICENSE.md
 */

import {PaperDialogElement} from '@polymer/paper-dialog/paper-dialog';

import {customElement, listen, property, query} from '@polymer/decorators/lib/decorators.js';
import {html} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-item/paper-item.js';

import '@polymer/neon-animation/animations/fade-out-animation.js';
import '@polymer/neon-animation/animations/scale-up-animation.js';

import {BaseElement} from '../base-element/base-element.js';

import * as ChromeGA from '@opus1269/chrome-ext-utils/src/analytics.js';
import * as ChromeLocale from '@opus1269/chrome-ext-utils/src/locales.js';
import * as ChromeUtils from '@opus1269/chrome-ext-utils/src/utils.js';

/** Polymer dialog to confirm an action */
@customElement('confirm-dialog')
export class ConfirmDialogElement extends BaseElement {

  /** Confirm button label */
  @property({type: String})
  protected confirmLabel = ChromeLocale.localize('ok', 'OK');

  /** paper-dialog */
  @query('#dialog')
  protected dialog: PaperDialogElement;

  /**
   * Dialog confirm button click
   *
   * @event
   */
  @listen('click', 'confirmButton')
  public onConfirmTapped() {
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
  public open(text = 'Continue?', title = 'This operation cannot be undone', confirmLabel = '') {
    if (!ChromeUtils.isWhiteSpace(confirmLabel)) {
      this.set('confirmLabel', confirmLabel);
    }
    text = text.replace(/\n/g, '<br/>');
    this.$.dialogTitle.innerHTML = title;
    this.$.dialogText.innerHTML = text;
    this.dialog.open();
  }

  /** Hide the dialog */
  public close() {
    this.dialog.close();
  }

  static get template() {
    // language=HTML format=false
    return html`<style include="shared-styles iron-flex iron-flex-alignment">
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
}
