'use strict';

(function(window, document) {
  var ATTRIBUTE_EXCLUSION_NAMES = ['src', 'alt', 'onload'];

  /**
   * Injects an Svg 
   * @param {number} imgElement
   * @param {string} locale
   * @return {string}
   */
  var load = function(path, callback) {
    if (path) {
      var req = new XMLHttpRequest();

      req.onreadystatechange = function() {
        if(req.readyState == 4 && req.status == 200) {
          var div = document.createElement('div');
          div.innerHTML = req.responseText;
          callback(div.childNodes[0]);
        }
      };

      req.open('GET', path, true);
      req.send();
    }
  };

  var spriteHandlerMap = {};

  var SVGSpriteInject = function(path) {
    var spriteHandler = spriteHandlerMap[path];
    
    if (!spriteHandler) {
      var removed = false;
      var cachedSprite = null;

      spriteHandlerMap[path] = spriteHandler = {
        remove: function() {
          if (!removed) {
            if (cachedSprite) {
              var parentNode = cachedSprite.parentNode;
              parentNode && parentNode.removeChild(cachedSprite);
              cachedSprite = null;
            }
            delete spriteHandlerMap[path];
            removed = true;
          }
        }
      };

      load(path, function(sprite) {
        if (!removed) {
          cachedSprite = sprite;
          document.body.appendChild(sprite);
        }
      }); 
    }

    return spriteHandler;
  };

  if (typeof module == 'object' && typeof module.exports == 'object') {
    module.exports = exports = SVGSpriteInject;
  } else if (typeof window == 'object') {
    window.SVGSpriteInject = SVGSpriteInject;
  }
})(window, document);