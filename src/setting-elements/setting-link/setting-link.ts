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

import '@polymer/iron-icon/iron-icon';

import '@polymer/paper-item/paper-icon-item';
import '@polymer/paper-ripple/paper-ripple';

import {SettingBase} from '../setting-base/setting-base';

import * as ChromeGA from '@opus1269/chrome-ext-utils/src/analytics';

/** Polymer element for a url link */
@customElement('setting-link')
export class SettingLinkElement extends SettingBase {

  /** Description */
  @property({type: String})
  protected label = '';

  /** Icon */
  @property({type: String})
  protected icon = '';

  /** Link url */
  @property({type: String})
  protected url = '';

  /**
   * Item tapped - show url in new tab
   *
   * @event
   */
  @listen('tap', 'item')
  public onLinkTapped() {
    ChromeGA.event(ChromeGA.EVENT.LINK, this.name);
    chrome.tabs.create({url: this.url});
  }

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

  :host paper-icon-item {
    --paper-item-focused-before: {
      background: transparent;
    };
    --paper-item-selected: {
      background: transparent;
    };
    --paper-item-icon-width: 32px;
    padding-left: 48px;
    padding-top: 4px;
    padding-bottom: 4px;
    cursor: pointer;
  }

  :host .divider {
    margin-left: 48px;
    margin-right: 0;
  }
</style>

<paper-icon-item id="item" class="flex">
  <paper-ripple center=""></paper-ripple>
  <iron-icon class="setting-link-icon" icon="[[icon]]" slot="item-icon"></iron-icon>
  <span class="setting-label">[[label]]</span>
</paper-icon-item>
`;
  }
}
