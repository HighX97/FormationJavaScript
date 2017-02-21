'use strict';
//Users : https://jsonplaceholder.typicode.com/users

//Comments : https://jsonplaceholder.typicode.com/comments

//Comments of User 1 : https://jsonplaceholder.typicode.com/posts/1/comments
var i = 0 ;
var log = document.getElementById('log');

var getPromise = function (url) {
  return new Promise(
    function(resolve , reject) {
      var xhr = new window.XMLHttpRequest()
      console.log('url : '+url) ;
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 ){
          console.log("THEN"+(i++)+"  : "+xhr.readyState);
          resolve(xhr.responseText) ;
        }
        else {
          console.log("CATCH"+(i++)+"  : "+xhr.readyState);
          reject(xhr);
        }
      }
      xhr.open('GET' , url , true)
      xhr.send()
    });
  }

  getPromise('https://jsonplaceholder.typicode.com/users')
  .then(
    function(response) {
      var users = JSON.parse(response);
      console.log(response);
      log.insertAdjacentHTML('beforeend', ') Promise fulfilled (<small>Fin du code asynchrone</small>)<br/>');

    })
  .catch(catchError);

    /*
    var getPromisePosts = function (success , error) {
    getPromise('https://jsonplaceholder.typicode.com/users').then(function (response) {
    var users = JSON.parse(response);
    getPromise('https://jsonplaceholder.typicode.com/posts/'+users[0]["id"]+'/comments').catch(catchError), function (response) {
    var posts = JSON.parse(response);
    resolve(posts);
    console.log("################ Post" + posts[0]);
  }, function (e) {
  reject("Erreur Ajax ", e);
}
}), function (e) {
reject("Erreur Ajax ", e);
}
}

var getPromisePostsFailed = function () {
/*
getPromise('https://jsonplaceholder.typicode.com/userssss', function (response) {
var users = JSON.parse(response);
console.log("################ User" +users[0]);}
, function (reject) {
console.reject(reject);
})
}
*/


var catchError = function (e) {
  console.error("Erreur Ajax ", e);
}
