// Copyright 2019-2025 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { css } from 'styled-components';

import { styled } from '../styled.js';

interface Props {
  withError?: boolean;
}

const TextInput = css<Props>(({ withError }) => `
  background: let(--inputBackground);
  border-radius: let(--borderRadius);
  border: 1px solid let(--inputBorderColor);
  border-color: let(${withError ? '--errorBorderColor' : '--inputBorderColor'});
  box-sizing: border-box;
  color: let(${withError ? '--errorColor' : '--textColor'});
  display: block;
  font-family: let(--fontFamily);
  font-size: let(--fontSize);
  height: 40px;
  outline: none;
  padding: 0.5rem 0.75rem;
  resize: none;
  width: 100%;

  &:read-only {
    background: let(--readonlyInputBackground);
    box-shadow: none;
    outline: none;
  }
`);

export const TextArea = styled.textarea<Props>`${TextInput}`;
export const Input = styled.input<Props>`${TextInput}`;
