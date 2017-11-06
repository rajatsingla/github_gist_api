'use strict';

import React from 'react';
import { Router, browserHistory } from 'react-router';
import routes from '../routes';

// This component is used to build browser history for our app and scroll to top on route change
// we pass all the route information to router component inported from react-router
export default class AppRoutes extends React.Component {
  render() {
    return (
      <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
    );
  }
}
