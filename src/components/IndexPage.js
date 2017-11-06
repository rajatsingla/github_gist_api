'use strict';

import React from 'react';
import Api from '../api/api';
import UserForm from './UserForm'
import { Link } from 'react-router';

export default class IndexPage extends React.Component {
  render() {
    return (
      <div className="home">
        hello
        <UserForm/>
      </div>

    );
  }
}
