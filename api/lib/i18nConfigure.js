'use strict';

const i18n = require('i18n');
const path = require('path');

module.exports = function() {
  i18n.configure({
    locales: ['en', 'es'],
    directory: path.join(__dirname, '..', 'locales'),
    defaultLocale: 'en',
    autoReload: true, // mandatory. Reload language files if they change
    syncFiles: true, // mandatory. Replicate literals in all locales
    cookie: 'wallaclone-locale'
  });

  // por si usamos i18n en scripts
  i18n.setLocale('en');

  return i18n;
};
