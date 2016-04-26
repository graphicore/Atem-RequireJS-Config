define([
    './tools'
  , './genericConfig'
], function(
    tools
  , genericConfig
){
    "use strict";

    var copyItems = tools.copyItems
      , configure = tools.configure
      , copySetup = tools.copySetup
      , defaults = Object.create(null)
      , browserConfig
      ;

    copySetup(genericConfig, defaults);

    // browser specific configuration goes here
    browserConfig = {
        paths: {
            'require/domReady': '%bower%/requirejs-domReady/domReady'
          , 'angular': '%bower%/angular/angular'
          , 'filesaver': '%bower%/file-saver.js/FileSaver'
          , 'jquery': '%bower%/jquery/dist/jquery.min'
          , 'd3': '%bower%/d3/d3.min'
          , 'jquery-ui': '%bower%/jquery.ui/ui'
          , 'angular-ui-sortable': 'bower_components/angular-ui-sortable/sortable.min'
          // browserify-converted versions of node modules
          , 'path': '%bower%/path/path'
          , 'util': '%bower%/util/util'
          // this is a bit special!
          , 'socketio': '../socket.io/socket.io'
        }
        // exclude on build
        // TODO: is this probably just metapolator specific at the moment
      , excludeShallow: [
            // the optimizer can't read es6 generators
            // NOTE: for dependency tracing the genereated es5 version is used
            // by the optimizer. The feature detection below then swaps the path
            // used to load glyphBasics when the browser executes this.
            'metapolator/rendering/glyphBasics'
          , 'metapolator/project/UFOExportController.js'
          , 'metapolator/project/OTFExportController.js'
        ]
      , shim: {
      // this created a dependency to jquery that is not true just
      // for angular. If a module has a hard dependency on jquery
      // it should be defined for that module directly.
      // I'm not a friend of having jquery as such a low level dependency
      // for all of atem. Especially because we hardly need it.
            angular: {
      //        deps: ['jquery'],
              exports: 'angular'
            }
          , 'angular-ui-sortable': {
                deps: ['jquery-ui/sortable', 'angular']
            }
          , yaml: {
                exports: 'jsyaml'
            }
          , 'socketio': {
                exports: 'io'
            }
        }
    };

    copySetup(browserConfig, defaults);
    return configure.bind(null, defaults);
});
