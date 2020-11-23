import axios from 'axios';
import StackTrace from 'stacktrace-js';

const logError = (errorData) => {
  axios
    .post('http://localhost:4000/error-logger', {
      errorData,
    })
    .then(function () {
      console.log('Error reported correctly');
    })
    .catch(function (error) {
      console.log('Failed to report the error', error);
    });
};

const stackFramesToString = (stackframes) =>
  stackframes.map((sf) => sf.toString()).join('\n');

const parseEventPath = (pathObj) => {
  return pathObj.reduce((pathString, node) => {
    const { className, id, localName, nodeName } = node;
    const name = localName || nodeName;
    return name
      ? `|${name}${id ? '#' + id : ''}${
          className ? '.' + className : ''
        }`.concat(pathString)
      : pathString;
  }, '');
};

const sendErrorData = async ({
  colno,
  componentStack,
  error,
  lineno,
  message,
  path,
  source,
  type,
}) => {
  try {
    let stack = null;
    let parsedStack = null;

    if (error) {
      stack = error.stack;
      const stackFrames = await StackTrace.fromError(error);
      parsedStack = stackFramesToString(stackFrames);
    }

    logError({
      colno,
      componentStack,
      lineno,
      location: window.location.href,
      message,
      path,
      source,
      stack,
      parsedStack,
      type,
      userAgent: navigator.userAgent,
    });
  } catch (errBack) {
    console.error('Error back from error reporting:', errBack);
  }
};

export { sendErrorData, parseEventPath };
