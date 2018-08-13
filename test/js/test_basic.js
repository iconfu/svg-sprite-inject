(function() {
  runTests([
    // test 1
    function(success, fail) {
      SVGSpriteInject('svg_sprites/svg-sprite-1.svg', {
        afterInject: function() {
          success();
        }
      });
    },

    // test 2
    function(success, fail) {
      var count = 0;

      var options = {
        afterInject: function() {
          if (!isSpriteOnceInDom('svg_sprites/svg-sprite-2.svg')) {
            fail();
          } else if (++count == 2) {
            success();
          } else if (count > 2) {
            fail();
          }
        }
      };
      SVGSpriteInject('svg_sprites/svg-sprite-2.svg', options);
      SVGSpriteInject('svg_sprites/svg-sprite-2.svg', options);
    },

    // test 3
    function(success, fail) {
      var count = 0;

      var options = {
        onLoadFail: function() {
          if (++count == 2) {
            success();
          } else if (count > 2) {
            fail();
          }
        }
      };
      SVGSpriteInject('wrong/url/path1.svg', options);
      SVGSpriteInject('wrong/url/path2.svg', options);
    },

    // test 4
    function(success, fail) {
      var RUN_NUM = 10;

      var run = function(count, callback) {
        var spriteHandler = SVGSpriteInject('svg_sprites/svg-sprite-4.svg', {
          afterInject: function() {
            if (!isSpriteOnceInDom('svg_sprites/svg-sprite-4.svg')) {
              fail();
            } else {
              if (count < RUN_NUM) {
                spriteHandler.remove();
                spriteHandler.remove();

                if (isSpriteOnceInDom('svg_sprites/svg-sprite-4.svg')) {
                  fail();
                } else {
                  run(++count, callback);
                }
              } else {
                callback();
              }
            }
          }
        });
      };

      run(0, success);
    }
  ]);
})();

