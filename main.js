const baseUrl = "https://pokeapi.co/api/v2/pokemon/"

const container = document.getElementById("container");
const pagination = document.getElementById("pagination");

let next = ""
let prev = ""

const fetchPokeList = async (url) => {
    return await fetch(url)
    .then((result) => result.json())
    .then((data) => {
        getPokemonList(data.results)
        next = data.next
        prev = data.previous
    })
}

const getPokemon = async ({url}) => {
    return await fetch(url)
    .then((result) => result.json())
    .then((data) => drawPokemon(data))
}

const typesToString = (types= []) => {
    var tipo = ""
    types.map((item) => {
        if(tipo === ""){
            tipo = item.type.name
        } else {
            tipo = tipo + " / " + item.type.name
        }
    })
    return tipo        
};

const drawPokemon = ({name, id, types, sprites}) => {
    const pokemonCard = document.createElement("div")
    pokemonCard.className = "col mb-4"
    
    const innertHTML = `
    <div class="card" > 
        <div class="card-body">
            <h6 class="card-title text-uppercase">${name} </h6>
            <img src=${sprites.front_default} alt="">
            </hr>
            <p>${typesToString(types)}</p>
            <p>Pokedex: ${id}</p>
        </div>
    </div>
    `
    pokemonCard.innerHTML=innertHTML
    container.appendChild(pokemonCard)
}

const getPokemonList = (list = []) => list.map((item) => getPokemon(item))

const createPagination = () => {
    const innertHTML = `
    <ul class='pagination justify-content-center'>
        <li class='page-item' style={{marginRight:"15px"}}>
            <button class='page-link' onClick={onPrevious()}>Previous</button>
        </li>
        <li class='page-item'>
            <button class='page-link' onClick={onNext()}>Next</button>
        </li>
    </ul>
    `
    pagination.innerHTML=innertHTML
    container.appendChild(pagination)
}

const onPrevious = () => {
    fetchPokeList(prev)
}

const onNext = () => {
    fetchPokeList(next)
}

createPagination()

fetchPokeList(baseUrl)
