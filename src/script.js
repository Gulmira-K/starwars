const listContainer = document.getElementById('heroes-list')
const previousBtn = document.getElementById('previous')
const nextBtn = document.getElementById('next')
let responseList;

// previousBtn.addEventListener('click', displayHeroesList.bind(this,'previous'))
let page = 1
nextBtn.addEventListener('click', function () {
  if (page < 10) {
    page += 1
  }
  getHeroesList(page)
})

function showPhoto(e) {
  let target = e && e.target
  target.childNodes[1].style.visibility = 'visible';
}

function hidePhoto(e) {
  let target = e.target
  target.childNodes[1].style.visibility = 'hidden';
}

function displayHeroesList(response, page) {
  console.log(page)
  responseList = response.data.results
  
  responseList.map(item => {
    const liElement = document.createElement('li')
    const imgElement = document.createElement('img')
    imgElement.setAttribute('src', `images/${item.name.replace(/\s+/g, '')}.jpg`)
    let heroName = item.name
    console.log(item.name.replace(/\s+/g, ''))
    liElement.innerHTML = heroName
    liElement.insertAdjacentElement('beforeend', imgElement)
    listContainer.appendChild(liElement)

    liElement.addEventListener('mouseenter', showPhoto)
    liElement.addEventListener('mouseleave', hidePhoto)
  })
}

function getHeroesList(page) {
  let apiUrl
  if (!page) {
    apiUrl = `https://swapi.dev/api/people/?page=1`
  } else {
    apiUrl = `https://swapi.dev/api/people/?page=${page}`
  }
  
  axios.get(apiUrl).then(response => displayHeroesList(response, page)).catch(error => console.log(error))
}

getHeroesList()
// getHeroesList('?page=2')
// getHeroesList('?page=3')
// getHeroesList('?page=4')
// getHeroesList('?page=5')
// getHeroesList('?page=6')
// getHeroesList('?page=7')
// getHeroesList('?page=8')
// getHeroesList('?page=9')