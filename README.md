# Emoji Recovery
Correct emoji encoding from some 3rd-party service.
i.e. Rongcloud javascript client transformed unicode "1f601" into "f601"

## API
Following are all the methods exposed in the emojiRecovery namespace.

### emojiRecovery.parse( ... )
Given a generic string, replaces all wrong emoji with native unicode.

```js
emojiRecovery.parse('Hello\uf601!');
// will produce
/*
Hello\ud83d\ude01!
*/
```

## Utilities

Basic utilities / helpers to convert code points to JavaScript surrogates and vice versa.

#### emojiRecovery.convert.fromCodePoint()
For a given HEX codepoint, returns UTF-16 surrogate pairs.

```js
emojiRecovery.convert.fromCodePoint('1f601');
// "\ud83d\ude01"
```
#### emojiRecovery.convert.toCodePoint()
For given UTF-16 surrogate pairs, returns the equivalent HEX codepoint.

```js
emojiRecovery.convert.toCodePoint('\ud83d\ude01');
// "1f601"
```

#### emojiRecovery.regex
Wrong emoji unicode regexp

```js
let input = "Rongcloud return \uf602 as \ud83d\ude02"
input.replace(WRONG_EMOJI_UNICODE_REGEX,
  char => emojiRecovery.convert.fromCodePoint(65536 + char.charCodeAt(0)));
// "Rongcloud return \ud83d\ude02 as \ud83d\de02"
```