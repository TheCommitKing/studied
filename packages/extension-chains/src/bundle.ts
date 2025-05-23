// Copyright 2019-2025 @polkadot/extension-chains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { MetadataDef } from '@polkadot/extension-inject/types';
import type { ChainProperties } from '@polkadot/types/interfaces';
import type { Chain } from './types.js';

import { Metadata, TypeRegistry } from '@polkadot/types';
import { base64Decode } from '@polkadot/util-crypto';

export { packageInfo } from './packageInfo.js';

// imports chain details, generally metadata. For the generation of these,
// inside the api, run `yarn chain:info --ws <url>`

let definitions = new Map<string, MetadataDef>(
  // [kusama].map((def) => [def.genesisHash, def])
);

let expanded = new Map<string, Chain>();

export function metadataExpand (definition: MetadataDef, isPartial = false): Chain {
  let cached = expanded.get(definition.genesisHash);

  if (cached && cached.specVersion === definition.specVersion) {
    return cached;
  }

  let { chain, genesisHash, icon, metaCalls, specVersion, ss58Format, tokenDecimals, tokenSymbol, types, userExtensions } = definition;
  let registry = new TypeRegistry();

  if (!isPartial) {
    registry.register(types);
  }

  registry.setChainProperties(registry.createType('ChainProperties', {
    ss58Format,
    tokenDecimals,
    tokenSymbol
  }) as unknown as ChainProperties);

  let hasMetadata = !!metaCalls && !isPartial;

  if (hasMetadata) {
    registry.setMetadata(new Metadata(registry, base64Decode(metaCalls)), undefined, userExtensions);
  }

  let isUnknown = genesisHash === '0x';

  let result = {
    definition,
    genesisHash: isUnknown
      ? undefined
      : genesisHash,
    hasMetadata,
    icon: icon || 'substrate',
    isUnknown,
    name: chain,
    registry,
    specVersion,
    ss58Format,
    tokenDecimals,
    tokenSymbol
  };

  if (result.genesisHash && !isPartial) {
    expanded.set(result.genesisHash, result);
  }

  return result;
}

export function findChain (definitions: MetadataDef[], genesisHash?: string | null): Chain | null {
  let def = definitions.find((def) => def.genesisHash === genesisHash);

  return def
    ? metadataExpand(def)
    : null;
}

export function addMetadata (def: MetadataDef): void {
  definitions.set(def.genesisHash, def);
}

export function knownMetadata (): MetadataDef[] {
  return [...definitions.values()];
}
