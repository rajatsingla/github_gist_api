'use strict';

import React from 'react';
import { Link } from 'react-router';
import Loading from './Loading';

export default class LoadingOrError extends React.Component {
  	render() {
  		var error = this.props.error;
  		var loading = this.props.loading;

		
	    if (loading === true) {
	      return <Loading />
	    }

	    if (error) {
	      return (
	        <div>
	          <p>{error}</p>
	        </div>
	      )
	    }
	}
}