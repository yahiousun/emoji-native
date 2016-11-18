/**
 * emoji-recovery
 *
 * Copyright © 2016 yahiousun. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { expect } from 'chai';
import emojiRecovery from '../src/index';

describe('emojiRecovery', () => {

  describe('string parsing', () => {
    it('should replace wrong emoji unicode with native unicode', () => {
      const faceWithTearsOfJoy = emojiRecovery.parse('Rongcloud return \uf602 as \ud83d\ude02!');
      expect(faceWithTearsOfJoy).to.be.equal('Rongcloud return \ud83d\ude02 as \ud83d\ude02!');
    });

    it('should do nothing', () => {
      const noEmojiInput = emojiRecovery.parse('I love emoji!');
      expect(noEmojiInput).to.be.equal('I love emoji!');
    });
  });

  describe('emojiRecovery.convert', () => {
    describe('emojiRecovery.convert.fromCodePoint', () => {
      it('should return native unicode', () => {
        const greeting = emojiRecovery.convert.fromCodePoint('1f601');
        expect(greeting).to.be.equal('\ud83d\ude01');
      });

      it('should return input', () => {
        const blackScissors = emojiRecovery.convert.fromCodePoint('2702');
        expect(blackScissors).to.be.equal('\u2702');
      });
    });

    describe('emojiRecovery.convert.toCodePoint', () => {
      it('should return hex codepoint', () => {
        const greeting = emojiRecovery.convert.toCodePoint('\uD83D\uDE01');
        expect(greeting).to.be.equal('1f601');
      });

      it('should return input', () => {
        const blackScissors = emojiRecovery.convert.toCodePoint('\u2702');
        expect(blackScissors).to.be.equal('2702');
      });

      it('should return first character\'s hex codepoint', () => {
        const wrongInput = emojiRecovery.convert.toCodePoint('\uf601\ude01');
        expect(wrongInput).to.be.equal('f601');
      });
    });
  });

});
