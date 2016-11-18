(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.emojiRecovery = factory());
}(this, (function () { 'use strict';

/**
 * Given an codepoint, returns UTF16 surrogate pairs.
 *
 * @param   string  unicode, i.e. '1f601'
 * @return  string  unicode transformed into utf16 surrogates pair,
 *          i.e. \ud83d\ude01
 *
 * @example
 *  emojiNative.convert.fromCodePoint('1f601');
 *  // "\ud83d\ude01"
 *
 */

function fromCodePoint(input) {
  // convert codepoint to charCode
  var charCode = parseInt(input.toString(16), 16);
  if (charCode >= 0x10000 && charCode <= 0x10FFFF) {
    var high = Math.floor((charCode - 0x10000) / 0x400) + 0xD800;
    var low = (charCode - 0x10000) % 0x400 + 0xDC00;
    return String.fromCharCode(high) + String.fromCharCode(low);
  }
  return String.fromCharCode(charCode);
}

/**
 * Given a native native unicode, return hex codepoint.
 *
 * @param   string  native unicode, i.e. '\ud83d\ude01'
 * @return  string  native unicode transformed into hex codepoint,
 *          i.e. 1f601
 *
 * @example
 *  emojiRecovery.convert.toCodePoint('\ud83d\ude01');
 *  // "1f601"
 *
 */

function toCodePoint(input) {
  if (input.length === 1) {
    return input.charCodeAt(0).toString(16);
  }
  var high = input.charCodeAt(0);
  var low = input.charCodeAt(1);
  if (high >= 0xD800 && high <= 0xDBFF && low >= 0xDC00 && low <= 0xDFFF) {
    return ((high - 0xD800) * 0x400 + (low - 0xDC00) + 0x10000).toString(16);
  }
  return high.toString(16);
}

var convert = {
  fromCodePoint: fromCodePoint,
  toCodePoint: toCodePoint
};

var codepoints = ['1F004', '1F0CF', '1F170', '1F171', '1F17E', '1F17F', '1F18E', '1F191-1F19A', '1F1E8-1F1EC', '1F1EE-1F1F0', '1F1F7', '1F1FA', '1F201', '1F202', '1F21A', '1F22F', '1F232-1F23A', '1F250', '1F251', '1F300-1F30C', '1F30F', '1F311', '1F313-1F315', '1F319', '1F31B', '1F31F', '1F320', '1F330', '1F331', '1F334', '1F335', '1F337-1F34A', '1F34C-1F34F', '1F351-1F37B', '1F380-1F393', '1F3A0-1F3C4', '1F3C6', '1F3C8', '1F3CA', '1F3E0-1F3E3', '1F3E5-1F3F0', '1F40C-1F40E', '1F411', '1F412', '1F414', '1F417-1F429', '1F42B-1F43E', '1F440', '1F442-1F464', '1F466-1F46B', '1F46E-1F4AC', '1F4AE-1F4B5', '1F4B8-1F4EB', '1F4EE', '1F4F0-1F4F4', '1F4F6', '1F4F7', '1F4F9-1F4FC', '1F503', '1F50A-1F514', '1F516-1F52B', '1F52E-1F53D', '1F550-1F55B', '1F5FB-1F5FF', '1F601-1F606', '1F609-1F60D', '1F60F', '1F612-1F614', '1F616', '1F618', '1F61A', '1F61C-1F61E', '1F620-1F625', '1F628-1F62B', '1F62D', '1F630-1F633', '1F635', '1F637-1F640', '1F645-1F64F', '1F680', '1F683-1F685', '1F687', '1F689', '1F68C', '1F68F', '1F691-1F693', '1F695', '1F697', '1F699', '1F69A', '1F6A2', '1F6A4', '1F6A5', '1F6A7-1F6AD', '1F6B2', '1F6B6', '1F6B9-1F6BE', '1F6C0'];

/**
 * emoji-recovery
 *
 * Copyright © 2016 yahiousun. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

// wrong emoji unicode regexp
var WRONG_EMOJI_UNICODE_REGEX = new RegExp('[' + codepoints.slice().map(function (item) {
  return item.replace(/1F[a-zA-Z0-9]{3}/g, function (match) {
    return match.replace(/^1F/, '\\uf');
  });
}).join('') + ']', 'g');

function parse(input) {
  return input.replace(WRONG_EMOJI_UNICODE_REGEX, function (char) {
    return convert.fromCodePoint(65536 + char.charCodeAt(0));
  });
}

var index = {
  // basic utilities / helpers to convert codepoint
  // to native unicode and vice versa
  convert: convert,
  // wrong emoji unicode regexp
  regex: WRONG_EMOJI_UNICODE_REGEX,
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
  parse: parse
};

return index;

})));
//# sourceMappingURL=index.umd.js.map
