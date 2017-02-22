//Users : https://jsonplaceholder.typicode.com/users

//Comments : https://jsonplaceholder.typicode.com/comments

//Comments of User 1 : https://jsonplaceholder.typicode.com/posts/1/comments
var getCallBack = function (url , success , error) {

  var xhr = new window.XMLHttpRequest()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 ){
      success(xhr.responseText) ;
    }
    else {
      error(xhr);
    }
  }
  xhr.open('GET' , url , true)
  xhr.send()
}

var getCallBackPosts = function (success , error) {
  getCallBack('https://jsonplaceholder.typicode.com/users' , function (response) {
    var users = JSON.parse(response);
    getCallBack('https://jsonplaceholder.typicode.com/posts/'+users[0]["id"]+'/comments', function (response) {
      var posts = JSON.parse(response);
      success(posts);
      //console.log("################ Post" + posts[0]);
    }, function (e) {
      error("Erreur Ajax ", e);
    })
  }, function (e) {
    error("Erreur Ajax ", e);
  })
}
