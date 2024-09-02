//https://simple-api.netlify.app/
const button = document.querySelector('button');
const header = document.querySelector('h1');

button.addEventListener("click", getApi);

function getApi(){
    fetch("https://api.kanye.rest").then(result => result.json()).then(data => {
        header.innerText = data.quote;
    });
}