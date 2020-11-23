import Figure from './figure';
import ThrowError from './throw-error';
import ThrowErrorInEvent from './throw-error-in-event';
import ThrowResourceError from './throw-resource-error';
import ThrowReactError from './throw-react-error';
import ThrowReactErrorInEvent from './throw-react-error-in-event'

function Header() {
  return (
    <header className="App-header">
      <Figure />
      <ThrowError />
      <ThrowErrorInEvent />
      <ThrowResourceError />
      <ThrowReactError />
      <ThrowReactErrorInEvent />
    </header>
  );
}

Header.displayName = 'Header';

export default Header;
