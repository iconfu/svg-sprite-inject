/**
 * SVGSpriteInject
 * A tiny, intuitive, robust, caching solution for injecting SVG Sprites into the DOM.
 * 
 * https://github.com/iconfu/svg-sprite-inject
 *
 * Copyright (c) 2018 INCORS, the creators of iconfu.com
 * @license MIT License - https://github.com/iconfu/svg-sprite-inject/blob/master/LICENSE
 */

(function(window, document) {
  var CREATE_ELEMENT = 'createElement';

  var A_ELEMENT = document[CREATE_ELEMENT]('a');
  var DIV_ELEMENT = document[CREATE_ELEMENT]('div');
  
  // load svg
  function load(path, callback, errorCallback) {
    if (path) {
      var req = new XMLHttpRequest();

      req.onreadystatechange = function() {
        if(req.readyState == 4 && req.status == 200) {
          callback(req.responseText);
        }
      };

      req.onerror = errorCallback;
      req.open('GET', path, true);
      req.send();
    }
  }

  function buildSvgSprite(svgSpriteStr, absUrl) {
    DIV_ELEMENT.innerHTML = svgSpriteStr;
    var svg = DIV_ELEMENT.removeChild(DIV_ELEMENT.firstChild);
    svg.setAttribute('data-inject-url', absUrl);
    return svg;
  }

  function getAbsoluteUrl(url) {
    A_ELEMENT.href = url;
    return A_ELEMENT.href;
  }

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
   * A tiny, intuitive, robust, caching solution for injecting SVG Sprites into the DOM.
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

    var absUrl = getAbsoluteUrl(path);
    var cached = cachedMap[absUrl];
    
    if (cached) {
      var svgSprite = cached.svgSprite;
      if (svgSprite) {
        if (options.onInjected) {
          options.onInjected(svgSprite);
        }
      } else {
        cached.optionsArr.push(options);
      }
    } else {
      var removed = false;

      cachedMap[absUrl] = cached = {
        spriteHandler: {
          remove: function() {
            if (!removed) {
              var cachedSvgSprite = cached.svgSprite;
              if (cachedSvgSprite) {
                var parentNode = cachedSvgSprite.parentNode;
                parentNode && parentNode.removeChild(cachedSvgSprite);
                cached.svgSprite = null;
              }
              delete cachedMap[absUrl];
              removed = true;
            }
          }
        },
        svgSprite: null,
        optionsArr: [options]
      };

      load(path, function(svgSpriteStr) {
        var svgSprite = buildSvgSprite(svgSpriteStr, absUrl);
        if (!removed) {
          cached.svgSprite = svgSprite
          document.documentElement.appendChild(svgSprite);

          applyAllOptions('afterInject', cached.optionsArr, function(afterInject) {
            afterInject(svgSprite);
          });
        }
      }, function(e) {
        applyAllOptions('onLoadFail', cached.optionsArr, function(onLoadFail) {
          onLoadFail(e);
        });
      }); 
    }

    return cached.spriteHandler;
  };

  if (typeof module == 'object' && typeof module.exports == 'object') {
    module.exports = SVGSpriteInject;
  }

  window.SVGSpriteInject = SVGSpriteInject;
})(window, document);