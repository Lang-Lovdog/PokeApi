console.log('Conectado...')
const lista = document.getElementById('lista')
const infoPokemon = document.getElementById('infoPokemon').content
const fragment = document.createDocumentFragment()

//Elementos del Filtro
const btnFiltro = document.getElementById('btnFiltrar')
const btnTodo = document.getElementById('btnTodo')
const input = document.getElementById('filtroPokemones')
let pokemones = []
let pokemonBuscado = []

document.addEventListener('DOMContentLoaded', () => {
  fetchPokemones()
})
const buscaPorNombre = () =>{
  const busca=document.getElementById('buscaNombre').value
  console.log('data',busca)
  
}
btnFiltro.addEventListener('click', () => {
  if(input.value > 0 && input.value){
    const limite = input.value
    console.log('Click en el filtro', input.value)
    fetchPokemones(input.value)
  }
})

btnTodo.addEventListener('click', () => {
  fetchPokemones()
})

lista.addEventListener('click', e => {
  if(e.target.classList.contains('btn-dark')){
    const id = e.target.dataset.id
    fetchPokemonBuscado(id)
    console.log('id',id)
  }
})

const fetchPokemonBuscado = id => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then( async(res)  =>{
      pokemonBuscado = await res.json()
      const pokemon = {
        nombre: pokemonBuscado.name,
        experiencia: pokemonBuscado.base_experience,
        hp: pokemonBuscado.stats[0].base_stat,
        ataque: pokemonBuscado.stats[1].base_stat,
        defensa: pokemonBuscado.stats[2].base_stat,
        especial: pokemonBuscado.stats[3].base_stat,
        imgGame: pokemonBuscado.sprites.font_default,
        imgCvg: pokemonBuscado.sprites.other.dream_world.font_default,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonBuscado.id}.png`
      }
    pintarPokemon(pokemon)
    })
  .catch( error => {
    console.log('error', error)
  })
}

const pintarPokemon = pokemon => {
  const pokemonBuscado = document.getElementById('pokemonBuscado')
  const template = document.getElementById('card').content
  clone = template.cloneNode(true)
  const fragment = document.createDocumentFragment()
  pokemonBuscado.innerHTML = ''
  clone.querySelector('.card-body-img').setAttribute('src',pokemon.img)
  clone.querySelector('.card-body-title').innerHTML=`${pokemon.nombre} <span>${pokemon.hp} HP</span>`
  clone.querySelector('.card-body-text').textContent=pokemon.experiencia + " EXP"
  clone.querySelectorAll('.card-footer-social h3')[0].textContent=pokemon.ataque + "K"
  clone.querySelectorAll('.card-footer-social h3')[1].textContent=pokemon.defensa + "K"
  clone.querySelectorAll('.card-footer-social h3')[2].textContent=pokemon.especial + "K"
  
  fragment.appendChild(clone)
  pokemonBuscado.appendChild(fragment)
}

const fetchPokemones = (total) => {
  const limite = total || 2000
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limite}`)
    .then( async(res) => {
      //console.log('res', await res.json())
      pokemones = []
      let data = await res.json()
      pokemones = data.results
      pintarPokemones()
      //console.log('pokemones', pokemones);
    })
    .catch( error => {
      console.log('error', error)
    })
}

const pintarPokemones = () => {
  lista.innerHTML = ''
  pokemones.forEach( (item, index) => {
    //console.log(item)
    infoPokemon.querySelectorAll('p')[0].textContent = item.name
    infoPokemon.querySelectorAll('p')[1].textContent = item.url
    infoPokemon.querySelector('button').dataset.id = index + 1

    const clone =  infoPokemon.cloneNode(true)
    fragment.appendChild(clone)
  })
  lista.appendChild(fragment)
}