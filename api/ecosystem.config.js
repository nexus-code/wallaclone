module.exports = {
  apps: [{
    name: "Images service",
    script: "imageService.js",
    instances: 1,
    autorestart: true,
    watch: true,
    log_file: "wallaclone.log",
    log_date_format: "YYYY-MM-DD HH:mm",
  }, {
    name        : "Wallaclone",
    script      : "bin/www",
    instances   : 1,
    autorestart : true,
    watch       : true,
    log_file    : "wallaclone.log",
    log_date_format: "YYYY-MM-DD HH:mm",
  }],

  deploy : {
    production : {
      user : "node",
      host : "212.83.163.1",
      ref  : "origin/master",
      repo : "git@github.com:repo.git",
      path : "/var/www/production",
      "post-deploy" : "npm install && pm2 reload ecosystem.config.js --env production"
    }
  }
};
