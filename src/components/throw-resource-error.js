import { useState } from 'react';

function ThrowResourceError() {
  const [state, setState] = useState({
    throwError: false,
  });

  const triggerError = () => {
    setState({
      throwError: true,
    });
  };

  return (
    <section>
      <button onClick={triggerError}>
        <code>Throw Resource Error</code>
      </button>
      {state.throwError && (
        <figure>
          <img src="http://unknown.mauritususususususus.com" alt="unknown"/>
        </figure>
      )}
    </section>
  );
}

export default ThrowResourceError;
