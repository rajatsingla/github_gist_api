'use strict';

import React from 'react';
import { Link } from 'react-router';
import LoadingOrError from './LoadingOrError';
import Api from '../api/api';

export default class Forks extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	forks: [],
	    	url: props.url,
	    	error: null,
	    };
	    this.add_fork_to_gist = this.add_fork_to_gist.bind(this);
  	}

  	componentDidMount() {
  		if (this.props.forks == undefined){
  			Api.getResByUrl(this.state.url).then(function(res){
	        	this.add_fork_to_gist(res);
	      	}.bind(this))
	      	.catch(function (error) {
		        this.setState(function(){
		          return {
		            error: `${error.response.data.message}. Try after some time.`,
		            loading: false,
		          }
		        })
	      	}.bind(this));
  		}
  	}

  	add_fork_to_gist(forks){
  		this.props.add_fork_to_gist(forks);
  	}	

  	render() {
  		var forks = this.props.forks;
  		if (forks == undefined){
  			var loading = true;	
  		}else{
  			var loading = false;
  			var sforks = forks.slice(Math.max(forks.length - 3, 0))
  		}
  		var error = this.state.error;

  		if (loading || error){
	    	return <LoadingOrError error={error} loading={loading} />
	    }

		return (
			<div>
				<span className="forks"><i className="fa fa-code-fork" aria-hidden="true"></i>Total forks: {forks.length}</span>
				<div className="fork-avatar">
					{sforks.map((fork,i) =>
            			<a href={fork.html_url} target="_blank"><img height='30' width='30' src={fork.owner.avatar_url} className="avatar-img"/></a>
		          	)}
	          	</div>
			</div>	
  		);
	}
}