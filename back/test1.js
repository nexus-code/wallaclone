/*  */module.exports = {
  apps: [
    {
      name: "Initialize images",
      script: "installImages.js",
      instances: 1,
      watch: true,
      log_file: "install.log",
      log_date_format: "YYYY-MM-DD HH:mm",
    }]
};
