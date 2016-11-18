/**
 * emoji-recovery
 *
 * Copyright © 2016 yahiousun. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import convert from './convert/index';
import codepoints from '../data/codepoints';

// wrong emoji unicode regexp
const WRONG_EMOJI_UNICODE_REGEX = new RegExp(`[${codepoints
                                .slice()
                                .map(item => item
                                  .replace(/1F[a-zA-Z0-9]{3}/g,
                                    match => match.replace(/^1F/, '\\uf')))
                                .join('')}]`,
                                'g',
                              );

function parse(input) {
  return input.replace(WRONG_EMOJI_UNICODE_REGEX,
    char => convert.fromCodePoint(65536 + char.charCodeAt(0)));
}

export default {
  // basic utilities / helpers to convert codepoint
  // to native unicode and vice versa
  convert,
  /**
   * String replacement for `innerHTML` or server side operations
   *  emojiRecovery.parse(string);
   *
   * @name emojiRecovery.parse
   * @function
   * @param {String} replace wrong emoji unicode matches with native unicode.
   * @example
   *  emojiRecovery.parse('Hello\uf601!');
   *  // Hello😁!
   *
   */
  parse,
};
