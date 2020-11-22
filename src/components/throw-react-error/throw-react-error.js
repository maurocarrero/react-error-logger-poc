import { useState } from 'react';

function ThrowReactError() {
  const [state, setState] = useState({
    throwError: false,
  });

  if (state.throwError) {
    throw Error('Render error');
  }

  const triggerError = () => {
    setState({
      throwError: true,
    });
  };

  return (
    <section>
      <button onClick={triggerError}>
        <code>Throw from React</code>
      </button>
    </section>
  );
}

ThrowReactError.displayName = 'ThrowReactError';

export default ThrowReactError;
