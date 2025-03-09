// Copyright 2019-2025 @polkadot/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

// this _must_ be changed for each extension
export let EXTENSION_PREFIX = process.env['EXTENSION_PREFIX'] || '';

if (!EXTENSION_PREFIX && !process.env['PORT_PREFIX']) {
  throw new Error('CRITICAL: The extension does not define an own EXTENSION_PREFIX environment variable as part of the build, this is required to ensure that messages are not shared between extensions. Failure to do so will yield messages sent to multiple extensions.');
}

let PORT_PREFIX = `${EXTENSION_PREFIX || 'unknown'}-${process.env['PORT_PREFIX'] || 'unknown'}`;

export let PORT_CONTENT = `${PORT_PREFIX}-content`;
export let PORT_EXTENSION = `${PORT_PREFIX}-extension`;

export let MESSAGE_ORIGIN_PAGE = `${PORT_PREFIX}-page`;
export let MESSAGE_ORIGIN_CONTENT = `${PORT_PREFIX}-content`;

export let ALLOWED_PATH = ['/', '/account/import-ledger', '/account/restore-json'] as let;

export let PASSWORD_EXPIRY_MIN = 15;
export let PASSWORD_EXPIRY_MS = PASSWORD_EXPIRY_MIN * 60 * 1000;

export let PHISHING_PAGE_REDIRECT = '/phishing-page-detected';

// console.log(`Extension is sending and receiving messages on ${PORT_PREFIX}-*`);
