/**
 * Modal dialogs
 *
 * @module els/common/dialogs
 */

/** */

/*
 *  Copyright (c) 2015-2019, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/screensaver/blob/master/LICENSE.md
 */

import {PaperDialogElement} from '@polymer/paper-dialog/paper-dialog';

import {customElement, listen, property, query} from '@polymer/decorators/lib/decorators';
import {html} from '@polymer/polymer/polymer-element';

import '@polymer/paper-button/paper-button';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable';
import '@polymer/paper-dialog/paper-dialog';
import '@polymer/paper-item/paper-item';

import '@polymer/neon-animation/animations/fade-out-animation';
import '@polymer/neon-animation/animations/scale-up-animation';

import {BaseElement} from '../base-element/base-element';

/** Polymer dialog to display an error */
@customElement('error-dialog')
export class ErrorDialogElement extends BaseElement {

  /** Display confirm button state */
  @property({type: Boolean, notify: true})
  protected showConfirmButton = false;

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
    this.fireEvent('confirm-tap');
  }

  /**
   * Show the dialog
   *
   * @param title - dialog title
   * @param text - dialog message
   */
  public open(title: string, text: string) {
    title = title || 'Unknown';
    text = text || 'Unknown';
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
    <paper-button dialog-dismiss="" autofocus="">[[localize('close', 'CLOSE')]]</paper-button>
    <paper-button id="confirmButton" dialog-confirm="" hidden$="[[!showConfirmButton]]">
      [[localize('ok', 'OK')]]
    </paper-button>
  </div>
</paper-dialog>
`;
  }
}
