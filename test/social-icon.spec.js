var React = require('react/addons');
var should = require('should');

var networks = require('../lib/networks');
var SocialIcon = React.createFactory(require('../lib/social-icon'));

var TestUtils = React.addons.TestUtils;

describe('SocialIcon', function () {

  it('exists', function () {
    SocialIcon.should.be.instanceOf(Function);
  });

  var url = 'http://pinterest.com';
  var socialIcon;
  beforeEach(function () {
    socialIcon = TestUtils.renderIntoDocument(SocialIcon({
      url: url
    }));
  });

  it('takes a url prop', function () {
    socialIcon.props.url.should.eql(url);
  });

  it('renders the anchor with the url', function () {
    var a = TestUtils.findRenderedDOMComponentWithClass(socialIcon, 'social-icon');
    should.exist(a);
    socialIcon.refs.link.props.href.should.eql(url);
  });

  it('renders the container', function () {
    var container = TestUtils.findRenderedDOMComponentWithClass(socialIcon, 'social-container');
    should.exist(container);
  });

  it('renders the display svg', function () {
    var svg = TestUtils.findRenderedDOMComponentWithClass(socialIcon, 'social-svg');
    should.exist(svg);
  });

  it('renders a circle for the background', function () {
    var bgG = TestUtils.findRenderedDOMComponentWithClass(socialIcon, 'social-svg-background');
    should.exist(bgG);
    var circle = TestUtils.findRenderedDOMComponentWithTag(bgG, 'circle');
    should.exist(circle);
  });

  it('renders an icon based on the url', function () {
    var path = TestUtils.findRenderedDOMComponentWithTag(socialIcon.refs.icon, 'path');
    path.props.d.should.eql(networks.iconFor('pinterest'));
  });

  it('renders a mask based on the url', function () {
    var path = TestUtils.findRenderedDOMComponentWithTag(socialIcon.refs.mask, 'path');
    path.props.d.should.eql(networks.maskFor('pinterest'));
  });

  it('takes a network prop for overriding default generated from url', function () {
    socialIcon = TestUtils.renderIntoDocument(SocialIcon({
      url: url,
      network: 'github'
    }));
    var path = TestUtils.findRenderedDOMComponentWithTag(socialIcon.refs.icon, 'path');
    path.props.d.should.eql(networks.iconFor('github'));
  });

  it('takes a color prop for overriding default color', function () {
    var color = 'pink';
    socialIcon = TestUtils.renderIntoDocument(SocialIcon({
      color: color,
      network: 'github'
    }));
    var mask = TestUtils.findRenderedDOMComponentWithClass(socialIcon, 'social-svg-mask');
    mask.props.style.fill.should.eql(color);
  });

});