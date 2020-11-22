import axios from 'axios';
import StackTrace from 'stacktrace-js';

const logError = (errorData) => {
  axios
    .post('http://localhost:4000/error-logger', errorData)
    .then(function (response) {
      console.log('res', response);
    })
    .catch(function (error) {
      console.log('error', error);
    });
};

const stackFramesToString = (stackframes) =>
  stackframes.map((sf) => sf.toString()).join('\n');

export const sendErrorData = ({
  message,
  source,
  lineno,
  colno,
  error,
  componentStack,
}) => {
  const { stack } = error;

  StackTrace.fromError(error)
    .then((stackFrames) =>
      logError({
        message,
        source,
        lineno,
        colno,
        error,
        stackFromError: stack,
        errorStackTrace: stackFramesToString(stackFrames),
        componentStack,
      })
    )
    .catch((errBack) => {
      console.error('Error back from error reporting:', errBack);
    });
};

(global || window).onerror = function (message, source, lineno, colno, error) {
  sendErrorData({
    message,
    source,
    lineno,
    colno,
    error,
  });
};

(global || window).addEventListener('error', (error) => {
  console.log('window.addEventListener', error);
});
