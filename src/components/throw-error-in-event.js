import { someActionThatMightThrow } from './utils';

function ThrowErrorInEvent() {
  const triggerError = () => {
    someActionThatMightThrow();
  };

  const triggerHandledError = () => {
    try {
      someActionThatMightThrow();
    } catch (err) {
      console.log('ThrowErrorInEvent::onClick --> Handled error', err);
    }
  };

  return (
    <section>
      <button onClick={triggerError}>
        <code>Throw UNhandled error in onClick Handler</code>
      </button>
      <button onClick={triggerHandledError}>
        <code>Throw handled error in onClick Handler</code>
      </button>
    </section>
  );
}

export default ThrowErrorInEvent;
