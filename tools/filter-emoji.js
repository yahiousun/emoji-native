/**
 * emoji-recovery
 *
 * Copyright © 2016 yahiousun. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');

const options = {
  method: 'GET',
  hostname: 'unicode.org',
  port: 80,
  path: '/Public/9.0.0/ucd/EmojiSources.txt',
  headers: {
    'cache-control': 'no-cache',
  },
};

console.log('> downloading emoji data from unicode.org'); // eslint-disable-line no-console

// Download emoji data from unicode.org
const req = http.request(options, (res) => {
  const chunks = [];
  res.on('data', chunk => chunks.push(chunk));

  res.on('end', () => {
    console.log('> download complete'); // eslint-disable-line no-console

    const body = Buffer.concat(chunks);
    const lines = body.toString().split('\n');
    let codepoints = [];

    // filter utf32 emoji codepoint
    lines.forEach((line) => {
      if (!line || /#/.test(line)) {
        return;
      }
      const codepoint = line.trim().split(';')[0].split(' ')[0];
      const charCode = parseInt(codepoint, 16);
      if (charCode >= 0x10000 && charCode <= 0x10FFFF) {
        codepoints.push(codepoint);
      }
    });

    codepoints = codepoints
                  .slice()
                  .sort((a, b) => parseInt(a, 16) - parseInt(b, 16))
                  .reduce((prev, item, i, array) => {
                    const last = parseInt(item, 16) - i;
                    const next = Object.assign({}, prev);
                    if (next.last !== last) {
                      if (next.last) {
                        next.array.push(next.temp.slice());
                        next.temp = [];
                      }
                      next.last = last;
                    }
                    next.temp.push(item);

                    if (i === array.length - 1 && next.temp.length) {
                      next.array.push(next.temp.slice());
                    }
                    return next;
                  }, { array: [], temp: [], last: null })
                  .array
                  .map((chunk) => {
                    let item = '';
                    if (chunk.length === 1) {
                      item = `\n  '${chunk[0]}'`;
                    } else if (chunk.length === 2) {
                      item = `\n  '${chunk[0]}',\n  '${chunk[1]}'`;
                    } else {
                      item = `\n  '${chunk[0]}-${chunk[chunk.length - 1]}'`;
                    }
                    return item;
                  });

    const savePath = path.join(__dirname, '../data/', 'codepoints.js');
    fs.writeFileSync(
      savePath,
      `export default [${codepoints.toString()}\n];\n`,
    );
    console.log(`> filtered ${savePath}`); // eslint-disable-line no-console
  });
});

req.end();
