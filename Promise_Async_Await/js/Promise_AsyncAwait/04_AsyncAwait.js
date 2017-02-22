//@Tuto : https://www.grafikart.fr/tutoriels/javascript/promise-async-await-875

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
var getAsyncAwait = function (url) {
  return new Promise(
    // La fonction de résolution est appelée avec la capacité de
    // tenir ou de rompre la promesse
    function(resolve , reject) {

      var xhr = new window.XMLHttpRequest()
      console.log('url : '+url) ;
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

  var getAsyncAwaitPosts = async function () {
    var response = await getAsyncAwait('https://jsonplaceholder.typicode.com/users')
    var users = JSON.parse(response);
    throw "Users founded"
    response = await getAsyncAwait('https://jsonplaceholder.typicode.com/posts/'+users[0]["id"]+'/comments')
    var posts = JSON.parse(response);
    return posts;
  }

  var getAsyncAwaitFirstPost = async function () {
    var response = await getAsyncAwaitPosts()
    var post = JSON.parse(response)[0];
    return post;
  }

var getAsyncAwaitPostsFailed_00 = async function () {
  var response = await getAsyncAwait('https://jsonplaceholder.typicode.com/usersSSS')
  var users = JSON.parse(response);
  response = await getAsyncAwait('https://jsonplaceholder.typicode.com/posts/'+users[0]["id"]+'/comments')
  var posts = JSON.parse(response);
  return posts ;
}

var getAsyncAwaitPostsFailed_01 = async function () {
  var response = await getAsyncAwait('https://jsonplaceholder.typicode.com/users')
  var users = JSON.parse(response);
  response = await getAsyncAwait('https://jsonplaceholder.typicode.com/postTs/'+users[0]["id"]+'/comments')
  var posts = JSON.parse(response);
  return posts ;
}

var demo = async function() {
  var arr = await Promise.all([getAsyncAwaitPosts(), getAsyncAwaitFirstPost()])
  console.log(arr);
}

getAsyncAwait('https://jsonplaceholder.typicode.com/users')
.then(showResponse)
.catch(catchError);

getAsyncAwaitPosts()
.then(showResponse)
.catch(catchError);

getAsyncAwaitFirstPost()
.then(showResponse)
.catch(catchError);

demo()
.then(showResponse)
.catch(catchError);

getAsyncAwaitPostsFailed_00()
.then(showResponse)
.catch(catchError);

getAsyncAwaitPostsFailed_01()
.then(showResponse)
.catch(catchError);
