/*  */module.exports = {
  apps: [
    {
      name: "Initialize images",
      script: "installImages.js",
      instances: 1,
      autorestart: true,
      watch: false,
      log_file: "install.log",
      log_date_format: "YYYY-MM-DD HH:mm",
    }, {
    name: "Images service",
    script: "imageService.js",
    instances: 1,
    autorestart: true,
    watch: false,
    log_file: "install.log",
    log_date_format: "YYYY-MM-DD HH:mm",
  }, {
    name: "installDB - Wallaclone",
    script: "installDB.js",
    instances: 1,
    autorestart: false,
    watch: false,
    log_file: "install.log",
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
