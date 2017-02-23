//Variable
var button = document.querySelector('.spoiler button')

//Function

//Listeners
button.addEventListener('click',function(){
  this.nextElementSibling.classList.add('visible')
  this.parentNode.removeChild(this)
})
