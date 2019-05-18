/**
 * @module els/common/setting_elements
 */

/** */

/*
 * Copyright (c) 2016-2019, Michael A. Updike All rights reserved.
 * Licensed under Apache 2.0
 * https://opensource.org/licenses/Apache-2.0
 * https://goo.gl/wFvBM1
 */

import {customElement, listen, property} from '@polymer/decorators/lib/decorators';
import {html} from '@polymer/polymer/polymer-element';

import '@polymer/paper-input/paper-input';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-item/paper-item-body';

import '@polymer/app-storage/app-localstorage/app-localstorage-document';

import {SettingBase} from '../setting-base/setting-base';

import * as ChromeGA from '@opus1269/chrome-ext-utils/src/analytics';

/** Polymer element for text entry */
@customElement('setting-text')
export class SettingTextElement extends SettingBase {

  /** Text value */
  @property({type: String, notify: true})
  protected value = '';

  /** Placeholder text when empty */
  @property({type: String})
  protected placeholder = 'e.g. Text';

  /** Max length of text entry */
  @property({type: Number})
  protected maxLength = 16;

  /** Descriptive label */
  @property({type: String})
  protected mainLabel: string;

  /** Secondary descriptive label */
  @property({type: String})
  protected secondaryLabel: string;

  /**
   * Lost focus - fire setting-text-changed event
   *
   * @event
   */
  @listen('blur', 'text')
  public onBlur() {
    ChromeGA.event(ChromeGA.EVENT.TEXT, this.name);
    this.fireEvent('setting-text-changed', this.value);
  }

  /**
   * keyup - fire setting-text-changed event on 'Enter'
   *
   * @param ev - key event
   * @event
   */
  @listen('keyup', 'text')
  public onKeyUp(ev: KeyboardEvent) {
    // check if 'Enter' was pressed
    if (ev.code === 'Enter') {
      ChromeGA.event(ChromeGA.EVENT.TEXT, this.name);
      this.fireEvent('setting-text-changed', this.value);
    }
  }

  /** Override mainContent from {@link SettingBase} */
  static get mainContent() {
    // language=HTML format=false
    return html`<style include="shared-styles iron-flex iron-flex-alignment">
  :host {
    display: block;
    position: relative;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  :host([indent]) paper-item {
    padding-left: 24px;
  }

  :host paper-input {
    width: 175px;

    --paper-input-container-input: {
      text-align: right;
    };
  }

</style>

<paper-item class="center horizontal layout" tabindex="-1">
  <paper-item-body class="flex" two-line="">
    <div class="setting-label" hidden$="[[!mainLabel]]">
      [[mainLabel]]
    </div>
    <div class="setting-label" secondary="" hidden$="[[!secondaryLabel]]">
      [[secondaryLabel]]
    </div>
  </paper-item-body>
  <paper-input id="text" value="{{value}}" minlength="1" maxlength="[[maxLength]]" placeholder="[[placeholder]]"
               tabindex="0" disabled$="[[disabled]]"></paper-input>
</paper-item>

<app-localstorage-document key="[[name]]" data="{{value}}" storage="window.localStorage">
</app-localstorage-document>
`;
  }
}
