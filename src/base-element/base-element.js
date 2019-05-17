/**
 * Custom element
 *
 * @module els/common/base_element
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/** */
/*
 ~ Copyright (c) 2016-2017, Michael A. Updike All rights reserved.
 ~ Licensed under Apache 2.0
 ~ https://opensource.org/licenses/Apache-2.0
 ~ https://goo.gl/wFvBM1
 */
import { customElement } from '@polymer/decorators/lib/decorators.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { DeclarativeEventListeners } from '@polymer/decorators/lib/declarative-event-listeners.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '@polymer/paper-styles/color.js';
import '@polymer/paper-styles/typography.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../shared-styles.js';
import { I8nMixin } from '../mixins/i8n_mixin.js';
/**
 * Base element for all our PolymerElements
 *
 * Implements the internationalization mixin and adds support for the '@listen' decorator.
 * It also includes all the basic polymer stuff
 */
let BaseElement = class BaseElement extends I8nMixin(GestureEventListeners(DeclarativeEventListeners(PolymerElement))) {
    /**
     * Dispatch an event
     *
     * @param name - event name
     * @param detailValue - optional value
     */
    fireEvent(name, detailValue) {
        let customEvent;
        if (detailValue !== undefined) {
            customEvent = new CustomEvent(name, {
                bubbles: true,
                composed: true,
                detail: { value: detailValue },
            });
        }
        else {
            customEvent = new CustomEvent(name, {
                bubbles: true,
                composed: true,
            });
        }
        this.dispatchEvent(customEvent);
    }
};
BaseElement = __decorate([
    customElement('base-element')
], BaseElement);
export { BaseElement };
