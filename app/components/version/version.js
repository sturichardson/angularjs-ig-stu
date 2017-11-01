'use strict';

angular.module('stuIG.version', [
  'stuIG.version.interpolate-filter',
  'stuIG.version.version-directive'
])

.value('version', '0.1');
