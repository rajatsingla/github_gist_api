'use strict';

import React from 'react';
import Api from '../api/api';
import { Link,Router } from 'react-router';
import LoadingOrError from './LoadingOrError';
import EachGist from './EachGist';
import UserForm from './UserForm';

export default class SearchPage extends React.Component {
	defaults(props){
		return{
			userName: props.params.id,
    	error: null,
	 	 	loading: true,
	  	gists: [],
    	sortBy: props.location.query.sortBy,
  		originalGists: [],
    	searchName: undefined,
    	forks: {},	
		}
	}

	constructor(props) {
	    super(props);
	    this.state = this.defaults(props);
    	this.searchByName = this.searchByName.bind(this);
    	this.add_fork_to_gist = this.add_fork_to_gist.bind(this);
    	this.get_gists = this.get_gists.bind(this);
  	}

  	componentDidMount() {
    	this.get_gists();
  	}

  	componentWillReceiveProps(props){
  		if (props.params.id != this.state.userName){
	  		this.setState(function(){
	          return this.defaults(props);
	        })
	        setTimeout(this.get_gists,0);
  		}
  	}

  	get_gists(){
  		Api.getGists(this.state.userName).then(function(res){
        	this.setState(function () {
	          return {
	            gists:res,
	            originalGists:res,
	            loading: false,
	          }
	        })
	        if (this.state.sortBy){
	        	this.sortBy(this.state.sortBy);
	        }
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

  	addQuery(query){
  		const location = Object.assign({}, this.props.location);
		  Object.assign(location.query, query);
		  this.props.history.push(location);
  	}

  	removeQuery(queryNames){
  		const location = Object.assign({}, this.props.location);
	    queryNames.forEach(q => delete location.query[q]);
	    this.props.history.push(location);
  	}

  	sortBy(param){
  		this.setState(function(){
  			return {
  				loading: true,
  			}
  		})
  		Api.getSortedGistsByForks(this.state.gists,this.state.forks).then(function(res){
        	this.setState(function () {
	          return {
	            gists:res[0],
	            forks:res[1],
	            loading: false,
              sortBy: param,
	          }
	        })
	        this.addQuery({sortBy: param});
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

  	searchByName(event) {
  		var q = event.target.value.toLowerCase();
  		var gists = this.state.originalGists.filter(function(gist){
  			let ans = false;
  			Object.keys(gist.files).map((file, i) => 
				  {if (file.toLowerCase().indexOf(q) !== -1)
				 	  ans=true})
        	
        if(!gist.description){gist.description=''};
	      return ans || gist.description.toLowerCase().indexOf(q) !== -1 
  		})

	    this.setState(function(){
	    	return {
	    		gists: gists,
	    		searchName: q,
	    	}
		  });
  	}

  	add_fork_to_gist(id,forks){
  		var aforks = Object.assign({},this.state.forks);
  		aforks[id] = forks;
  		this.setState(function(){
          return {
            forks: aforks,
          }
        })
  	}

    removeSortBy(param){
      this.setState(function () {
        return {
          gists: Api.getUnSortedGists(this.state.gists),
          sortBy: null,
        }
      })
      this.removeQuery([param]);
    }

	render() {
		var error = this.state.error;
    var userName = this.state.userName;
    var loading = this.state.loading;
    var gists = this.state.gists;
    var sortBy = this.state.sortBy;
    var forks = this.state.forks;

    if (loading || error){
    	return <LoadingOrError error={error} loading={loading} />
    }

  	return (
    		<div>
    			<UserForm/>
          <div className="total-search">
            <h3>{gists.length} gist results for {userName}</h3>
          </div>
          
          <div className="sort-btn">
            {sortBy ? (
              <button onClick={() => this.removeSortBy('sortBy')} className="btn remove-sort" id="remove-sort" key="remove-sort">Remove sort By</button>  
            ) : (
              <button onClick={() => this.sortBy('forks')} className="btn add-sort" id="add-sort" key="add-sort">Sort By forks</button>   
            )}
          </div>
          <div className="clear"></div>
          <hr/>

     			<input type="text" value={this.state.searchName} onChange={this.searchByName} placeholder="Filter by file or description" className="filter-input"/>
     			     			
     			{gists.map((gist,i) =>
     				<li key={gist.id}>
            		<EachGist gist={gist} add_fork_to_gist={this.add_fork_to_gist} forks={forks[gist.id]}/>
            	</li>	
          	)}
     			
    		</div>
  	);


  	}
}
