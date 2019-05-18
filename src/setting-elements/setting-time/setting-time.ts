/**
 * @module els/common/setting_elements
 */

/** */

/*
 *  Copyright (c) 2015-2019, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/screensaver/blob/master/LICENSE.md
 */
import {customElement, property} from '@polymer/decorators/lib/decorators';
import {html} from '@polymer/polymer/polymer-element';

import '@polymer/paper-input/paper-input';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-item/paper-item-body';

import '@polymer/app-storage/app-localstorage/app-localstorage-document';

import {SettingBase} from '../setting-base/setting-base';

import {DEF_TIME} from '@opus1269/chrome-ext-utils/src/time';

/** Polymer element for time entry */
@customElement('setting-time')
export class SettingTimeElement extends SettingBase {

  /** Time value '00:00' 24 hr format */
  @property({type: String, notify: true})
  protected value = DEF_TIME;

  /** Descriptive label */
  @property({type: String})
  protected mainLabel = '';

  /** Secondary descriptive label */
  @property({type: String})
  protected secondaryLabel = '';

  /**
   * Override mainContent from {@link SettingBase}
   */
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

  :host iron-label {
    display: block;
    position: relative;
    cursor: pointer;
  }

  :host([indent]) paper-item {
    padding-left: 24px;
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
  <paper-input type="time" min="0:00" max="24:00" required
               class="setting-label" tabindex="-1" value={{value}} disabled$="[[disabled]]"></paper-input>
</paper-item>

<app-localstorage-document key="[[name]]" data="{{value}}" storage="window.localStorage">
</app-localstorage-document>

`;
  }
}
