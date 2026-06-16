/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getDefaultExportFromCjs } from './_commonjsHelpers.js';
import { __require as requireLodash_debounce } from '../node_modules/lodash.debounce/index.js';

var lodash_debounceExports = requireLodash_debounce();
var debounce = /*@__PURE__*/getDefaultExportFromCjs(lodash_debounceExports);

export { debounce as default };
