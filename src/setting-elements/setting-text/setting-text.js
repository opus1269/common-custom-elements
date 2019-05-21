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
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';
import { SettingBase } from '../setting-base/setting-base.js';
import * as ChromeGA from '@opus1269/chrome-ext-utils/src/analytics.js';
/** Polymer element for text entry */
let SettingTextElement = class SettingTextElement extends SettingBase {
    /** Polymer element for text entry */
    constructor() {
        super(...arguments);
        /** Text value */
        this.value = '';
        /** Placeholder text when empty */
        this.placeholder = 'e.g. Text';
        /** Max length of text entry */
        this.maxLength = 16;
    }
    /**
     * Lost focus - fire setting-text-changed event
     *
     * @event
     */
    onBlur() {
        ChromeGA.event(ChromeGA.EVENT.TEXT, this.name);
        this.fireEvent('setting-text-changed', this.value);
    }
    /**
     * keyup - fire setting-text-changed event on 'Enter'
     *
     * @param ev - key event
     * @event
     */
    onKeyUp(ev) {
        // check if 'Enter' was pressed
        if (ev.code === 'Enter') {
            ChromeGA.event(ChromeGA.EVENT.TEXT, this.name);
            this.fireEvent('setting-text-changed', this.value);
        }
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
};
__decorate([
    property({ type: String, notify: true })
], SettingTextElement.prototype, "value", void 0);
__decorate([
    property({ type: String })
], SettingTextElement.prototype, "placeholder", void 0);
__decorate([
    property({ type: Number })
], SettingTextElement.prototype, "maxLength", void 0);
__decorate([
    property({ type: String })
], SettingTextElement.prototype, "mainLabel", void 0);
__decorate([
    property({ type: String })
], SettingTextElement.prototype, "secondaryLabel", void 0);
__decorate([
    listen('blur', 'text')
], SettingTextElement.prototype, "onBlur", null);
__decorate([
    listen('keyup', 'text')
], SettingTextElement.prototype, "onKeyUp", null);
SettingTextElement = __decorate([
    customElement('setting-text')
], SettingTextElement);
export { SettingTextElement };
