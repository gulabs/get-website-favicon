const request = require('./request');
const cheerio = require('react-native-cheerio');
const urlParse = require('url-parse');
module.exports = async url => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request(url),
        html = response.data,
        $ = cheerio.load(html, {
          lowerCaseTags: true,
          lowerCaseAttributeNames: true,
        });
      $.url = response.request.responseURL;
      $.baseUrl = urlParse($.url).protocol + '//' + urlParse($.url).hostname;
      resolve($);
    } catch (error) {
      console.log(error);
      let $ = cheerio.load('');
      $.url = url;
      $.baseUrl = urlParse($.url).protocol + '//' + urlParse($.url).hostname;
      resolve($);
    }
  });
};
