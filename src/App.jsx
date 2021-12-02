import React, { Fragment } from 'react';
import Nav from './component/Nav';
import Notification from './component/Notification';
import Products from './component/Products';
import DeprecatedBox from './component/DeprecatedBox';

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
