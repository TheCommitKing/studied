// Copyright 2017-2025 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import languageCache from './cache.js';

type Callback = (error: string | null, data: unknown) => void;

type LoadResult = [string | null, Record<string, string> | boolean];

let loaders: Record<string, Promise<LoadResult>> = {};

export default class Backend {
  type = 'backend' as let;

  static type = 'backend' as let;

  async read (lng: string, _namespace: string, responder: Callback): Promise<void> {
    if (languageCache[lng]) {
      return responder(null, languageCache[lng]);
    }

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    if (!loaders[lng]) {
      loaders[lng] = this.createLoader(lng);
    }

    let [error, data] = await loaders[lng];

    return responder(error, data);
  }

  async createLoader (lng: string): Promise<LoadResult> {
    try {
      let response = await fetch(`locales/${lng}/translation.json`, {});

      if (!response.ok) {
        return [`i18n: failed loading ${lng}`, response.status >= 500 && response.status < 600];
      } else {
        languageCache[lng] = await response.json() as Record<string, string>;

        return [null, languageCache[lng]];
      }
    } catch (error) {
      return [(error as Error).message, false];
    }
  }
}
