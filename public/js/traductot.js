
let listLenguajes1 = document.getElementById("from");
let listLenguajes2 = document.getElementById("al");
let btn = document.getElementById("traducit");
let lenguaje1 = "es";
let lenguaje2 = "en";
// mostrar lista de nombres
function elemtos(lista){
    lista.forEach(elemtos =>{
        listLenguajes1.innerHTML += `<option value="${elemtos.code}">${elemtos.name}</option>`
        listLenguajes2.innerHTML += `<option value="${elemtos.code}">${elemtos.name}</option>`
    })
    listLenguajes1.addEventListener("click", function(){
        lenguaje1 = listLenguajes1.value;
     
    })

    listLenguajes2.addEventListener("click", function(){
        lenguaje2  = listLenguajes2.value
    })
}
// conseguir  la lista de lenguaje desde el servidor
const ger_url = 'https://text-translator2.p.rapidapi.com/getLanguages';


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'cf64bc7fc9msh7e4f05b54fe5e6ap172b16jsn94da3d41c4c3',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	}
};

fetch(ger_url, options).then(respuesta =>{
    respuesta.json().then(res  =>{
        let list = res.data.languages
        elemtos(list)
        
        // codigo para tener acceso a esto objeto
    }).catch(error =>{
        console.log(error)
    })
})
// btn click

btn.addEventListener('click', ()=>{
    let text1 = document.getElementById("traslateTo");
    let text2 = document.getElementById("traslateFo")
    // peticion por post para la trduccion
    console.log(lenguaje1);
    const encodedParams = new URLSearchParams();
    encodedParams.append("source_language", lenguaje1);
    encodedParams.append("target_language", lenguaje2);
    encodedParams.append("text", text1.value);

    const options2 = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'cf64bc7fc9msh7e4f05b54fe5e6ap172b16jsn94da3d41c4c3',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: encodedParams
    };

    fetch('https://text-translator2.p.rapidapi.com/translate', options2)
        .then(response => response.json())
        .then(response => {
            text2.innerText = response.data.translatedText

        })
        .catch(err => console.error(err));


})
