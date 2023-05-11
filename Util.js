const storage = chrome.storage.local;

var button = document.getElementById("submit-command");
button.addEventListener("click", saveCommand);

function saveCommand() {
  var key = document.getElementById("key").value;
  var value = document.getElementById("value").value;
  var item = {};

  getAllKeys();

  if (key && value) {
    item[key] = value;
    storage.set(item);
  }
}

function getAllKeys() {
  chrome.storage.local.get(null, function (items) {
    var allKeys = Object.keys(items);
    console.log(allKeys);
  });
}

function deleteKey(key) {
  var toRemove = [key];

  chrome.storage.local.remove(toRemove, function() {
    var error = chrome.runtime.lastError;
       if (error) {
           console.error(error);
       }
   });
}
