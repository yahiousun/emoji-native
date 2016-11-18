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
  const charCode = parseInt(input.toString(16), 16);
  if (charCode >= 0x10000 && charCode <= 0x10FFFF) {
    const high = Math.floor((charCode - 0x10000) / 0x400) + 0xD800;
    const low = ((charCode - 0x10000) % 0x400) + 0xDC00;
    return String.fromCharCode(high) + String.fromCharCode(low);
  }
  return String.fromCharCode(charCode);
}
export default fromCodePoint;
