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
      var top = rect.top +scrollY()
      var fake = document.createElement('div')
      fake.style.width = rect.width + "px"
      fake.style.height = rect.height + "px"
      console.log(top);

      // FUNCTIONS
      var onScroll =  function () {
        var hasScrollClass = element.classList.contains('fixed')
        console.log('scroll');
        if (scrollY() > top && !hasScrollClass ) {
          console.log("< 0");
          element.classList.add('fixed')
          element.style.width = rect.width
          element.parentNode.insertBefore(fake, element)
        }
        else if (scrollY() < top && hasScrollClass ) {
          console.log(">= 0");
          element.classList.remove('fixed')
          element.parentNode.removeChild(fake)

        }
      }

      var onResize = function(){
        console.log("onResize");
        element.style.width = "auto"
        element.classList.remove('fixed')
        fake.style.display = "none"
        rect = element.getBoundingClientRect()
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
