define(['./tools'], function(tools){
    "use strict";

    var copyItems = tools.copyItems
      , configure = tools.configure
      , defaults
      ;

    defaults = {
        paths: {
            'Atem-CPS': '%bower%/Atem-CPS/lib'
          , 'Atem-CPS-whitelisting': '%bower%/Atem-CPS-whitelisting/lib'
          , 'Atem-Errors': '%bower%/Atem-Errors/lib'
          , 'Atem-IO': '%bower%/Atem-IO/lib'
          , 'Atem-Math-Tools': '%bower%/Atem-Math-Tools/lib'
          , 'Atem-Pen-Case': '%bower%/Atem-Pen-Case/lib'
          , 'Atem-Property-Language': '%bower%/Atem-Property-Language/lib'
          , 'obtain': '%bower%/obtainjs/lib'
          , 'complex': '%bower%/complex/lib'
          , 'gonzales': '%bower%/gonzales/amd'
          , 'bloomfilter': '%bower%/bloomfilter.js/bloomfilter'

          , 'require/domReady': '%bower%/requirejs-domready/domReady'
          , 'require/text': '%bower%/requirejs-text/text'
          , 'path': '%bower%/path/path'
          , 'yaml': '%bower%/js-yaml/dist/js-yaml.min'
          , 'jszip': '%bower%/jszip/dist/jszip'
          , 'EventEmitter': '%bower%/event-emitter.js/dist/event-emitter'
          , 'angular': '%bower%/angular/angular'
          , 'filesaver': '%bower%/file-saver.js/FileSaver'
          , 'jquery': '%bower%/jquery/dist/jquery.min'
          , 'opentype': '%bower%/opentype.js/dist/opentype.min'
          , 'd3': '%bower%/d3/d3.min'
          , 'jquery-ui': '%bower%/jquery.ui/jquery-ui.min'
          , 'sortable': '%bower%/angular-ui-sortable/sortable.min'
          // this is a bit special!
          , 'socketio': '../socket.io/socket.io'

            // Atem applications must override their own path in their own setup
          , 'metapolator': '%bower%/metapolator/app/lib'
          , 'BEF': '%bower%/Bauhaus-Emblem-Font/app/lib'
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

    try {
        /*jshint evil:true*/
        eval("(function *(){})()");
        // TODO: this overide probably fails when not in metapolator
        //       maybe there can be a more generic approach to this
        var paths = {
            'metapolator/rendering/glyphBasics': 'rendering/glyphBasics.es6'
          , 'metapolator/project/UFOExportController': 'project/UFOExportController.es6'
          , 'metapolator/project/OTFExportController': 'project/OTFExportController.es6'
        };
        copyItems(paths, defaults.path);
    } catch(err) {
        /*global console:true*/
        console.info("No generators, falling back.");
    }

    return configure.bind(null, defaults);
});
