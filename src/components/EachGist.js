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
				<a href={gist.html_url} className="description" target="_blank"><b>Description:</b> {gist.description}</a>
				<span className="meta-info"><i className="fa fa-calendar" aria-hidden="true"></i>{gist.created_at}</span>
				<span className="meta-info"><a href={gist.html_url} target="_blank"><i className="fa fa-comment" aria-hidden="true"></i>{gist.comments} comments</a></span>
				<span className="meta-info"><i className="fa fa-files-o" aria-hidden="true"></i>{Object.keys(gist.files).length} files</span>

				<Forks url={gist.forks_url} forks={forks} add_fork_to_gist={this.add_fork_to_gist}/>
				<FileBadges files={gist.files}/>
			</div>	
  		);
	}
}