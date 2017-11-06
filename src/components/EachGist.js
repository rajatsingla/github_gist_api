'use strict';

import React from 'react';
import { Link } from 'react-router';
import LoadingOrError from './LoadingOrError';
import Forks from './Forks';
import FileBadges from './FileBadges';

export default class EachGist extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	gist: props.gist,
	    	badges: [],
	    	files: [],
	    	error: null,
	    	loading: false,
	    };
	    this.add_fork_to_gist = this.add_fork_to_gist.bind(this);
  	}

  	add_fork_to_gist(forks){
  		this.props.add_fork_to_gist(this.state.gist.id,forks);
  	}

  	render() {
  		var gist=this.state.gist;
  		var loading = this.state.loading;
  		var error = this.state.error;
  		var forks = this.props.forks;

  		if (loading || error){
	    	return <LoadingOrError error={error} loading={loading} />
	    }

		return (
			<div>
				{gist.url}
				<div>Forks</div>
				<Forks url={gist.forks_url} forks={forks} add_fork_to_gist={this.add_fork_to_gist}/>
				<FileBadges files={gist.files}/>
			</div>	
  		);
	}
}