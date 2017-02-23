(function(){
  /*
  Lorsqu'on scroll
  Si le menu sors de l'écran
  Alors il deviendra fixe
  */

  // VARIABLE
  var scrollY = function () {
    var supportPageOffset = window.pageXOffset !== undefined;
    var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
    //var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
    var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    return y ;
  }

  var elements = document.querySelectorAll('[data-sticky]')
  for (var i = 0; i < elements.length; i++) {
    (function(element){
      console.log("element callback",element);
      //Lorsqu'on appel plusieur fois la meme fonction il est plus performant de la stocker au préalable dans une variable
      var rect = element.getBoundingClientRect()
      //if element.getAttribute('data-offset') === null then 0 else value
      var offset = parseInt(element.getAttribute('data-offset') || 0, 10)
      console.log("offset",offset);
      if (element.getAttribute('data-constraint')) {
        var constraint = document.querySelector(element.getAttribute('data-constraint'))
      }
      else {
        var constraint = document.body
      }
      var constraintRect = constraint.getBoundingClientRect()
      var constraintBottom = constraintRect.top + scrollY() + constraintRect.height - offset - rect.height
      var top = rect.top +scrollY()
      var fake = document.createElement('div')
      fake.style.width = rect.width + "px"
      fake.style.height = rect.height + "px"
      console.log(top);

      // FUNCTIONS
      var onScroll =  function () {
        var hasScrollClass = element.classList.contains('fixed')
        console.log('scroll');

        if (scrollY() > constraintBottom && element.style.position != 'absolute') {
          element.classList.remove('fixed')
          element.style.position = 'absolute'
          element.style.bottom = '0'
          element.style.top = 'auto'
        } else if (scrollY() > (top - offset) && scrollY() < constraintBottom && !hasScrollClass && element.style.position != 'fixed') {
          console.log("< 0");
          element.classList.add('fixed')
          element.style.bottom = 'auto'
          element.style.position = 'fixed'
          element.style.top= offset + "px"
          element.style.width = rect.width
          element.parentNode.insertBefore(fake, element)
        }
        else if (scrollY() < (top - offset) && hasScrollClass  && element.style.position != 'static') {
          console.log(">= 0");
          element.classList.remove('fixed')
          element.style.position = 'static'
          if (element.parentNode.contains(fake)){
            element.parentNode.removeChild(fake)
          }
        }
      }

      var onResize = function(){
        console.log("onResize");
        element.style.width = 'auto'
        element.classList.remove('fixed')
        element.style.position = 'static'
        fake.style.display = "none"
        rect = element.getBoundingClientRect()
        constraintRect = constraint.getBoundingClientRect()
        constraintBottom = constraintRect.top + scrollY() + constraintRect.height - offset - rect.height
        top = rect.top +scrollY()
        fake.style.width = rect.width + "px"
        fake.style.height = rect.height + "px"
        fake.style.display = "block"
        onScroll()
      }


      // LISTENER
      window.addEventListener('scroll', onScroll)
      window.addEventListener('resize', onResize)
    })(elements[i])
  }
  var element = document.querySelector('.menu')

})()
