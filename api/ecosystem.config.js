module.exports = {
  apps: [{
    name: "Wallaclone Images Service",
    script: "imageService.js",
    instances: 1,
    autorestart: true,
    watch: true,
    log_file: "./logs/wallaclone-imgs.log",
    log_date_format: "YYYY-MM-DD HH:mm",
  }, {
    name        : "Wallaclone",
    script      : "bin/www",
    instances   : 1,
    autorestart : true,
    watch       : true,
    log_file: "./logs/wallaclone-api.log",
    log_date_format: "YYYY-MM-DD HH:mm",
  }],

};
