// Save this script as `options.js`

// Saves options to localStorage.
function save_options() {
  var host = document.getElementById("host").value;
  var port = document.getElementById("port").value;
  var https = document.getElementById("https").checked;
  var user = document.getElementById("user").value;
  var password = document.getElementById("password").value;
  var apikey = document.getElementById("apikey").value;

  localStorage["host"] = host;
  localStorage["port"] = port;
  localStorage["https"] = https;
  localStorage["user"] = user;
  localStorage["password"] = password;
  localStorage["apikey"] = apikey;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var host = localStorage["host"];
  var port = localStorage["port"];
  var https = localStorage["https"] === "true";
  var user = localStorage["user"];
  var password = localStorage["password"];
  var apikey = localStorage["apikey"];
  if (host) {
    document.getElementById("host").value = host;
  }
  if (port) {
    document.getElementById("port").value = port;
  }
  document.getElementById("host").checked = https;
  if (user) {
    document.getElementById("user").value = user;
  }
  if (password) {
    document.getElementById("password").value = password;
  }
  if (apikey) {
    document.getElementById("apikey").value = apikey;
  }
  document.querySelector("#save").addEventListener("click", save_options);
}

document.addEventListener("DOMContentLoaded", restore_options);