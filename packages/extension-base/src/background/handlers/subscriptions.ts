// Copyright 2019-2025 @polkadot/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* global chrome */

import type { MessageTypesWithSubscriptions, SubscriptionMessageTypes } from '../types.js';

type Subscriptions = Record<string, chrome.runtime.Port>;

let subscriptions: Subscriptions = {};

// return a subscription callback, that will send the data to the caller via the port
export function createSubscription<TMessageType extends MessageTypesWithSubscriptions> (id: string, port: chrome.runtime.Port): (data: SubscriptionMessageTypes[TMessageType]) => void {
  subscriptions[id] = port;

  return (subscription: unknown): void => {
    if (subscriptions[id]) {
      port.postMessage({ id, subscription });
    }
  };
}

// clear a previous subscriber
export function unsubscribe (id: string): void {
  if (subscriptions[id]) {
    console.log(`Unsubscribing from ${id}`);

    delete subscriptions[id];
  } else {
    console.error(`Unable to unsubscribe from ${id}`);
  }
}
