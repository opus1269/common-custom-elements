/**
 * Custom element
 *
 * @module els/common/waiter
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, observe, property, query } from '@polymer/decorators/lib/decorators';
import { html } from '@polymer/polymer/polymer-element';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-spinner/paper-spinner';
import { BaseElement } from '../base-element/base-element';
/** Polymer element to display waiter for lengthy operations */
let WaiterElement = class WaiterElement extends BaseElement {
    /** Polymer element to display waiter for lengthy operations */
    constructor() {
        super(...arguments);
        /** Visible and active state */
        this.active = false;
        /** Label to display */
        this.label = 'Working...';
        /** Status Label to display */
        this.statusLabel = '';
    }
    /** Set status label */
    statusLabelChanged() {
        this.status.innerHTML = this.statusLabel.replace(/\n/g, '<br/>');
    }
    static get template() {
        // language=HTML format=false
        return html `<style include="shared-styles iron-flex iron-flex-alignment">
  :host {
    display: block;
    position: relative;
  }

  :host .waiter {
    margin: 40px auto;
  }

  :host paper-item {
    @apply --paper-font-title;
    text-align: center;
  }
</style>

<div class="waiter vertical layout center" hidden$="[[!active]]">
  <paper-spinner active="[[active]]" tabindex="-1"></paper-spinner>
  <paper-item>[[label]]</paper-item>
  <paper-item id="status"></paper-item>
</div>
`;
    }
};
__decorate([
    property({ type: Boolean, notify: true })
], WaiterElement.prototype, "active", void 0);
__decorate([
    property({ type: String, notify: true })
], WaiterElement.prototype, "label", void 0);
__decorate([
    property({ type: String })
], WaiterElement.prototype, "statusLabel", void 0);
__decorate([
    query('#status')
], WaiterElement.prototype, "status", void 0);
__decorate([
    observe('statusLabel')
], WaiterElement.prototype, "statusLabelChanged", null);
WaiterElement = __decorate([
    customElement('waiter-element')
], WaiterElement);
export { WaiterElement };
