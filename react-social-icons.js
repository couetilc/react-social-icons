import './icons/bandsintown.js';
import './icons/behance.js';
import './icons/clubhouse.js';
import './icons/codepen.js';
import './icons/discord.js';
import './icons/dribbble.js';
import './icons/dropbox.js';
import './icons/email.js';
import './icons/facebook.js';
import './icons/fivehundredpix.js';
import './icons/flickr.js';
import './icons/foursquare.js';
import './icons/github.js';
import './icons/gitlab.js';
import './icons/google.js';
import './icons/google_play.js';
import './icons/groupme.js';
import './icons/instagram.js';
import './icons/itch.io.js';
import './icons/itunes.js';
import './icons/leetcode.js';
import './icons/linkedin.js';
import './icons/linktree.js';
import './icons/mastodon.js';
import './icons/matrix.js';
import './icons/medium.js';
import './icons/meetup.js';
import './icons/opensea.js';
import './icons/pinterest.js';
import './icons/pixiv.js';
import './icons/ravelry.js';
import './icons/rdio.js';
import './icons/reddit.js';
import './icons/rss.js';
import './icons/sharethis.js';
import './icons/slack.js';
import './icons/smugmug.js';
import './icons/snapchat.js';
import './icons/soundcloud.js';
import './icons/spotify.js';
import './icons/squarespace.js';
import './icons/stackoverflow.js';
import './icons/t.me.js';
import './icons/telegram.js';
import './icons/tiktok.js';
import './icons/tumblr.js';
import './icons/twitch.js';
import './icons/twitter.js';
import './icons/upwork.js';
import './icons/vevo.js';
import './icons/vimeo.js';
import './icons/vine.js';
import './icons/vk.js';
import './icons/vsco.js';
import './icons/wechat.js';
import './icons/whatsapp.js';
import './icons/x.js';
import './icons/yelp.js';
import './icons/youtube.js';
import './icons/mailto.js';
import { network_names } from './component.js';
export { SocialIcon, networkFor, register, social_icons, uri_regex } from './component.js';
import 'react';

function getNetworks() {
  return [...network_names];
}

// note: deprecate in v7
function getKeys() {
  return getNetworks();
}

export { getKeys, getNetworks, network_names };
