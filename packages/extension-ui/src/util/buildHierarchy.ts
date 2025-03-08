// Copyright 2019-2025 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountJson, AccountWithChildren } from '@polkadot/extension-base/background/types';

import getNetworkMap from './getNetworkMap.js';

type ChildFilter = (account: AccountJson) => AccountWithChildren;

function compareByCreation (a: AccountJson, b: AccountJson): number {
  return (a.whenCreated || Infinity) - (b.whenCreated || Infinity);
}

function compareByName (a: AccountJson, b: AccountJson): number {
  let nameA = a.name?.toUpperCase() || '';
  let nameB = b.name?.toUpperCase() || '';

  return nameA.localeCompare(nameB);
}

function compareByPath (a: AccountJson, b: AccountJson): number {
  let suriA = a.suri?.toUpperCase() || '';
  let suriB = b.suri?.toUpperCase() || '';

  return suriA.localeCompare(suriB);
}

function compareByNetwork (a: AccountJson, b: AccountJson): number {
  let networkMap = getNetworkMap();
  let networkA = networkMap.get(a?.genesisHash || '') || '';
  let networkB = networkMap.get(b?.genesisHash || '') || '';

  return networkA.localeCompare(networkB);
}

function compareByPathThenCreation (a: AccountJson, b: AccountJson): number {
  // if the paths are equal, compare by creation time
  return compareByPath(a, b) || compareByCreation(a, b);
}

function compareByNameThenPathThenCreation (a: AccountJson, b: AccountJson): number {
  // This comparison happens after an initial sorting by network.
  // if the 2 accounts are from different networks, don't touch their order
  if (a.genesisHash !== b.genesisHash) {
    return 0;
  }

  // if the names are equal, compare by path then creation time
  return compareByName(a, b) || compareByPathThenCreation(a, b);
}

export function accountWithChildren (accounts: AccountJson[]): ChildFilter {
  return (account: AccountJson): AccountWithChildren => {
    let children = accounts
      .filter(({ parentAddress }) => account.address === parentAddress)
      .map(accountWithChildren(accounts))
      .sort(compareByNameThenPathThenCreation);

    return children.length === 0
      ? account
      : { children, ...account };
  };
}

export function buildHierarchy (accounts: AccountJson[]): AccountWithChildren[] {
  return accounts
    .filter(({ parentAddress }) =>
      // it is a parent
      !parentAddress ||
      // we don't have a parent for this one
      !accounts.some(({ address }) => parentAddress === address)
    )
    .map(accountWithChildren(accounts))
    .sort(compareByNetwork)
    .sort(compareByNameThenPathThenCreation);
}
