import { withErrorBoundary } from 'react-error-boundary';
import { sendErrorData } from '../../client-instrumentation';
import ThrowReactErrorInEvent from './throw-react-error-in-event';

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

export const ThrowReactErrorInEventHoc = withErrorBoundary(ThrowReactErrorInEvent, {
  FallbackComponent: ErrorBoundaryFallbackComponent,
  onError: onError(true),
  onReset,
});

ThrowReactErrorInEventHoc.displayName = 'withErrorBoundary(ThrowReactErrorInEvent)';

export default ThrowReactErrorInEventHoc;
