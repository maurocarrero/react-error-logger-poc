import { parseEventPath, sendErrorData } from './error-logger.utils';

window.onerror = function (message, source, lineno, colno, error) {
  sendErrorData({
    colno,
    error,
    lineno,
    message,
    source,
    type: 'Caught in window.onerror',
  });
};

window.addEventListener(
  'error',
  (event) => {
    const { error } = event;

    // - If error is present it should be caught and processed by window.onerror.
    // - The error present in ErrorEvent has no `stack`.
    if (!error) {
      const { path: eventPath, composedPath, target } = event;
      // https://stackoverflow.com/questions/39245488/event-path-is-undefined-running-in-firefox
      const actualPath =
        !eventPath && typeof composedPath === 'function'
          ? composedPath()
          : eventPath;
      const path = eventPath ? parseEventPath(actualPath) : null;
      sendErrorData({
        path,
        source: target.outerHTML,
        type: 'Error in event',
      });
    }
  },
  true
);
