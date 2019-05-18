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

import {customElement, listen, property} from '@polymer/decorators/lib/decorators';
import {html} from '@polymer/polymer/polymer-element';

import '@polymer/iron-label/iron-label';

import '@polymer/paper-item/paper-item';
import '@polymer/paper-item/paper-item-body';
import '@polymer/paper-ripple/paper-ripple';
import '@polymer/paper-toggle-button/paper-toggle-button';

import '@polymer/app-storage/app-localstorage/app-localstorage-document';

import {SettingBase} from '../setting-base/setting-base';

import * as ChromeGA from '@opus1269/chrome-ext-utils/src/analytics';

/** Polymer element for a toggle button */
@customElement('setting-toggle')
export class SettingToggleElement extends SettingBase {

  /** Checked state */
  @property({type: Boolean, notify: true})
  public checked: boolean;

  /** Descriptive label */
  @property({type: String})
  protected mainLabel: string;

  /** Secondary descriptive label */
  @property({type: String})
  protected secondaryLabel: string;

  /**
   * Set the checked state of the toggle
   *
   * @param checked - checked state
   */
  public setChecked(checked: boolean) {
    this.set('checked', checked);
    ChromeGA.event(ChromeGA.EVENT.TOGGLE, `${this.name}: ${this.checked}`);
  }

  /**
   * Checked state changed
   *
   * @event
   */
  @listen('change', 'toggle')
  public onChange() {
    ChromeGA.event(ChromeGA.EVENT.TOGGLE, `${this.name}: ${this.checked}`);
    this.fireEvent('toggle-change', this.checked);
  }

  /**
   * Item tapped
   *
   * @param ev - Tap event
   * @event
   */
  @listen('tap', 'toggle')
  public onTap(ev: Event) {
    // so tap events only get called once.
    ev.stopPropagation();
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

  :host iron-label {
    display: block;
    position: relative;
    cursor: pointer;
  }

  :host([indent]) paper-item {
    padding-left: 24px;
  }
</style>

<iron-label for="toggle">
  <paper-item class="center horizontal layout" tabindex="-1">
    <paper-item-body class="flex" two-line="">
      <div class="setting-label" hidden$="[[!mainLabel]]">
        [[mainLabel]]
      </div>
      <div class="setting-label" secondary="" hidden$="[[!secondaryLabel]]">
        [[secondaryLabel]]
      </div>
      <paper-ripple center=""></paper-ripple>
    </paper-item-body>
    <paper-toggle-button id="toggle" class="setting-toggle-button" checked="{{checked}}"
                         disabled$="[[disabled]]">
    </paper-toggle-button>
  </paper-item>
</iron-label>

<app-localstorage-document key="[[name]]" data="{{checked}}" storage="window.localStorage">
</app-localstorage-document>

`;
  }
}
