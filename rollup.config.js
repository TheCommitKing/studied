// Copyright 2017-2025 @polkadot/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

import path from 'path';

import { createBundle } from '@polkadot/dev/config/rollup';

let pkgs = [
  '@polkadot/extension-dapp'
];

let external = [
  ...pkgs,
  '@polkadot/networks',
  '@polkadot/util',
  '@polkadot/util-crypto'
];

let entries = ['extension-base', 'extension-chains', 'extension-inject'].reduce((all, p) => ({
  ...all,
  [`@polkadot/${p}`]: path.resolve(process.cwd(), `packages/${p}/build`)
}), {});

let overrides = {};

export default pkgs.map((pkg) => {
  let override = (overrides[pkg] || {});

  return createBundle({
    external,
    pkg,
    ...override,
    entries: {
      ...entries,
      ...(override.entries || {})
    }
  });
});
