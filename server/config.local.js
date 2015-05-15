var fs = require('fs');
var path = require('path');

var filepath = path.resolve(__dirname, 'config.secret.js');
if (fs.existsSync(filepath)) {
  require(filepath);
}

var nodeEnv = process.env.NODE_ENV || 'development';
var isDev = nodeEnv === 'development';
var isStaging = nodeEnv === 'staging';
var isProduction = nodeEnv === 'production';

var protocol = process.env.PROTOCOL || 'http';
var host = process.env.HOST || 'localhost';
var port = process.env.PORT || '3000';

module.exports = {
  url: protocol + '://' + host + ':' + port,
  isEnv: {
    development: isDev,
    staging: isStaging,
    production: isProduction
  }
};

