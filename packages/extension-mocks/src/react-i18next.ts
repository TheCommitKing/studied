// Copyright 2019-2025 @polkadot/extension-mocks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type React from 'react';

interface useTranslationReturnObj {
  i18n: { changeLanguage: () => Promise<unknown>; };
  t: (str: string) => string;
}

export let useTranslation = (): useTranslationReturnObj => {
  return {
    i18n: {
      changeLanguage: () => new Promise(() => { /**/ })
    },
    t: (str: string) => str
  };
};

export let withTranslation = () => (component: React.ReactElement): React.ReactElement => component;

export let Trans = ({ children }: { children: React.ReactElement }): React.ReactElement => children;

export default withTranslation;
