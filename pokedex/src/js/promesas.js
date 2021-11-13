const contenedor=document.getElementById("contenedor");
const formulario=document.getElementById("formulario");
const busqueda=document.getElementById("busqueda");
const buscar=document.getElementById("buscar");
const advertencia=document.getElementById("advertencia");
const nombre=document.getElementById("nombre");
const foto=document.getElementById("foto");
const id=document.getElementById("id");
const tipo=document.getElementById("tipo");
const stats=document.getElementById("stats");






formulario.addEventListener("submit",e=>{
    e.preventDefault();
    ejecutar();
})

const ejecutar = e=>{
    const response = axios.get("https://pokeapi.co/api/v2/pokemon/"+busqueda.value.toLowerCase());
    response.then((response)=>{
        mostarPokemon(response);
    }).catch((error)=>{
        advertencia.innerHTML="No existe este pokemon";
    });
}

const mostarPokemon=response=>{
    advertencia.innerHTML="";
    const src=response.data.sprites.front_default;
    const typeSS=response.data.types;
    const statsSS=response.data.stats;

    nombre.textContent=response.data.name;
    foto.setAttribute("src",src);
    id.innerHTML="Id = "+response.data.id;

    tipo.innerHTML='';
    const nota1=document.createElement("span");
    nota1.innerHTML="Tipos:"
    tipo.appendChild(nota1);
    typeSS.forEach(type => {
        const typeElement=document.createElement("div");
        typeElement.textContent=type.type.name;
        tipo.appendChild(typeElement);
    });
    stats.innerHTML='';
    const nota2=document.createElement("span");
    nota2.innerHTML="Stats:"
    stats.appendChild(nota2);
    statsSS.forEach(stat => {
        const statsElement=document.createElement("div");
        const statsElementName=document.createElement("div");
        const statsElementAmount=document.createElement("div");
        statsElementName.textContent=stat.stat.name;
        statsElementAmount.textContent=stat.base_stat;
        statsElementName.setAttribute("class", "dato");
        statsElementAmount.setAttribute("class", "dato");
        statsElement.appendChild(statsElementName);
        statsElement.appendChild(statsElementAmount);
        statsElement.setAttribute("class", "estadisticas");
        stats.appendChild(statsElement);
    });

    formulario.reset();
}