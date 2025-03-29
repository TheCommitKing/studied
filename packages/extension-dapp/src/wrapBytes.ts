// Copyright 2019-2025 @polkadot/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { U8A_WRAP_ETHEREUM, U8A_WRAP_POSTFIX, U8A_WRAP_PREFIX, u8aIsWrapped, u8aUnwrapBytes, u8aWrapBytes } from '@polkadot/util';

export let ETHEREUM = U8A_WRAP_ETHEREUM;
export let POSTFIX = U8A_WRAP_POSTFIX;
export let PREFIX = U8A_WRAP_PREFIX;

export let isWrapped = u8aIsWrapped;
export let unwrapBytes = u8aUnwrapBytes;
export let wrapBytes = u8aWrapBytes;
