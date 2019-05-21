/**
 * Custom element
 *
 * @module els/common/base_element
 */

/** */

/*
 *  Copyright (c) 2015-2019, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/screensaver/blob/master/LICENSE.md
 */

import {customElement} from '@polymer/decorators/lib/decorators';
import {PolymerElement} from '@polymer/polymer/polymer-element';

import {DeclarativeEventListeners} from '@polymer/decorators/lib/declarative-event-listeners';
import {GestureEventListeners} from '@polymer/polymer/lib/mixins/gesture-event-listeners';

import '@polymer/paper-styles/color';
import '@polymer/paper-styles/typography';

import '@polymer/iron-flex-layout/iron-flex-layout-classes';

import '../shared-styles';

import {I8nMixin} from '../mixins/i8n_mixin';

/**
 * Base element for all our PolymerElements
 *
 * Implements the internationalization mixin and adds support for the '@listen' decorator.
 * It also includes all the basic polymer stuff
 */
@customElement('base-element')
export class BaseElement extends I8nMixin(GestureEventListeners(DeclarativeEventListeners(PolymerElement))) {

  /**
   * Dispatch an event
   *
   * @param name - event name
   * @param detailValue - optional value
   */
  protected fireEvent(name: string, detailValue?: any) {
    let customEvent;
    if (detailValue !== undefined) {
      customEvent = new CustomEvent(name, {
        bubbles: true,
        composed: true,
        detail: {value: detailValue},
      });
    } else {
      customEvent = new CustomEvent(name, {
        bubbles: true,
        composed: true,
      });
    }
    this.dispatchEvent(customEvent);
  }
}
