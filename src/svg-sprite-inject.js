/**
 * SVGSpriteInject - Simple 
 * https://github.com/iconfu/svg-sprite-inject
 *
 * Copyright (c) 2018 Iconfu <info@iconfu.com>
 * @license MIT
 */

(function(window, document) {

  'use strict';

  var NOOP = function() {};

  // load svg
  function load(path, callback, errorCallback) {
    if (path) {
      var req = new XMLHttpRequest();

      req.onreadystatechange = function() {
        if(req.readyState == 4 && req.status == 200) {
          var div = document.createElement('div');
          div.innerHTML = req.responseText;
          callback(div.childNodes[0]);
        } else {
          errorCallback(req.statusText);
        }
      };

      req.open('GET', path, true);
      req.send();
    }
  };

  function applyAllOptions(optionKey, optionsArr, func) {
    for (var i = 0; i < optionsArr.length; ++i) {
      var options = optionsArr[i];
      if (options.hasOwnProperty(optionKey)) {
        func(options[optionKey]);
      }
    }
  };

  var spriteHandlerMap = {};
  var cachedMap = {};

  /**
   * SVGSpriteInject
   *
   * 
   *
   * Options:
   * onLoadFail: callback after SVG load fails
   * onInjected: callback after SVG is injected
   * 
   * @param {strine} path - full path to svg sprite
   * @param {Object} options.
   */
  function SVGSpriteInject(path, options) {
    options = options || {};

    var cached = cachedMap[path];
    
    if (cached) {
      var svgSprite = cached.svgSprite;
      if (svgSprite) {
        onInjected(svgSprite);
      } else {
        cached.optionsArr.push(options);
      }
    } else {
      var removed = false;

      cachedMap[path] = cached = {
        spriteHandler: {
          remove: function() {
            if (!removed) {
              var cachedSvgSprite = cached.svgSprite;
              if (cachedSvgSprite) {
                var parentNode = cachedSvgSprite.parentNode;
                parentNode && parentNode.removeChild(cachedSvgSprite);
                cached.svgSprite = null;
              }
              delete cachedMap[path];
              removed = true;
            }
          }
        },
        svgSprite: null,
        optionsArr: [options]
      };

      load(path, function(svgSprite) {
        if (!removed) {
          cached.svgSprite = svgSprite
          document.body.appendChild(svgSprite);

          applyAllOptions('onInjected', cached.optionsArr, function(onInjected) {
            onInjected(svgSprite);
          });
        }
      }, function(e) {
        applyAllOptions('onLoadFailed', cached.optionsArr, function(onLoadFailed) {
          onLoadFailed(e);
        });
      }); 
    }

    return cached.spriteHandler;
  };

  if (typeof module == 'object' && typeof module.exports == 'object') {
    module.exports = exports = SVGSpriteInject;
  } else if (typeof window == 'object') {
    window.SVGSpriteInject = SVGSpriteInject;
  }
})(window, document);