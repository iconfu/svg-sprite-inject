var A_ELEMENT = document.createElement('a');
  
var runTests = function(testFuncs) {
  var failed = false;
  var successCount = 0;

  var fail = function(msg) {
    failed = true;
    document.getElementById('success').style.display = 'none';
    document.getElementById('failed').style.display = 'block';
    document.getElementById('running').style.display = 'none';
    console.error(new Error(msg));
    throw msg;
  };

  var success = function() {
    if (!failed && ++successCount == testFuncs.length) {
      document.getElementById('success').style.display = 'block';
      document.getElementById('running').style.display = 'none';
    }
  };

  for (var i = 0; i < testFuncs.length; ++i) {
    (function() {
      var status = null;
      testFuncs[i](
        function() {
          if (status == 'success') {
            fail('success called twice for a test');
          } else if (status == 'fail') {
            fail('can not call success after fail');
          }
          status = 'success';
          success();
        },
        function(reason) {
          status = 'fail';
          fail(reason);
        }
      );
    })();
  }
};

window.isSpriteOnceInDom = function(url) {
  A_ELEMENT.href = url;
  url = A_ELEMENT.href;
  var svgs = document.getElementsByTagName('svg');
  var inDom = false;
  for (var i = 0; i < svgs.length; ++i) {
    if (svgs[i].getAttribute('data-inject-url') == url) {
      if (inDom) {
        return false;
      }
      inDom = true;
    }
  }
  return inDom;
};

var domReady = function(callback) {
  var ready = false;

  var detach = function() {
    if(document.addEventListener) {
      document.removeEventListener("DOMContentLoaded", completed);
      window.removeEventListener("load", completed);
    } else {
      document.detachEvent("onreadystatechange", completed);
      window.detachEvent("onload", completed);
    }
  };

  var completed = function() {
    if(!ready && (document.addEventListener || event.type === "load" || document.readyState === "complete")) {
      ready = true;
      detach();
      callback();
    }
  };

  if(document.readyState === "complete") {
    callback();
  } else if(document.addEventListener) {
    document.addEventListener("DOMContentLoaded", completed);
    window.addEventListener("load", completed);
  } else {
    document.attachEvent("onreadystatechange", completed);
    window.attachEvent("onload", completed);

    var top = false;

    try {
      top = window.frameElement === null && document.documentElement;
    } catch(e) {}

    if(top && top.doScroll) {
      (function scrollCheck() {
        if(ready) return;

        try {
          top.doScroll("left");
        } catch(e) {
          return setTimeout(scrollCheck, 50);
        }

        ready = true;
        detach();
        callback();
      })();
    }
  }
};