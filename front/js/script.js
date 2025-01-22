function getCharacterInfo(){
    const characterNameInput=document.getElementById('characterName');
    const characterInfo=document.getElementById('characterInfo');


    const characterName=characterNameInput.value.toLocaleLowerCase();

    fetch(`http://localhost:3000/characters/${characterName}`)
    .then(response => response.json())
    .then(data=>{
       
        const {name, status,species,gender,origin,image} = data[0];
      
        characterInfo.innerHTML=`
        <h2>${name}</h2>
        <p>status:${status}</p>
        <p>species: ${species}</p>
        <p>gender: ${gender}</p>
        <p>origin: ${origin}</p>
        <div> <img src="${image}" alt="${name}"/></div>
        `
        
        
    })
    .catch(error => characterInfo.innerHTML=`<p>Imposible acceder al personaje</p>`)

 
}