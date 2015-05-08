(function() {
  ons.bootstrap('app', ['pascalprecht.translate', 'lbServices']);
  angular
    .module('app')
    .config(['$translateProvider', function ($translateProvider) {
      // add translation table
      $translateProvider
        .useStaticFilesLoader({
          prefix: '/onsenui/www/resources/messages_',
          suffix: '.json'
        })
        .preferredLanguage('en')
        .useSanitizeValueStrategy('escaped');
    }]);
})();
