var REQUEST_TIMEOUT = 5000;

/**
 * Returns a handler which will open a new window when activated.
 */
function getClickHandler() {
  return function(info) {
    var host = localStorage["host"];

    if (host) {   
      var port = localStorage["port"];
      var https = localStorage["host"] === "true";
      var user = localStorage["user"];
      var password = localStorage["password"];
      var apikey = localStorage["apikey"];
      var url;
      
      if (https) {
        url = "https://";
      } else {
        url = "http://";
      }
      url += host;
      if (port) {
        url += ":" + port;
      }
      url += "/sabnzbd/api?mode=addurl&name=" + encodeURIComponent(info.linkUrl);
      if (user) {
        url += "&ma_username=" + encodeURIComponent(user);
        url += "&ma_password=" + encodeURIComponent(password);
      }
      if (apikey) {
        url += "&apikey=" + encodeURIComponent(apikey);
      }

      var request = new XMLHttpRequest();
      request.open("GET", url, true);
      var requestTimer = setTimeout(function() {
        request.abort();
        alert('timed out')
      }, REQUEST_TIMEOUT);
      request.onreadystatechange = function() {
        if (request.readyState === 4) {
          clearTimeout(requestTimer);
          if (request.status === 200)  {
            var serverResponse = request.responseText;
            alert("SABnzbd response: " + serverResponse);
          } else {
            alert("Request to SABnzbd server failed with status: " + request.status);
          }
        }
      };
      request.send(null);
    } else {
      alert("Must set a host in the extension options");
    }
  };
};

/**
 * Create a context menu which will only show up for images.
 */
chrome.contextMenus.create({
  "title" : "Add to SABnzbd",
  "type" : "normal",
  "contexts" : ["link"],
  "onclick" : getClickHandler()
});