let observer = new IntersectionObserver(function (observables){
  observables.forEach(function (observable) {
    if (observable.intersectionRatio > 0.5){
      observable.target.classList.remove('not-visible')
      observer.unobserve(observable.target)
      console.log('visible');
    }
    else {
      console.log('not-visible');
      observable.target.classList.add('not-visible')
    }
  })
  console.log(observables , ">>>>>>>>>>");
}, {
  threshold: [0.5] // permet d'indiquer la zone à partir de laquelle l'élément devient 'visible'
});

// Mais on peut regarder plusieurs éléments
let items = document.querySelectorAll('.text, .image')
items.forEach(function (item) {
  item.classList.add('not-visible')
  observer.observe(item)
})
