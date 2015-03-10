var random = require('lodash-node/modern/number/random');
var range = require('lodash-node/modern/utility/range');
var should = require('should');

var networks = require('../lib/networks');
const networkKeys = Object.keys(require('../lib/_networks-db'));

var randStr = (len) => {
  var poss = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return range(len).reduce((str) => {
    str += poss.charAt(random(poss.length));
    return str;
  }, '');
}

describe('networks', function () {

  describe('#keyFor', function () {

    it('returns "default" for null', function () {
      networks.keyFor(null).should.eql('default');
    });

    it('returns "default" for unknown network url', function () {
      networks.keyFor('unknownUrl.com').should.eql('default');
    });

    it('returns key for key.com address', function () {
      networkKeys.length.should.be.greaterThan(0);
      networkKeys.forEach((k) => {
        networks.keyFor(`http://${k}.com`).should.eql(k);
      });
    });

    it('returns key for key.com/something address', function () {
      networkKeys.length.should.be.greaterThan(0);
      networkKeys.forEach((k) => {
        let path = range(random(5, 10)).map(randStr).join('/')
        networks.keyFor(`http://${k}.com${path}`).should.eql(k);
      });
    });

  });

});