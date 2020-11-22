import { useState } from 'react';

function ThrowError() {
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
        <code>Throw Error</code>
      </button>
    </section>
  );
}

export default ThrowError;
