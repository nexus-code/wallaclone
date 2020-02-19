module.exports = {
  apps: [{
    name: "Wallaclone Images Service",
    script: "imageService.js",
    instances: 1,
    autorestart: false,
    watch: false,
    log_file: "./logs/wallac_images.log",
    log_date_format: "YYYY-MM-DD HH:mm",
  }, {
    name        : "Wallaclone",
    script      : "bin/www",
    instances   : 1,
    autorestart : true,
    watch       : true,
    log_file: "./logs/wallaclone_api.log",
    log_date_format: "YYYY-MM-DD HH:mm",
  }],

};
