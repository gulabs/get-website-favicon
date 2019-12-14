/* eslint-disable no-sparse-arrays */
const urlParse = require('url-parse');
const cheerio = require('react-native-cheerio');
const selectors = [
  "link[rel='icon' i][href]",
  "link[rel='shortcut icon' i][href]",
  "link[rel='apple-touch-icon' i][href]",
  "link[rel='apple-touch-icon-precomposed' i][href]",
  "link[rel='apple-touch-startup-image' i][href]",
  "link[rel='mask-icon' i][href]",
  "link[rel='fluid-icon' i][href]",
];

module.exports = async $ => {
  const icons = [];

  return new Promise((resolve, reject) => {
    try {
      selectors.forEach(selector => {
        const info = $(selector);
        info.each((i, el) => {
          let {
            href = '',
            sizes = '',
            type = '',
            content = '',
            rel = '',
          } = el.attribs;
          let src;
          if (el.name == 'link') {
            src = href;
          } else {
            src = content;
          }
          const temp = new urlParse(src, $.url);
          if (src && src !== '#') {
            icons.push({
              src: temp.href,
              sizes,
              type,
              origin: cheerio.html(el),
            });
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
    resolve(icons);
  });
};
