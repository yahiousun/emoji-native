/**
 * Given an codepoint, returns UTF16 surrogate pairs.
 *
 * @param   string  unicode, i.e. '1F601'
 * @return  string  unicode transformed into utf16 surrogates pair,
 *          i.e. \uD83D\uDE01
 *
 * @example
 *  emojiNative.convert.fromCodePoint('1F601');
 *  // "\uD83D\uDE01"
 *
 */

function fromCodePoint(input) {
  // convert codepoint to charCode
  const charCode = parseInt(input.toString(16), 16);
  if (charCode >= 0x10000 && charCode <= 0x10FFFF) {
    const highSurrogate = Math.floor((charCode - 0x10000) / 0x400) + 0xD800;
    const lowSurrogate = ((charCode - 0x10000) % 0x400) + 0xDC00;
    return String.fromCharCode(highSurrogate) + String.fromCharCode(lowSurrogate);
  }
  return String.fromCharCode(charCode);
}
export default fromCodePoint;
