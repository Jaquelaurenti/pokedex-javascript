const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(890).fill().map((_, index) => 
    fetch(getPokemonUrl(index+1)).then( response => response.json()))

const loaderContainer = document.querySelector('.loader')

const insertPokemonDom = () => {
    const pokemonPromises = generatePokemonPromises()
  

    Promise.all(pokemonPromises)
        .then( pokemons => {
            return pokemons.reduce((accumulator, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)
                
                accumulator += `
                    <li class="card ${types[0]}">
                        <img loading="lazy" class="card-image" alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"/>
                        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                        <p class="card-subtitle">${types.join(' | ')}</p>
                    </li>`

                return accumulator
            }, '')
        })
        .then(pokemons =>{
            const ul = document.querySelector('[data-js="pokedex"]')
            ul.innerHTML = pokemons
        })    
}

insertPokemonDom()

const getNextPokemon = () => {
    var itemCount = document.querySelector('.card')
    const itemLimit = 10;
}

const removeLoader = () =>{
    setTimeout(() =>{
        loaderContainer.classList.remove('show')
        getNextPokemon()
    },1000)
}

const showLoader = () => {
    loaderContainer.classList.add('show')
    removeLoader()
}

window.addEventListener('scroll', () => {
    const {clientHeight, scrollHeight, scrollTop} = document.documentElement
    const isPageBottom = scrollTop + clientHeight >= scrollHeight - 10

    if(isPageBottom){
        showLoader()
    }
})