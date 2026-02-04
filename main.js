fetch("https://pokeapi.co/api/v2/pokemon/charizard")
    .then (response => response.json())//La respuesta me genera todos los datos asociados al objeto charizard en formato json
    .then (data => console.log(data.types)) // Luego accedo los datos generados. puedo acceder a un dato en especifico como types
    .catch(error => console.log(error)); //Si el objeto no existe atrapo el error para luego manejarlo
