/**
 * @module els/common/setting_elements
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, listen, observe, property, query, } from '@polymer/decorators/lib/decorators.js';
import { html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-slider/paper-slider.js';
import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';
import { SettingBase } from '../setting-base/setting-base.js';
import * as ChromeGA from '@opus1269/chrome-ext-utils/src/analytics.js';
/** Polymer element for a url link */
let SettingSliderElement = class SettingSliderElement extends SettingBase {
    /** Polymer element for a url link */
    constructor() {
        super(...arguments);
        /** Unit value */
        this.value = { base: 10, display: 10, unit: 0 };
        /** Descriptive label */
        this.label = '';
        /** The current @link {IUnitType} */
        this.unit = { name: 'unknown', min: 0, max: 1000, step: 1, mult: 1 };
        /**
         * Current unit array index
         *
         * @remarks
         * TODO - needs permanent fix
         * Set this to 1 instead of 0 because of obscure bug caused by transitionTime
         * minimum in seconds (index 0) being larger than the others
         */
        this.unitIdx = 1;
        /** Array of {@link IUnitType} */
        this.units = [];
    }
    /**
     * Called during Polymer-specific element initialization.
     * Called once, the first time the element is attached to the document.
     */
    ready() {
        super.ready();
        setTimeout(() => {
            this.list.selected = this.value.unit;
        }, 0);
    }
    /**
     * Unit menu item tapped
     *
     * @param ev - tap event
     * @event
     */
    onUnitMenuSelected(ev) {
        const model = this.template.modelForElement(ev.target);
        if (model) {
            const unit = model.get('unit');
            const label = `${this.name}: ${JSON.stringify(unit)}`;
            ChromeGA.event(ChromeGA.EVENT.SLIDER_UNITS, label);
        }
    }
    /**
     * User changed slider value
     *
     * @event
     */
    onSliderValueChanged() {
        this._setBase();
        const label = `${this.name}: ${JSON.stringify(this.value)}`;
        ChromeGA.event(ChromeGA.EVENT.SLIDER_VALUE, label);
    }
    /**
     * Unit changed
     */
    unitIdxChanged(newValue) {
        if (newValue !== undefined) {
            this.set('value.unit', newValue);
            this._setBase();
            if (this.units !== undefined) {
                this.set('unit', this.units[newValue]);
            }
        }
    }
    /**
     * Simple Observer: Value changed
     */
    _valueChanged(newValue, oldValue) {
        if (newValue !== undefined) {
            if (oldValue !== undefined) {
                if (newValue.unit !== oldValue.unit) {
                    // set the unit type
                    this.list.selected = newValue.unit;
                }
            }
        }
    }
    /**
     * Set the base value
     */
    _setBase() {
        const unit = this.units[this.unitIdx];
        const mult = unit.mult;
        let displayValue = this.value.display;
        // make sure base value stays in bounds. if a unit change violates the new units value bounds, the
        // display value is updated in the UI later.
        displayValue = Math.max(displayValue, unit.min);
        displayValue = Math.min(displayValue, unit.max);
        this.set('value.base', mult * displayValue);
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

  #label {
    margin: 20px 0 0 0;
    --paper-item-min-height: 0;
  }

  :host paper-slider {
    position: relative;
    margin: 0;
    padding-right: 16px;
    padding-left: 5px;
    cursor: pointer;
  }

  :host > paper-item {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  :host paper-dropdown-menu {
    width: 175px;
    padding-right: 16px;
    --paper-input-container-input: {
      text-align: right;
    };
  }

</style>

<paper-item id="label" class="setting-label" tabindex="-1">
  [[label]]
</paper-item>
<div class="horizontal layout">
  <paper-slider class="flex" id="slider" editable="" value="{{value.display}}"
                min="{{unit.min}}" max="{{unit.max}}" step="{{unit.step}}" disabled$="[[disabled]]"></paper-slider>
  <paper-dropdown-menu disabled$="[[disabled]]" noink="" no-label-float="">
    <paper-listbox id="list" slot="dropdown-content" selected="{{unitIdx}}">
      <template id="t" is="dom-repeat" as="unit" items="[[units]]">
        <paper-item>[[unit.name]]</paper-item>
      </template>
    </paper-listbox>
  </paper-dropdown-menu>
</div>

<app-localstorage-document key="[[name]]" data="{{value}}" storage="window.localStorage">
</app-localstorage-document>
`;
    }
};
__decorate([
    property({ type: Object, notify: true, observer: '_valueChanged' })
], SettingSliderElement.prototype, "value", void 0);
__decorate([
    property({ type: String })
], SettingSliderElement.prototype, "label", void 0);
__decorate([
    property({ type: Object, notify: true })
], SettingSliderElement.prototype, "unit", void 0);
__decorate([
    property({ type: Number, notify: true })
], SettingSliderElement.prototype, "unitIdx", void 0);
__decorate([
    property({ type: Array })
], SettingSliderElement.prototype, "units", void 0);
__decorate([
    query('#list')
], SettingSliderElement.prototype, "list", void 0);
__decorate([
    query('#t')
], SettingSliderElement.prototype, "template", void 0);
__decorate([
    listen('tap', 'list')
], SettingSliderElement.prototype, "onUnitMenuSelected", null);
__decorate([
    listen('change', 'slider')
], SettingSliderElement.prototype, "onSliderValueChanged", null);
__decorate([
    observe('unitIdx')
], SettingSliderElement.prototype, "unitIdxChanged", null);
SettingSliderElement = __decorate([
    customElement('setting-slider')
], SettingSliderElement);
export { SettingSliderElement };
