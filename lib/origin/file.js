const request = require('../request');
const urlParse = require('url-parse');
const fileType = require('file-type');

module.exports = async baseurl => {
  let icons = [];
  return new Promise(async (resolve, reject) => {
    let url = urlParse('/favicon.ico', baseurl).href;
    try {
      let response = await request(url, {
          method: 'GET',
          responseType: 'arraybuffer',
        }),
        type = fileType(response.data) || {};
      if (response.status == 200 && /image/gi.test(type.mime)) {
        icons.push({
          src: url,
          sizes: '',
          type: 'image/x-icon',
          origin: '/favicon.ico',
        });
      }
    } catch (error) {
      // console.log(error);
    }
    resolve(icons);
  });
};
