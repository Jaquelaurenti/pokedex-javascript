let contador = 10;

const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = (props) => Array(props).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const loaderContainer = document.querySelector('.loader')

const insertPokemonDom = (props) => {
    const pokemonPromises = generatePokemonPromises(props)


    Promise.all(pokemonPromises)
        .then(pokemons => {
            return pokemons.reduce((props, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)

                props += `
                    <li class="card ${types[0]}">
                        <img loading="lazy" class="card-image" alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"/>
                        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                        <p class="card-subtitle">${types.join(' | ')}</p>
                    </li>`

                return props
            }, '')
        })
        .then(pokemons => {
            const ul = document.querySelector('[data-js="pokedex"]')
            ul.innerHTML = pokemons
        })
}

insertPokemonDom(contador)

const getNextPokemon = () => {
    var itemCount = document.querySelector('.card')
    const itemLimit = contador + 10;
}

const removeLoader = () => {
    setTimeout(() => {
        loaderContainer.classList.remove('show')
        getNextPokemon()
    }, 1000)
}

const showLoader = () => {
    loaderContainer.classList.add('show')
    removeLoader()
}

const backPagePokemon = () => {
    var itemCount = document.querySelector('.card')
    const itemLimit = contador - 10;
}

document.querySelector('.btnSeta').addEventListener('click', function (e) {
    e.preventDefault();
    contador = contador + 10;
    insertPokemonDom(contador)

})