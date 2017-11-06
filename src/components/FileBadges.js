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
				{Object.keys(files).map((file, i) => (
	            	<div>
	            		<i className={`icon-${files[file].language.toLowerCase()}`}></i> {file}	
	            	</div>)
	          	)}
			</div>	
  		);
	}
}