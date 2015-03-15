var React = require('react/addons');
var should = require('should');

var networks = require('../lib/networks');
var SocialIcons = React.createFactory(require('../lib/social-icons'));

var TestUtils = React.addons.TestUtils;

describe('SocialIcons', function () {

  it('exists', function () {
    SocialIcons.should.be.instanceOf(Function);
  });

  var urls = [ 'http://pinterest.com', 'http://tumblr.com', 'http://linkedin.com'];
  var socialIcons;
  beforeEach(function () {
    socialIcons = TestUtils.renderIntoDocument(SocialIcons({
      urls: urls
    }));
  });

  it('takes a urls prop', function () {
    socialIcons.props.urls.should.eql(urls);
  });

  it('renders an icon per url', function () {
    var icons = TestUtils.scryRenderedDOMComponentsWithClass(socialIcons, 'social-icon');
    icons.length.should.eql(urls.length);
  });

  it('can append a className', function () {
    var className = 'birthday';
    socialIcons = TestUtils.renderIntoDocument(SocialIcons({
      className: className
    }));
    var icons = TestUtils.scryRenderedDOMComponentsWithClass(socialIcons, 'social-icon');
    icons.forEach((icon) => {
      icon.props.className.should.match(new RegExp("social-icon.*" + className));
    });
  });

  it('can override color uniformly for each icon', function () {
    var color = 'pink';
    socialIcons = TestUtils.renderIntoDocument(SocialIcons({
      urls: urls,
      color: color
    }));
    var masks = TestUtils.scryRenderedDOMComponentsWithClass(socialIcons, 'social-svg-mask');
    masks.forEach((icon) => {
      icon.props.style.fill.should.eql(color);
    });
  });

});