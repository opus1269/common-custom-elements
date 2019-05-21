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

import {PaperListboxElement} from '@polymer/paper-listbox/paper-listbox';
import {DomRepeat} from '@polymer/polymer/lib/elements/dom-repeat';

import {customElement, listen, observe, property, query} from '@polymer/decorators/lib/decorators';
import {html} from '@polymer/polymer/polymer-element';

import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/paper-slider/paper-slider';

import '@polymer/app-storage/app-localstorage/app-localstorage-document';

import {SettingBase} from '../setting-base/setting-base';

import * as ChromeGA from '@opus1269/chrome-ext-utils/src/analytics';

/** Unit type */
interface IUnitType {
  /** unit name */
  name: string;
  /** minimum value */
  min: number;
  /** maximum value */
  max: number;
  /** value increment */
  step: number;
  /** conversion factor from the base */
  mult: number;
}

/** Unit value */
export interface IUnitValue {
  /** base value */
  base: number;
  /** display value */
  display: number;
  /** index into {@link IUnitType array} */
  unit: number;
}

/** Polymer element for a url link */
@customElement('setting-slider')
export class SettingSliderElement extends SettingBase {

  /** Unit value */
  @property({type: Object, notify: true, observer: '_valueChanged'})
  protected value: IUnitValue = {base: 10, display: 10, unit: 0};

  /** Descriptive label */
  @property({type: String})
  protected label = '';

  /** The current @link {IUnitType} */
  @property({type: Object, notify: true})
  protected unit: IUnitType = {name: 'unknown', min: 0, max: 1000, step: 1, mult: 1};

  /**
   * Current unit array index
   *
   * @remarks
   * TODO - needs permanent fix
   * Set this to 1 instead of 0 because of obscure bug caused by transitionTime
   * minimum in seconds (index 0) being larger than the others
   */
  @property({type: Number, notify: true})
  protected unitIdx = 1;

  /** Array of {@link IUnitType} */
  @property({type: Array})
  protected units: IUnitType[] = [];

  /** paper-listbox of units */
  @query('#list')
  protected list: PaperListboxElement;

  /** paper-listbox template */
  @query('#t')
  protected template: DomRepeat;

  /**
   * Called during Polymer-specific element initialization.
   * Called once, the first time the element is attached to the document.
   */
  public ready() {
    super.ready();

    setTimeout(() => {
      this.list.selected = this.value.unit;
    }, 0);
  }

  /**
   * Unit menu item tapped
   *
   * @event
   */
  @listen('tap', 'list')
  public onUnitMenuSelected(ev: Event) {
    const model = this.template.modelForElement(ev.target as PaperListboxElement);
    if (model) {
      const unit: IUnitValue = model.get('unit');
      const label = `${this.name}: ${JSON.stringify(unit)}`;
      ChromeGA.event(ChromeGA.EVENT.SLIDER_UNITS, label);
    }
  }

  /**
   * User changed slider value
   *
   * @event
   */
  @listen('change', 'slider')
  public onSliderValueChanged() {
    this.setBase();
    const label = `${this.name}: ${JSON.stringify(this.value)}`;
    ChromeGA.event(ChromeGA.EVENT.SLIDER_VALUE, label);
  }

  /** Selected unit id changed */
  @observe('unitIdx')
  protected unitIdxChanged(newValue: number) {
    if (newValue !== undefined) {
      this.set('value.unit', newValue);
      this.setBase();
      if (this.units !== undefined) {
        this.set('unit', this.units[newValue]);
      }
    }
  }

  /** Simple Observer: Value changed */
  protected _valueChanged(newValue: IUnitValue, oldValue: IUnitValue) {
    if (newValue !== undefined) {
      if (oldValue !== undefined) {
        if (newValue.unit !== oldValue.unit) {
          // set the unit type
          this.list.selected = newValue.unit;
        }
      }
    }
  }

  /** Set the base value */
  protected setBase() {
    const unit = this.units[this.unitIdx];
    const mult = unit.mult;
    let displayValue = this.value.display;

    // make sure base value stays in bounds. if a unit change violates the new units value bounds, the
    // display value is updated in the UI later.
    displayValue = Math.max(displayValue, unit.min);
    displayValue = Math.min(displayValue, unit.max);

    this.set('value.base', mult * displayValue);
  }

  /** Override mainContent from {@link SettingBase} */
  static get mainContent() {
    // language=HTML format=false
    return html`<style include="shared-styles iron-flex iron-flex-alignment">
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
}
