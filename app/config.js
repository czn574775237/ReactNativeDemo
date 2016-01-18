const {
  width: WINDOW_WIDTH,
  height: WINDOW_HEIGHT
} = require('Dimensions').get('window');

const API_HOST = 'http://multi-m.beeee.com';
const API_ROOT = `${API_HOST}/api`;

module.exports = {
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  API_HOST,
  API_ROOT
};
