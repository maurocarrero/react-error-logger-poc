import Figure from './figure';
import ThrowError from './throw-error';
import ThrowReactError from './throw-react-error';

function Header() {
  return (
    <header className="App-header">
      <Figure />
      <ThrowError />
      <ThrowReactError />
    </header>
  );
}

Header.displayName = 'Header';

export default Header;
