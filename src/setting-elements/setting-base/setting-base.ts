/**
 * Collection of custom elements for setting options
 *
 * @module els/common/setting_elements
 * @preferred
 */

/** */

/*
 *  Copyright (c) 2015-2019, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/screensaver/blob/master/LICENSE.md
 */

import {customElement, property} from '@polymer/decorators/lib/decorators';
import {html} from '@polymer/polymer/polymer-element';

import {BaseElement} from '../../base-element/base-element';

/** Base class for a family of setting elements */
@customElement('setting-base')
export class SettingBase extends BaseElement {

  /**
   * Children override this to set the main content
   *
   * {@link https://polymer-library.polymer-project.org/3.0/docs/devguide/dom-template#inherit}
   */
  static get mainContent() {
    return html`Forget to override mainContent?`;
  }

  /** Element name */
  @property({type: String})
  protected name = 'store';

  /** Optional group title */
  @property({type: String})
  protected sectionTitle = '';

  /** Disabled state of element */
  @property({type: Boolean})
  protected disabled = false;

  /** Visibility state of optional divider */
  @property({type: Boolean})
  protected noseparator = false;

  static get template() {
    // language=HTML format=false
    return html`
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
}
