angular.module('user.services', []);
angular.module('user.services.resource', ['ngResource']);
angular.module('user.controllers', ['user.services']);
angular.module('user', ['user.controllers', 'user.services', 'user.services.resource']);