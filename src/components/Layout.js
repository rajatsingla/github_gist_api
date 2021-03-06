'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <header>
          <Link to={'/'} className="btn">
            Gists
          </Link>
          <hr/>
        </header>

        <div className="app-content">{this.props.children}</div>

        <footer>
        </footer>
      </div>
    );
  }
}
