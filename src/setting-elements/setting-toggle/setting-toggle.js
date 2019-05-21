/**
 * @module els/common/setting_elements
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/** */
/*
 *  Copyright (c) 2015-2019, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/screensaver/blob/master/LICENSE.md
 */
import { customElement, listen, property } from '@polymer/decorators/lib/decorators.js';
import { html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-label/iron-label.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-ripple/paper-ripple.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';
import { SettingBase } from '../setting-base/setting-base.js';
import * as ChromeGA from '@opus1269/chrome-ext-utils/src/analytics.js';
/** Polymer element for a toggle button */
let SettingToggleElement = class SettingToggleElement extends SettingBase {
    /**
     * Set the checked state of the toggle
     *
     * @param checked - checked state
     */
    setChecked(checked) {
        this.set('checked', checked);
        ChromeGA.event(ChromeGA.EVENT.TOGGLE, `${this.name}: ${this.checked}`);
    }
    /**
     * Checked state changed
     *
     * @event
     */
    onChange() {
        ChromeGA.event(ChromeGA.EVENT.TOGGLE, `${this.name}: ${this.checked}`);
        this.fireEvent('toggle-change', this.checked);
    }
    /**
     * Item tapped
     *
     * @event
     */
    onTap(ev) {
        // so tap events only get called once.
        ev.stopPropagation();
    }
    /** Override mainContent from {@link SettingBase} */
    static get mainContent() {
        // language=HTML format=false
        return html `<style include="shared-styles iron-flex iron-flex-alignment">
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
};
__decorate([
    property({ type: Boolean, notify: true })
], SettingToggleElement.prototype, "checked", void 0);
__decorate([
    property({ type: String })
], SettingToggleElement.prototype, "mainLabel", void 0);
__decorate([
    property({ type: String })
], SettingToggleElement.prototype, "secondaryLabel", void 0);
__decorate([
    listen('change', 'toggle')
], SettingToggleElement.prototype, "onChange", null);
__decorate([
    listen('tap', 'toggle')
], SettingToggleElement.prototype, "onTap", null);
SettingToggleElement = __decorate([
    customElement('setting-toggle')
], SettingToggleElement);
export { SettingToggleElement };
