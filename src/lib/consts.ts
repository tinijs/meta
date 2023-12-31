import {TINI_APP_CONTEXT as BASE_TINI_APP_CONTEXT} from '@tinijs/core';

import {Meta} from './main';

export const MODULE_NAME = 'meta';
export const MODULE_ID = `tini:${MODULE_NAME}`;

export const TINI_APP_CONTEXT =
  BASE_TINI_APP_CONTEXT as typeof BASE_TINI_APP_CONTEXT & {
    meta?: Meta;
  };

export const NO_META_ERROR = 'Meta module is not initialized.';
