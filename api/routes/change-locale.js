const express = require('express');
const router = express.Router();

router.get('/:locale', (req, res, next) => {
  // recuperar el código de locale que nos pasan
  const locale = req.params.locale;

  // save referer to back later 
  const backTo = req.get('referer');

  // set cookie with new local
  res.cookie('wallaclone-locale', locale, {maxAge: 1000 * 60 * 60 * 24 * 20});

  // redirect to referer
  res.redirect(backTo);
});

module.exports = router;