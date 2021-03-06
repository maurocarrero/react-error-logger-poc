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

const onError = (report) => (error, info) => {
  const { componentStack } = info;

  if (report) {
    sendErrorData({
      componentStack,
      error,
      message: error.message,
      type: 'React error',
    });
  }
};

const onReset = () => {
  console.log('Resetting...');
};

export const ThrowReactErrorHoc = withErrorBoundary(ThrowReactError, {
  FallbackComponent: ErrorBoundaryFallbackComponent,
  onError: onError(true),
  onReset,
});

ThrowReactErrorHoc.displayName = 'withErrorBoundary(ThrowReactError)';

export default ThrowReactErrorHoc;
