let page;
 
if (!localStorage.getItem('page')) {
  page = 1
  storePage(page)
  getHeroesList(page) 
} else {
  page = localStorage.getItem('page')
  getHeroesList(page)
}

const listContainer = document.getElementById('heroes-list')
const previousBtn = document.getElementById('previous')
const nextBtn = document.getElementById('next')
const paginationBtns = document.getElementById('pagination-btns')
const modal = document.querySelector('.modal')
const closeBtn = document.getElementById('closeBtn')
const heroName = document.querySelector('.hero-name')
const gender = document.querySelector('.gender')
const birthYear = document.querySelector('.birth-year')
const species = document.querySelector('.species')
const planet = document.querySelector('.planet')
const filmsList = document.querySelector('.films')

paginationBtns.addEventListener('click', setPage)
closeBtn.addEventListener('click', toggleModal)

function getSpecies(url) {
  if (url.length === 0) {
    species.innerHTML = 'N/A'
  } else {
     axios.get(url)
    .then((response) => {
     species.innerHTML = response.data.name
    })
    .catch(error => console.log(error))
  }
}

function getPlanet(url) {
  axios.get(url)
    .then((response) => {
      planet.innerHTML = response.data.name
    })
    .catch(error => console.log(error))
}

function getFilms(list) {
  if (list.length === 0) {
    filmsList.innerHTML = 'N/A'
  } else {
    for (url of list) {
    axios.get(url)
      .then((response) => {
        let li = document.createElement('li');
        li.innerHTML = response.data.title
        filmsList.appendChild(li)
      })
    .catch(error => console.log(error))
    }
  }
}

function toggleModal() {
  heroName.innerHTML = ''
  gender.innerHTML = ''
  birthYear.innerHTML = ''
  species.innerHTML = ''
  planet.innerHTML = ''
  filmsList.innerHTML = ''
  modal.classList.toggle('invisible')
}

function showHeroInfo(hero) {
  toggleModal();

  getSpecies(hero.species)
  getPlanet(hero.homeworld)
  getFilms(hero.films)
  heroName.innerHTML = hero.name
  gender.innerHTML = hero.gender
  birthYear.innerHTML = hero.birth_year
}

function toggleImgVisibility(e) {
  let target = e && e.target
  if (target && e.type === 'mouseenter') {
    target.style.transform = 'scale(1.1)'
    target.childNodes[1].style.visibility = 'visible'
  }
  if (target && e.type === 'mouseleave') {
    target.style.transform = 'scale(1)'
    target.childNodes[1].style.visibility = 'hidden';
  }
}

function storePage(page) {
  localStorage.setItem('page', page)
}

function setPage(e) {
  let target = e && e.target
  if (target.getAttribute('id') === 'next' && page < 9) {
    ++ page
    previousBtn.removeAttribute('disabled', 'disabled')
  } else if (target.getAttribute('id') === 'previous' && page > 1) {
    -- page
    nextBtn.removeAttribute('disabled', 'disabled')
  }
  storePage(page)
  getHeroesList(page)
}

function displayHeroesList(response) {
  let responseList = response.data.results

  listContainer.innerHTML = ''
 
  if (response.data.previous === null) {
    previousBtn.setAttribute('disabled', 'disabled');
  } else if (response.data.next === null) {
    nextBtn.setAttribute('disabled', 'disabled');
  }
  
  responseList.map(hero => {
    const liElement = document.createElement('li')
    const imgElement = document.createElement('img')
    let heroName = hero.name
    
    liElement.innerHTML = heroName
    liElement.insertAdjacentElement('beforeend', imgElement)
    liElement.classList.add('hero')
    imgElement.setAttribute('src', `images/${hero.name.replace(/\s+/g, '')}.jpg`)

    listContainer.appendChild(liElement)

    liElement.addEventListener('mouseenter', toggleImgVisibility)
    liElement.addEventListener('mouseleave', toggleImgVisibility)
    liElement.addEventListener('click', showHeroInfo.bind(this, hero))
  })
}

function getHeroesList(page) {
  let apiUrl = `https://swapi.dev/api/people/?page=${page}`
  axios.get(apiUrl).then(displayHeroesList).catch(error => console.log(error))
}
