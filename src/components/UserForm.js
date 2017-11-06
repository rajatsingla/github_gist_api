'use strict';

import React from 'react';
import { Link,Router } from 'react-router';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    if (this.state.value)
      this.context.router.push('/search/'+this.state.value);
  }

  render() {
    var userName=this.state.value;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Enter user name"/>
        </label>

        {userName &&
          <input type="submit" value={`Search gists for ${userName}`} className="btn" />
        }

      </form>
    );
  }
}

UserForm.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default UserForm;