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
import { customElement, property } from '@polymer/decorators/lib/decorators.js';
import { html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';
import { SettingBase } from '../setting-base/setting-base.js';
import { DEF_TIME } from '@opus1269/chrome-ext-utils/src/time.js';
/** Polymer element for time entry */
let SettingTimeElement = class SettingTimeElement extends SettingBase {
    /** Polymer element for time entry */
    constructor() {
        super(...arguments);
        /** Time value '00:00' 24 hr format */
        this.value = DEF_TIME;
        /** Descriptive label */
        this.mainLabel = '';
        /** Secondary descriptive label */
        this.secondaryLabel = '';
    }
    /**
     * Override mainContent from {@link SettingBase}
     */
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
};
__decorate([
    property({ type: String, notify: true })
], SettingTimeElement.prototype, "value", void 0);
__decorate([
    property({ type: String })
], SettingTimeElement.prototype, "mainLabel", void 0);
__decorate([
    property({ type: String })
], SettingTimeElement.prototype, "secondaryLabel", void 0);
SettingTimeElement = __decorate([
    customElement('setting-time')
], SettingTimeElement);
export { SettingTimeElement };
