//Users : https://jsonplaceholder.typicode.com/users

//Comments : https://jsonplaceholder.typicode.com/comments

//Comments of User 1 : https://jsonplaceholder.typicode.com/posts/1/comments
var i = 0 ;
var log = document.getElementById('log');

// on crée une nouvelle promesse :
var getPromise = function (url) {
  return new Promise(
    // La fonction de résolution est appelée avec la capacité de
    // tenir ou de rompre la promesse
    function(resolve , reject) {

      var xhr = new window.XMLHttpRequest()
      //console.log('url : '+url) ;
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 ){
          if (xhr.status === 200){
            resolve(xhr.responseText) ;
          } else {
            reject(xhr)
          }
        }
      }
      xhr.open('GET' , url , true)
      xhr.send()
    });
  }

var getPromisePosts = function () {
  return new Promise(
    function(resolve , reject) {
      getPromise('https://jsonplaceholder.typicode.com/users')
      .then(function (response) {
        var users = JSON.parse(response);
        getPromise('https://jsonplaceholder.typicode.com/posts/'+users[0]["id"]+'/comments')
        .then(function (response) {
          var posts = JSON.parse(response);
          resolve(posts);
        })
        .catch(function (e) {
          //console.error("Erreur Ajax ", e);
        })
      })
  .catch(function (e) {
    //console.error("Erreur Ajax ", e);
  })
})}

var getPromisePostsFailed = function () {
  return new Promise(
    function(resolve , reject) {
      getPromise('https://jsonplaceholder.typicode.com/usersSSS')
      .then(function (response) {
        var users = JSON.parse(response);
        getPromise('https://jsonplaceholder.typicode.com/posts/'+users[0]["id"]+'/comments')
        .then(function (response) {
          var posts = JSON.parse(response);
          resolve(posts);
        })
        .catch(function (e) {
          //console.error("Erreur Ajax ", e);
        })
      })
  .catch(function (e) {
    //console.error("Erreur Ajax ", e);
  })
})}

//console.log(getPromise('https://jsonplaceholder.typicode.com/users'));

getPromise('https://jsonplaceholder.typicode.com/users')
.then(
  function(response) {
    //console.log("MyPromesse");
    var users = JSON.parse(response);
    //console.log(users[0]);
  })
.catch(function (e) {
  //console.error("Erreur Ajax ", e);
});


getPromisePosts()
.then(function(response) {
    //console.log("MyPromesse");
    //console.log(response);
    var posts = JSON.parse(response);
    //console.log(posts);
  })
  .catch(function (e) {
    //console.error("Erreur Ajax ", e);
  });




getPromisePostsFailed()
.then(function(response) {
    //console.log("MyPromesse");
    //console.log(response);
    var posts = JSON.parse(response);
    //console.log(posts);
  })
  .catch(function (e) {
    //console.error("Erreur Ajax ", e);
  });

var catchError = function (e) {
  //console.error("Erreur Ajax ", e);
}

var showResponse = function (response) {
  //console.log("Reponse Ajax : ",response);
  //console.log("MyPromesse");
  var users = JSON.parse(response);
  //console.log(users[0]);
}
