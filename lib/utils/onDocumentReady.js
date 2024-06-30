/**
 * Wrap a callback that is called when the document is done loading.
 *
 * @param callback A callback function. Called without any arguments.
 */
export default function onDocumentReady(callback) {
    if (document.readyState != 'loading'){
        callback();
    } else {
        document.addEventListener('DOMContentLoaded', callback);
    }
}
