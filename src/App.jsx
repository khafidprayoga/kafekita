import React, { Fragment } from 'react';
import Nav from './components/Nav';
import Notification from './components/Notification';
import Products from './components/Products';
import DeprecatedBox from './components/DeprecatedBox';

class App extends React.Component {
  render() {
    return (
      <>
        <Nav />
        <Notification />
        <Products />
        <DeprecatedBox />
      </>
    );
  }
}

export default App;
