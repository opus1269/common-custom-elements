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

import {DomRepeat} from '@polymer/polymer/lib/elements/dom-repeat';

import {customElement, listen, property, query} from '@polymer/decorators/lib/decorators.js';
import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';

import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';

import {SettingBase} from '../setting-base/setting-base.js';

import * as ChromeGA from '@opus1269/chrome-ext-utils/src/analytics.js';

/** Polymer element to select an item from a list */
@customElement('setting-dropdown')
export class SettingDropdownElement extends SettingBase {

  /** Selected menu item index */
  @property({type: Number, notify: true})
  protected value = 0;

  /** Descriptive label */
  @property({type: String})
  protected label = '';

  /** Array of Menu item labels */
  @property({type: Array})
  protected items: string[] = [];

  /** paper-listbox template */
  @query('#t')
  protected template: DomRepeat;

  /**
   * menu item tapped
   *
   * @event
   */
  @listen('tap', 'list')
  public onItemSelected(ev: CustomEvent) {
    const model = this.template.modelForElement(ev.target as PolymerElement);
    if (model) {
      ChromeGA.event(ChromeGA.EVENT.MENU, `${this.name}: ${model.get('index')}`);
    }
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
}
