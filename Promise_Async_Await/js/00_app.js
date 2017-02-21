//Users : https://jsonplaceholder.typicode.com/users

//Comments : https://jsonplaceholder.typicode.com/comments

//Comments of User 1 : https://jsonplaceholder.typicode.com/posts/1/comments
var get = function (url) {

  var xhr = new window.XMLHttpRequest()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 ){
      //console.log(xhr.responseText);
      return xhr.responseText ;
    }
  }
  xhr.open('GET' , url , true)
  xhr.send()
}

var getPosts = function () {
  get('https://jsonplaceholder.typicode.com/users') ;
  //var users = get('https://jsonplaceholder.typicode.com/users') ;
}

var getPostsFailed = function () {
  //var users = get('https://jsonplaceholder.typicode.com/userssss');
}

getPosts();

getPostsFailed();
