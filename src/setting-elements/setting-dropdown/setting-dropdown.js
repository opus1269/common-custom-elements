/**
 * @module els/common/setting_elements
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, listen, property, query } from '@polymer/decorators/lib/decorators';
import { html } from '@polymer/polymer/polymer-element';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/app-storage/app-localstorage/app-localstorage-document';
import { SettingBase } from '../setting-base/setting-base';
import * as ChromeGA from '@opus1269/chrome-ext-utils/src/analytics';
/** Polymer element to select an item from a list */
let SettingDropdownElement = class SettingDropdownElement extends SettingBase {
    /** Polymer element to select an item from a list */
    constructor() {
        super(...arguments);
        /** Selected menu item index */
        this.value = 0;
        /** Descriptive label */
        this.label = '';
        /** Array of Menu item labels */
        this.items = [];
    }
    /**
     * menu item tapped
     *
     * @param ev - tap event
     * @event
     */
    onItemSelected(ev) {
        const model = this.template.modelForElement(ev.target);
        if (model) {
            ChromeGA.event(ChromeGA.EVENT.MENU, `${this.name}: ${model.get('index')}`);
        }
    }
    /**
     * Override mainContent from {@link SettingBase}
     */
    static get mainContent() {
        // language=HTML format=false
        return html `<style include="shared-styles iron-flex iron-flex-alignment">
  :host {
    display: block;
  }

  :host([disabled]) {
    pointer-events: none;
  }


  :host([indent]) .setting-label {
    padding-left: 8px;
  }

  :host .top {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  :host paper-dropdown-menu {
    width: 175px;

    --paper-input-container-input: {
      text-align: right;
    };
  }

</style>

<paper-item class="top center horizontal layout" tabindex="-1">
  <div class="setting-label flex">[[label]]</div>
  <paper-dropdown-menu disabled$="[[disabled]]" noink="" no-label-float="">
    <paper-listbox id="list" slot="dropdown-content" selected="{{value}}">
      <template id="t" is="dom-repeat" items="[[items]]">
        <paper-item>[[item]]</paper-item>
      </template>
    </paper-listbox>
  </paper-dropdown-menu>
</paper-item>

<app-localstorage-document key="[[name]]" data="{{value}}" storage="window.localStorage">
</app-localstorage-document>
`;
    }
};
__decorate([
    property({ type: Number, notify: true })
], SettingDropdownElement.prototype, "value", void 0);
__decorate([
    property({ type: String })
], SettingDropdownElement.prototype, "label", void 0);
__decorate([
    property({ type: Array })
], SettingDropdownElement.prototype, "items", void 0);
__decorate([
    query('#t')
], SettingDropdownElement.prototype, "template", void 0);
__decorate([
    listen('tap', 'list')
], SettingDropdownElement.prototype, "onItemSelected", null);
SettingDropdownElement = __decorate([
    customElement('setting-dropdown')
], SettingDropdownElement);
export { SettingDropdownElement };
