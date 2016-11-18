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
  const high = input.charCodeAt(0);
  const low = input.charCodeAt(1);
  if (high >= 0xD800 && high <= 0xDBFF && low >= 0xDC00 && low <= 0xDFFF) {
    return (((high - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000).toString(16);
  }
  return high.toString(16);
}
export default toCodePoint;
