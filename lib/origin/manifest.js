const request = require('../request');
const urlParse = require('url-parse');

module.exports = async $ => {
  let icons = [];

  return new Promise(async (resolve, reject) => {
    let href = $('link[rel="manifest" i]', 'head').attr('href');
    if (!href) {
      return resolve(icons);
    }
    const meta = new urlParse(href, $.url);
    let url = meta.href;
    try {
      let response = await request(url);
      if (
        response.status == 200 &&
        response.data &&
        Array.isArray(response.data.icons)
      ) {
        icons =
          response.data.icons.map(({src = '', sizes = '', type = ''}) => ({
            src: new urlParse(src, url).href,
            sizes,
            type,
            origin: url,
          })) || [];
      }
    } catch (error) {}
    resolve(icons);
  });
};
