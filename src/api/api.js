var axios = require('axios');

var id = "769fcab3b141f14de841";
var sec = "cab06d1d7b726b59bdb968e2a468983616696c9d";
var params = "?client_id=" + id + "&client_secret=" + sec;


function getGists(username) {
  return axios.get('https://api.github.com/users/'+ username + '/gists' + params)
    .then(function (user){
      return user.data;
    });
}

function getResByUrl(url) {
  return axios.get(url + params)
    .then(function (res){
      return res.data;
    });
}

function sortGists (gists) {
  return gists.sort(function (a,b) {
    return -a.forkLen + b.forkLen;
  });
}

function getSortedGistsByForks(gists,forks) {
  let promises = [];
  for (let i = 0; i < gists.length; i++) {
      if (forks[gists[i].id] == undefined){
        let promise = getResByUrl(gists[i].forks_url);
        promise.then((res)=>{
          forks[gists[i].id]=res;
          gists[i].forkLen = res.length;
        })
        promises.push(promise);  
      }else{
        gists[i].forkLen=forks[gists[i].id].length;
      }
  } 
  return axios.all(promises).then(function(){
    return [sortGists(gists),forks];
  })
}

function getUnSortedGists(gists) {
  return gists.sort(function (a,b) {
    return a.created_at > b.created_at;
  });
}


module.exports = {
  getGists,
  getResByUrl,
  getSortedGistsByForks,
  getUnSortedGists
};