/* global describe, it */

import 'should';
import random from 'lodash/random';
import range from 'lodash/range';
import { keyFor } from '../lib/networks';
import networksDb from '../lib/_networks-db';

const networkKeys = Object.keys(networksDb);
const poss = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const randStr = (len) => range(len).reduce((str) =>
  str + poss.charAt(random(poss.length))
, '');

describe('networks', () => {
  describe('#keyFor', () => {
    it('returns "default" for null', () => {
      keyFor(null).should.eql('sharethis');
    });

    it('returns "sharethis" for unknown network url', () => {
      keyFor('unknownUrl.com').should.eql('sharethis');
    });

    it('returns key for key.com address', () => {
      networkKeys.length.should.be.greaterThan(0);
      networkKeys.forEach((k) => {
        keyFor(`http://${k}.com`).should.eql(k);
      });
    });

    it('returns key for key.com/something address', () => {
      networkKeys.length.should.be.greaterThan(0);
      networkKeys.forEach((k) => {
        const path = range(random(5, 10)).map(randStr).join('/');
        keyFor(`http://${k}.com${path}`).should.eql(k);
      });
    });
  });
});
