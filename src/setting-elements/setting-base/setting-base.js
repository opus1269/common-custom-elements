/**
 * Collection of custom elements for setting options
 *
 * @module els/common/setting_elements
 * @preferred
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
import { BaseElement } from '../../base-element/base-element.js';
/** Base class for a family of setting elements */
let SettingBase = class SettingBase extends BaseElement {
    /** Base class for a family of setting elements */
    constructor() {
        super(...arguments);
        /** Element name */
        this.name = 'store';
        /** Optional group title */
        this.sectionTitle = '';
        /** Disabled state of element */
        this.disabled = false;
        /** Visibility state of optional divider */
        this.noseparator = false;
    }
    /**
     * Children override this to set the main content
     *
     * {@link https://polymer-library.polymer-project.org/3.0/docs/devguide/dom-template#inherit}
     */
    static get mainContent() {
        return html `Forget to override mainContent?`;
    }
    static get template() {
        // language=HTML format=false
        return html `
<style include="shared-styles iron-flex iron-flex-alignment">
  :host {
    display: block;
    position: relative;
  }

  :host([disabled]) {
    pointer-events: none;
  }
  
</style>

<div id="test" class="section-title setting-label" tabindex="-1" hidden$="[[!sectionTitle]]">
  [[sectionTitle]]
</div>

<div>${this.mainContent}</div>

<hr class="divider" hidden$="[[noseparator]]">
`;
    }
};
__decorate([
    property({ type: String })
], SettingBase.prototype, "name", void 0);
__decorate([
    property({ type: String })
], SettingBase.prototype, "sectionTitle", void 0);
__decorate([
    property({ type: Boolean })
], SettingBase.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], SettingBase.prototype, "noseparator", void 0);
SettingBase = __decorate([
    customElement('setting-base')
], SettingBase);
export { SettingBase };
