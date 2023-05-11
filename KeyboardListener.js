const prefix = "/";
const regex = /^\/[a-z]*/g;
const storage = chrome.storage.local;
var command = "";
var flag = false;

document.addEventListener("keyup", function (e) {
  var char = e.key;
  var value = document.activeElement.value;

  if (char === " " || char === "Backspace") flag = false;

  if (value === prefix) flag = true;

  if (flag) {
    var value = document.activeElement.value;
    validateCommand(value);
  }
});

function validateCommand(command) {
  if (command !== undefined && command !== null && command !== "") {
    var match = command.match(regex);
    if (match !== null) {
      decideCommand(match[0].substring(1));
    } else {
      flag = false;
    }
  } else {
    flag = false;
  }
}

function decideCommand(command) {
  document.activeElement.focus();
  getData(command).then((value) => {
    if (value) {
      document.activeElement.value = value;
    }
  });
}

function getData(sKey) {
  return new Promise(function (resolve, reject) {
    storage.get(sKey, function (items) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        reject(chrome.runtime.lastError.message);
      } else {
        resolve(items[sKey]);
      }
    });
  });
}
