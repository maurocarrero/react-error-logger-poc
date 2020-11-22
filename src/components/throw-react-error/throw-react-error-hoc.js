import { withErrorBoundary } from 'react-error-boundary';
import ThrowReactError from './throw-react-error';
import { sendErrorData } from '../../client-instrumentation';

const ErrorBoundaryFallbackComponent = ({ error, resetErrorBoundary }) => (
  <div role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

const onError = (error, info) => {
  global.error = error;
  global.info = info;
  const { componentStack } = info;
  console.log('`error` FROM REACT ERROR BOUNDARY ===========');
  console.log(error);
  console.log('`info` FROM REACT ERROR BOUNDARY ===========');
  console.log(info);
  console.log('`componentStack` FROM REACT ERROR BOUNDARY ===========');
  console.log(componentStack);

  sendErrorData({
    message: null,
    source: null,
    lineno: null,
    colno: null,
    error,
    componentStack,
  });
};

const onReset = () => {
  console.log('Resetting...');
};

export const ThrowReactErrorHoc = withErrorBoundary(ThrowReactError, {
  FallbackComponent: ErrorBoundaryFallbackComponent,
  onError,
  onReset,
});

ThrowReactErrorHoc.displayName = 'withErrorBoundary(ThrowReactError)';

export default ThrowReactErrorHoc;
