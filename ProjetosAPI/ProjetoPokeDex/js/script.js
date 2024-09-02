const pokemonInfo = document.getElementById("pokemon-info");
function buscarPokemon() {
  const pokemonName = document
    .getElementById("pokemon-name-input")
    .value.trim()
    .toLowerCase();

  if (pokemonName == "") {
    alert("Informe o nome do pokemon");
    return;
  }

  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

  console.log(url);

  axios
    .get(url)
    .then((res) => {
      const pokemon = res.data;
      const cardHtml = `
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.sprites.front_default}">
    <p>Altura: ${parseInt(pokemon.height) / 10} m</p>
    <p>Peso: ${pokemon.weight} Kg</p>
    `;

      pokemonInfo.innerHTML = cardHtml;
    })
    .catch((error) => {
      pokemonInfo.innerHTML =
        "<p>Não foi possivel obter informações do pokemon informado</p>";
    });
}
