//CHALLENGE 2
const express =require('express');
const app =express();
const axios=require('axios');
const cors=require('cors');
const PORT ='3000';

 const url= `https://rickandmortyapi.com/api/character`


 
//middelwares cors. con este Cors permite que todas nuestras rutas puedan entrar
app.use(cors())
 // End point  Obtener todos los personajes
    app.get('/characters', async (req, res) => {
        try {
          const characters = await getAllCharacters();
          const filteredCharacters = characters.map((character) => ({
            name: character.name,
            status: character.status,
            species: character.species,
            gender: character.gender,
            origin: character.origin.name,
            image: character.image,
          }));
          res.status(200).json(filteredCharacters);
        } catch (error) {
            res.status(404).json ({error:'Error al obtener los personajes'})
        }
      });


// Función para obtener todos los personajes
const getAllCharacters = async () => {
    //const baseUrl = 'https://rickandmortyapi.com/api/character';
    let allCharacters = [];
    let nextUrl = url;
  
    try {
      while (nextUrl) {
        const response = await axios.get(nextUrl);
        allCharacters = allCharacters.concat(response.data.results);
        nextUrl = response.data.info.next; // Actualizar la URL de la siguiente página
      }
      return allCharacters;
    } catch (error) {
        res.status(404).json ({error:'Error al obtener los personajes'})
    }
  };
 


  // Obtener un personaje por nombre
app.get('/characters/:name', async (req, res) => {
    const { name } = req.params; // Obtener el nombre del personaje desde los parámetros de consulta
   
    if (!name) {
      return res.status(400).json({ message: 'Por favor, proporciona un nombre para buscar' });
    }
  
    try {
      const response = await axios.get(`${url}/?name=${encodeURIComponent(name)}`);
      const filteredCharacters = response.data.results.map((character) => ({
        name: character.name,
        status: character.status,
        species: character.species,
        gender: character.gender,
        origin: character.origin.name,
        image: character.image,
      }));
      res.status(200).json(filteredCharacters);
    } catch (error) {
        res.status(404).json ({error:'Error, personaje no econtrado'})
    }
  });


app.listen(PORT,()=>{
    console.log(`Express esta escuchando en el puerto http://localhost:${PORT}`)
})