//Users : https://jsonplaceholder.typicode.com/users

//Comments : https://jsonplaceholder.typicode.com/comments

//Comments of User 1 : https://jsonplaceholder.typicode.com/posts/1/comments

/*
  Promesses

  let p =  new Promise( function (resolve , reject) {
  ...
  resolve(...)
  ...
  reject(...)


  p
  .then()
  .then()
  .then()
  .then()
  .catch()
})

*/

var catchError = function (e) {
  console.error("Erreur Ajax : ", e , e.status);
}

var showResponse = function (response) {
  console.log("Reponse Ajax : ",response);
}

// on crée une nouvelle promesse :
var getPromise2 = function (url) {
  return new Promise(
    // La fonction de résolution est appelée avec la capacité de
    // tenir ou de rompre la promesse
    function(resolve , reject) {

      var xhr = new window.XMLHttpRequest()
      console.log('url : '+url) ;
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 ){
          if (xhr.status === 200){
          } else {
            resolve(xhr.responseText) ;
            reject(xhr)
          }
        }
      }
      xhr.open('GET' , url , true)
      xhr.send()
    });
  }

var getPromise2Posts = function () {
  return getPromise2('https://jsonplaceholder.typicode.com/users')
      .then(function (response) {
        var users = JSON.parse(response);
        throw "Users founded"
        return getPromise2('https://jsonplaceholder.typicode.com/posts/'+users[0]["id"]+'/comments')})
      .then(function (response) {
        var posts = JSON.parse(response);
        return posts;
      })}

var getPromise2PostsFailed_00 = function () {
  return getPromise2('https://jsonplaceholder.typicode.com/usersSSS')
      .then(function (response) {
        var users = JSON.parse(response);
        return getPromise2('https://jsonplaceholder.typicode.com/posts/'+users[0]["id"]+'/comments')})
        .then(function (response) {
          var posts = JSON.parse(response);
          return posts;
        })}

var getPromise2PostsFailed_01 = function () {
  return getPromise2('https://jsonplaceholder.typicode.com/users')
      .then(function (response) {
        var users = JSON.parse(response);
        return getPromise2('https://jsonplaceholder.typicode.com/postTs/'+users[0]["id"]+'/comments')
        .then(function (response) {
          var posts = JSON.parse(response);
          return posts;
        })
})}

getPromise2('https://jsonplaceholder.typicode.com/users')
.then(showResponse)
.catch(catchError);

getPromise2Posts()
.then(showResponse)
.catch(catchError);

getPromise2PostsFailed_00()
.then(showResponse)
.catch(catchError);

getPromise2PostsFailed_01()
.then(showResponse)
.catch(catchError);
