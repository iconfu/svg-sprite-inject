/*
 * This script is used to provide feedback if the demo is not working correctly on the local file system due to the same origin policy.
 */

(function() {
  var msg = null;

  var msgTemplate = '<div style="border: 1px solid #ff6666; background: #ffcccc; padding: 30px;">' +
                      '<h1>Demo not working correctly</h1>' +
                      '<h2>Don\'t worry: It\'s most likely because you are running this example on your local file system.</h2>' +
                      '<p>SVGSpriteInject works very well in any browser when run with a web server.</p>' +
                      '<p>Due to the same origin policy for some browsers (Chrome, Safari), SVGs can not be loaded when run on the file system.</p>' +
                      '<p>This is why the second image in this demo is not styled in different colors.</p>' +
                      '<h2>How to get this demo to work</h2>' +
                      '<ul style="font-size: larger;">' +
                        '<li>Run the demo with a Web Server</li>' +
                        '<li>Run the demo with the Firefox browser</li>' +
                      '</ul>' +
                      '<p>There are also other possible solutions (--allow-file-access-from-files flag in Chrome) you might want to look for to run this example on the file system.</p>' +
                    '</div>';

  function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild; 
  }

  function showMessage() {
    if (!msg) {
      msg = createElementFromHTML(msgTemplate);
      document.body.insertBefore(msg, document.body.firstChild);
    }
  }

  function hideMessage() {
    if (msg) {
      msg.parentNode.removeChild(msg);
      msg = null;
    }
  }

  function checkImgReplaced(delay) {
    window.setTimeout(function() {
      if (document.documentElement.lastChild.tagName !== 'svg') {
        showMessage();
        checkImgReplaced(200);
      } else {
        hideMessage();
      }
    }, delay);
  }

  var img = new Image();
  img.src = 'svg-sprite.svg';
  img.addEventListener("load", function() {
    checkImgReplaced(100);
  });
})();