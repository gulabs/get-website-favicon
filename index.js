const getWebsiteFavicon = require('./lib');

module.exports = async (url) => {
  return await getWebsiteFavicon(url);
};
