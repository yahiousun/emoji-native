/**
 * Given a native native unicode, return hex codepoint.
 *
 * @param   string  native unicode, i.e. '\uD83D\uDE01'
 * @return  string  native unicode transformed into hex codepoint,
 *          i.e. 1F601
 *
 * @example
 *  emojiRecovery.convert.toCodePoint('\uD83D\uDE01');
 *  // "1F601"
 *
 */

function toCodePoint(input) {
  if (input.length === 1) {
    return input.charCodeAt(0).toString(16).toUpperCase();
  }
  const high = input.charCodeAt(0);
  const low = input.charCodeAt(1);
  if (high >= 0xD800 && high <= 0xDBFF && low >= 0xDC00 && low <= 0xDFFF) {
    return (((high - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000).toString(16).toUpperCase();
  }
  return high.toString(16).toUpperCase();
}
export default toCodePoint;
