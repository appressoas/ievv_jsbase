
const _KNOWN_SECOND_EXTENSIONS = new Set([
    'tar'
]);

/**
 * Get file extension.
 *
 * @param filename A filename. An URL also works.
 * @returns {string} The extension. Will be an empty string
 *      if we can not determine the extension.
 */
export function getFileExtension(filename) {
    const nameSpit = filename.split('.');
    let extension = '';
    let secondExtension = null;
    if(nameSpit.length > 2) {
        let possibleSecondExtension = nameSpit[nameSpit.length - 2];
        if(_KNOWN_SECOND_EXTENSIONS.has(possibleSecondExtension)) {
            secondExtension = possibleSecondExtension;
        }
    }
    if(nameSpit.length > 1) {
        extension = nameSpit[nameSpit.length - 1];
        if(secondExtension !== null) {
            extension = `${secondExtension}.${extension}`;
        }
    }
    return extension;
}
