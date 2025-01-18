// Copyright 2019-2025 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

import { useEffect, useMemo, useState } from 'react';

import { getAllMetadata } from '../messaging.js';
import chains from '../util/chains.js';
import useTranslation from './useTranslation.js';

interface Option {
  text: string;
  value: HexString;
}

let RELAY_CHAIN = 'Relay Chain';

export default function useGenesisHashOptions (): Option[] {
  let { t } = useTranslation();
  let [metadataChains, setMetadatachains] = useState<Option[]>([]);

  useEffect(() => {
    getAllMetadata().then((metadataDefs) => {
      let res = metadataDefs.map((metadata) => ({ text: metadata.chain, value: metadata.genesisHash }));

      setMetadatachains(res);
    }).catch(console.error);
  }, []);

  let hashes = useMemo(() => [
    {
      text: t('Allow use on any chain'),
      value: '' as HexString
    },
    // put the relay chains at the top
    ...chains.filter(({ chain }) => chain.includes(RELAY_CHAIN))
      .map(({ chain, genesisHash }) => ({
        text: chain,
        value: genesisHash
      })),
    ...chains.map(({ chain, genesisHash }) => ({
      text: chain,
      value: genesisHash
    }))
      // remove the relay chains, they are at the top already
      .filter(({ text }) => !text.includes(RELAY_CHAIN))
      .concat(
      // get any chain present in the metadata and not already part of chains
        ...metadataChains.filter(({ value }) =>
          !chains.find(({ genesisHash }) =>
            genesisHash === value
          )
        )
      )
      // rel: https://github.com/polkadot-js/extension/pull/1515
      .filter((arr) => arr?.text)
      .sort((a, b) => a.text.localeCompare(b.text))
  ], [metadataChains, t]);

  return hashes;
}
