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
            'require/domReady': '%bower%/requirejs-domready/domReady'
          , 'angular': '%bower%/angular/angular'
          , 'filesaver': '%bower%/file-saver.js/FileSaver'
          , 'jquery': '%bower%/jquery/dist/jquery.min'
          , 'd3': '%bower%/d3/d3.min'
          , 'jquery-ui': '%bower%/jquery.ui/jquery-ui.min'
          // browserify-converted versions of node modules
          , 'path': '%bower%/path/path'
          , 'util': '%bowe%/util/util'
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
            angular: {
              deps: ['jquery'],
              exports: 'angular'
            }
          , sortable: {
                deps: ['jquery-ui', 'angular']
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
