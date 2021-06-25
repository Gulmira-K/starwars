let page = 1
getHeroesList(page)

const listContainer = document.getElementById('heroes-list')
const previousBtn = document.getElementById('previous')
const nextBtn = document.getElementById('next')
const paginationBtns = document.getElementById('pagination-btns')

paginationBtns.addEventListener('click', setPage)

function setPage(e) {
  let target = e && e.target
  if (target.getAttribute('id') === 'next' && page < 10) {
    page += 1
    previousBtn.removeAttribute('disabled', 'disabled')
  } else if (target.getAttribute('id') === 'previous' && page > 1) {
    page -= 1
    nextBtn.removeAttribute('disabled', 'disabled')
  }
  getHeroesList(page)
}

function showHeroInfo(hero) {
  console.log(hero)
}

function toggleVisibility(e) {
  let target = e && e.target
  if (target && e.type === 'mouseenter') target.childNodes[1].style.visibility = 'visible';
  if (target && e.type === 'mouseleave') target.childNodes[1].style.visibility = 'hidden';
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

    liElement.addEventListener('mouseenter', toggleVisibility)
    liElement.addEventListener('mouseleave', toggleVisibility)
    liElement.addEventListener('click', showHeroInfo.bind(this, hero))
  })
}

function getHeroesList(page) {
  let apiUrl = `https://swapi.dev/api/people/?page=${page}`
  axios.get(apiUrl).then(displayHeroesList).catch(error => console.log(error))
}
