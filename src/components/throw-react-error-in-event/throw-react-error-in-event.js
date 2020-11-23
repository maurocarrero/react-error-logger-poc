import { useErrorHandler } from 'react-error-boundary';
import { someActionThatMightThrow } from '../utils';

function ThrowReactErrorInEvent() {
  const handleError = useErrorHandler();

  const triggerError = () => {
    someActionThatMightThrow();
  };

  const triggerHandledError = () => {
    try {
      someActionThatMightThrow();
    } catch (err) {
      console.log('err', err);
      handleError(err);
    }
  };

  return (
    <section>
      <button onClick={triggerError}>
        <code>Throw UNhandled error in onClick Handler</code>
      </button>
      <button onClick={triggerHandledError}>
        <code>Handle error in onClick Handler with React</code>
      </button>
    </section>
  );
}

ThrowReactErrorInEvent.displayName = 'ThrowReactErrorInEvent';

export default ThrowReactErrorInEvent;
