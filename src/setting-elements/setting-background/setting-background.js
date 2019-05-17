/**
 * Custom element
 *
 * @module els/common/setting_elements
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, listen, property, query } from '@polymer/decorators/lib/decorators.js';
import { html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-ripple/paper-ripple.js';
import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';
import { SettingBase } from '../setting-base/setting-base.js';
import * as ChromeGA from '@opus1269/chrome-ext-utils/src/analytics.js';
/** Polymer element to select a background style */
let SettingBackgroundElement = class SettingBackgroundElement extends SettingBase {
    /** Polymer element to select a background style */
    constructor() {
        super(...arguments);
        /** Selected backed style */
        this.value = 'background:linear-gradient(to bottom, #3a3a3a, #b5bdc8)';
        /** Element id of currently selected background style */
        this.selected = 'b1';
        /** Descriptive label */
        this.mainLabel = '';
        /** Secondary descriptive label */
        this.secondaryLabel = '';
    }
    /**
     * Show dialog on tap
     *
     * @event
     */
    onTap() {
        this.dialog.open();
    }
    /**
     * Set selected background on tap of OK button
     *
     * @event
     */
    onOK() {
        const el = this.shadowRoot.getElementById(this.selected);
        if (el) {
            this.set('value', 'background:' + el.style.background);
            ChromeGA.event(ChromeGA.EVENT.BUTTON, `SettingBackground.OK: ${this.selected}`);
        }
    }
    /** Override mainContent from {@link SettingBase} */
    static get mainContent() {
        // language=HTML format=false
        return html `<!--suppress CssUnresolvedCustomProperty -->
<style include="shared-styles iron-flex iron-flex-alignment">
  :host {
    display: block;
    position: relative;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  :host paper-item {
    display: block;
    position: relative;
    cursor: pointer;
  }

  :host([indent]) paper-item {
    padding-left: 24px;
  }

  :host .container {
    width: 440px;
  }

  :host .background {
    width: 200px;
    height: 112px;
    border: 4px solid white;
  }

  :host .iron-selected {
    border: 4px solid var(--setting-item-color);
  }

  :host .selected-background {
    width: 100px;
    height: 56px;
  }

  .selected-background[disabled] {
    opacity: .2;
  }
</style>

<paper-dialog id="dialog" entry-animation="scale-up-animation" exit-animation="fade-out-animation">
  <h2>[[localize('setting_bg_dialog_title')]]</h2>
  <iron-selector class="container horizontal layout wrap" attr-for-selected="id" selected="{{selected}}">
    <div id="b1" class="background" style="background:linear-gradient(to bottom, #3A3A3A, #B5BDC8);"></div>
    <div id="b2" class="background" style="background:linear-gradient(to bottom, #003973 10%, #E5E5BE 90%);"></div>
    <div id="b3" class="background" style="background:linear-gradient(to top, #649173 10%, #DBD5A4 90%);"></div>
    <div id="b4" class="background"
         style="background:radial-gradient(ellipse at center, #EBE9F9 0%, #EBE9F9 23%, #D8D0EF 50%, #CEC7EC 51%, #EBE9F9 77%, #C1BFEA 100%);"></div>
    <div id="b5" class="background"
         style="background:radial-gradient(ellipse farthest-corner at 0px 0px , #FD5C6E 0%, rgba(0, 0, 255, 0) 50%, #0CE4E1 95%);"></div>
    <div id="b6" class="background" style="background:black;"></div>
  </iron-selector>
  <div class="buttons">
    <paper-button dialog-dismiss="">[[localize('cancel')]]</paper-button>
    <paper-button id="confirmButton" dialog-confirm="" autofocus="">
      [[localize('ok')]]
    </paper-button>
  </div>
</paper-dialog>

<paper-item id="item" class="center horizontal layout" tabindex="-1">
  <paper-item-body class="flex" two-line="">
    <div class="setting-label" hidden$="[[!mainLabel]]">
      [[mainLabel]]
    </div>
    <div class="setting-label" secondary="" hidden$="[[!secondaryLabel]]">
      [[secondaryLabel]]
    </div>
  </paper-item-body>
  <div class="selected-background" style$="[[value]]" tabindex="0" disabled$="[[disabled]]"></div>
  <paper-ripple center=""></paper-ripple>
</paper-item>

<app-localstorage-document key="[[name]]" data="{{value}}" storage="window.localStorage">
</app-localstorage-document>
`;
    }
};
__decorate([
    property({ type: String, notify: true })
], SettingBackgroundElement.prototype, "value", void 0);
__decorate([
    property({ type: String, notify: true })
], SettingBackgroundElement.prototype, "selected", void 0);
__decorate([
    property({ type: String })
], SettingBackgroundElement.prototype, "mainLabel", void 0);
__decorate([
    property({ type: String })
], SettingBackgroundElement.prototype, "secondaryLabel", void 0);
__decorate([
    query('#dialog')
], SettingBackgroundElement.prototype, "dialog", void 0);
__decorate([
    listen('tap', 'item')
], SettingBackgroundElement.prototype, "onTap", null);
__decorate([
    listen('tap', 'confirmButton')
], SettingBackgroundElement.prototype, "onOK", null);
SettingBackgroundElement = __decorate([
    customElement('setting-background')
], SettingBackgroundElement);
export { SettingBackgroundElement };
