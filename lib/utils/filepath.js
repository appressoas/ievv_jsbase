"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFileExtension = getFileExtension;

var _KNOWN_SECOND_EXTENSIONS = new Set(['tar']);
/**
 * Get file extension.
 *
 * @param filename A filename. An URL also works.
 * @returns {string} The extension. Will be an empty string
 *      if we can not determine the extension.
 */


function getFileExtension(filename) {
  var nameSpit = filename.split('.');
  var extension = '';
  var secondExtension = null;

  if (nameSpit.length > 2) {
    var possibleSecondExtension = nameSpit[nameSpit.length - 2];

    if (_KNOWN_SECOND_EXTENSIONS.has(possibleSecondExtension)) {
      secondExtension = possibleSecondExtension;
    }
  }

  if (nameSpit.length > 1) {
    extension = nameSpit[nameSpit.length - 1];

    if (secondExtension !== null) {
      extension = "".concat(secondExtension, ".").concat(extension);
    }
  }

  return extension;
}