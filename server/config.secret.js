

var config = {
  FACEBOOK_API_KEY:  '1427159137592283',
  FACEBOOK_API_SECRET: '6fb660b1f40571cc5c20b18ed34e503d',
  TWITTER_API_KEY: 'sdnYKF0v25GkDN6zan5VxEilr',
  TWITTER_API_SECRET: 'mgXgpW1czy0x5a7VRbbbPL9SCV7fpn1wFe72c2hC6YH7FHPQam',
  COOKIE_SECRET: '0533b689d5f8b0ffed8e5b500e19f0e7'
};

for(var key in config) {
  process.env[key] = config[key];
}
