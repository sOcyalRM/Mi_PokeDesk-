/*fetch("https://pokeapi.co/api/v2/pokemon/charizard")
    .then (response => response.json())//La respuesta me genera todos los datos asociados al objeto charizard en formato json
    .then (data => console.log(data.types)) // Luego accedo los datos generados. puedo acceder a un dato en especifico como types
    .catch(error => console.log(error)); //Si el objeto no existe atrapo el error para luego manejarlo
*/

async function fetchDatos(){ //Declaro funcion async para esperar por la promesa que retornara la funcion
                            //La promesa se compara a una orden de cafe en cafeteria. No te lo tomas hasta que no llega
    
        
        try{     // La promesa es el objeto que resulta de la ejecucion de la funcion
        const pokemonSearch = document
            .getElementById("busquedaPokemon")
            .value
            .toLowerCase()
            .trim();

        if (!pokemonSearch){
            throw new Error ("Ingresa un nombre de pokemon")
        }

        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonSearch}`)
            ;//Se espera hasta que se obtenga resultado del fetch

        if (!response.ok){
            throw new Error('No se pudo obtener la informacion');
        }//Await pone una pausa en la funcion hasta que la promesa es resuelta

        const data = await response.json(); 

        const pokemonSprite = data?.sprites?.front_default; //Para evitar error, me aseguro que el sprite contenga imagen
                                                            // No todos los pokemones tienen un front_default
        const imgElement = document.getElementById("imagenPokemon");

       
       //Manejo de imagenes delantera y trasera del pokemon 
        const pokemonSpriteBack = data?.sprites?.back_default;
        const imgEspalda = document.getElementById("imagenEspalda");

        if (!pokemonSprite) { //Si el pokemon no tiene imagen se lanza este error
            throw new Error("Este Pokémon no tiene imagen disponible");
        }

        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";

        imgEspalda.src = pokemonSpriteBack;
        imgEspalda.style.display = "block";

        //Fin Manejo de imagenes 

        /*Manejo de descripcion de Pokemones */
        //Declaracion de variables tipo elementos html
        const elementoTitulo = document.getElementById ("tituloDescripcion")
        const elementoNombre = document.getElementById("pokemonName");
        const elementoHeight = document.getElementById("pokemonHeight");
        const elementoWeight = document.getElementById("pokemonWeight");
        const listaHabilidades = document.getElementById("habilidades");
        const listaTipos = document.getElementById ('types');


        //Mostrando Descripcion 
        elementoTitulo.innerHTML = '<b>Descripcion del Pokemon</b>';
        //Mostrando nombre de pokemon
        let pokemonName = data.species.name;
        elementoNombre.innerHTML = '<b>Nombre: </b><br> '+`<li>${pokemonName}</li>`;

        //Mostrando Estatura de pokemon
        let pokemonHeight = data.height;
        elementoHeight.innerHTML = '<b>Estatura: </b><br> '+`<li>${pokemonHeight} pulgadas</li>`;

        //Mostrando Peso de pokemon
        let pokemonWeight = data.weight;
        elementoWeight.innerHTML = '<b>Peso: </b><br> '+`<li>${pokemonWeight} libras</li>`;

       //Mostrando habilidades de pokemon
        listaHabilidades.innerHTML = "<b>Habilidad(es):</b><ul>"; //Inicio de lista
        data.abilities.forEach(({ ability }) => {
        listaHabilidades.innerHTML += `<li>${ability.name}</li>`;
        });
        listaHabilidades.innerHTML += "</ul>"; //Fin de Lista

        //Mostrando los tipos
        listaTipos.innerHTML = "<b>Tipo(s):</b><ul>"; //Inicio de lista
        data.types.forEach(({ type }) => {
            listaTipos.innerHTML +=  `<li>${type.name}</li>`;
        });


        //Para mostrar en consola todos los datos realacionados a los pokemones
        console.log(data);


    }
    catch(error){
        console.error(error);
        alert(error.message);
    }
} // Fin funcion fetchDatos()

    //Logica Barra de busqueda de pokemon 
        document.addEventListener("DOMContentLoaded", () => {
        document
            .getElementById("busquedaPokemon")
            .addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                fetchDatos();
            }
            });
        });
        //Fin Barra de busqueda


