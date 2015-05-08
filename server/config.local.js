
var nodeEnv = process.env.NODE_ENV || 'development';
var isDev = nodeEnv === 'development';
var isStaging = nodeEnv === 'staging';
var isProduction = nodeEnv === 'production';

module.exports = {
  isEnv: {
    development: isDev,
    staging: isStaging,
    production: isProduction
  }
};
