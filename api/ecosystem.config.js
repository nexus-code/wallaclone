module.exports = {
  apps: [{
    name: "Wallaclone Images service",
    script: "./imageService.js",
    instances: 1,
    autorestart: true,
    watch: true,
    log_file: "./logs/images.log",
    log_date_format: "YYYY-MM-DD HH:mm",
  }, {
    name: "Wallaclone API",
    script: "./bin/www",
    instances: 1,
    autorestart: true,
    watch: true,
    log_file: "./logs/api.log",
    log_date_format: "YYYY-MM-DD HH:mm",
  }],

};