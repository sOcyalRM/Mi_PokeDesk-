/*fetch("https://pokeapi.co/api/v2/pokemon/charizard")
    .then (response => response.json())//La respuesta me genera todos los datos asociados al objeto charizard en formato json
    .then (data => console.log(data.types)) // Luego accedo los datos generados. puedo acceder a un dato en especifico como types
    .catch(error => console.log(error)); //Si el objeto no existe atrapo el error para luego manejarlo
*/

async function fetchDatos(){ //Declaro funcion async para esperar por la promesa que retornara la funcion
                            //La promesa se compara a una orden de cafe en cafeteria. No te lo tomas hasta que no llega
    
        
        try{     // La promesa es el objeto que resulta de la ejecucion de la funcion
        const nombrePokemon = document
            .getElementById("nombrePokemon")
            .value
            .toLowerCase()
            .trim();

        if (!nombrePokemon){
            throw new Error ("Ingresa un nombre de pokemon")
        }

        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`)
            ;//Se espera hasta que se obtenga resultado del fetch

        if (!response.ok){
            throw new Error('No se pudo obtener la informacion');
        }//Await pone una pausa en la funcion hasta que la promesa es resuelta
        

        const data = await response.json(); 

        const pokemonSprite = data?.sprites?.front_default; //Para evitar error, me aseguro que el sprite contenga imagen
                                                            // No todos los pokemones tienen un front_default
        const imgElement = document.getElementById("imagenPokemon");

        if (!pokemonSprite) { //Si el pokemon no tiene imagen se lanza este error
            throw new Error("Este Pokémon no tiene imagen disponible");
        }



        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";
    }
    catch(error){
        console.error(error);
        alert(error.message);
    }
}

//fetchDatos() //En este caso, no es necesario llamar la funcion o resultara en error
