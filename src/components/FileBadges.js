'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class FileBadges extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	files: props.files,
	    	badges: [],
	    };
  	}


  	render() {
  		var files = this.state.files;
		return (
			<div>
				<span className="forks"><i className="fa fa-files-o" aria-hidden="true"></i>Files with badges</span>
				{Object.keys(files).map((file, i) => (
	            	<div className="each-badge">
	            		<a href={files[file].raw_url} target="_blank"><i className={`icon-${files[file].language.toLowerCase()}`}></i> {file}</a>
	            	</div>)
	          	)}
			</div>	
  		);
	}
}