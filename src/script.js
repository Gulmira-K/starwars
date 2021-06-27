let page;
 
function storePage(page) {
  localStorage.setItem('page', page)
}

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
const description = document.querySelector('.description')

paginationBtns.addEventListener('click', setPage)

function toggleModal() {
  modal.classList.toggle('invisible')
}

function showHeroInfo(hero) {
  toggleModal();
  description.innerHTML = `<tr><th scope="row" colspan="2" class='hero-name'>${hero.name}<button onclick='toggleModal()' id='closeBtn'>&#10006</button></th></tr>
                          <tr><th scope="row" class='hero-data'>Gender</th><td>${hero.gender}</td></tr>
                          <tr><th scope="row" class='hero-data'>Birth year</th><td>${hero.birth_year}</td></tr>
                          <tr><th scope="row" class='hero-data'>Eye color</th><td>${hero.eye_color}</td></tr>
                          <tr><th scope="row" class='hero-data'>Height</th><td>${hero.height}</td></tr>
                          <tr><th scope="row" class='hero-data'>Mass</th><td>${hero.mass}</td></tr>
                          <tr><th scope="row" class='hero-data'>Skin color</th><td>${hero.skin_color}</td></tr>`
}

function toggleImgVisibility(e) {
  let target = e && e.target
  if (target && e.type === 'mouseenter') target.childNodes[1].style.visibility = 'visible';
  if (target && e.type === 'mouseleave') target.childNodes[1].style.visibility = 'hidden';
}

function setPage(e) {
  let target = e && e.target
  if (target.getAttribute('id') === 'next' && page < 9) {
    page += 1
    previousBtn.removeAttribute('disabled', 'disabled')
  } else if (target.getAttribute('id') === 'previous' && page > 1) {
    page -= 1
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
