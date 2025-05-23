// Copyright 2019-2025 @polkadot/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

export function withErrorLog (fn: () => unknown): void {
  try {
    let p = fn();

    if (p && typeof p === 'object' && typeof (p as Promise<unknown>).catch === 'function') {
      (p as Promise<unknown>).catch(console.error);
    }
  } catch (e) {
    console.error(e);
  }
}
