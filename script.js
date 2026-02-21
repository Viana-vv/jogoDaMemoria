let imagens = [
    "img/abacaxi.webp",
    "img/amora.webp",
    "img/banana.webp",
    "img/laranja.webp",
    "img/maca.webp",
    "img/manga.webp",
    "img/morango.webp",
    "img/uva.webp"
];
let cartas = [];
let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;

function iniciarJogo(){
let areaJogo = document.getElementById("area-jogo");
areaJogo.innerHTML = "";
 primeiraCarta = null;
 segundaCarta = null;
bloqueado = false;
tentativas = 0;

cartas = [...imagens,...imagens];
cartas.sort(() => Math.random() - 0.5);


cartas.forEach(function(src){
    let img = document.createElement("img");
    img.src = src;
img.dataset.valor=src;
img.classList.add("carta");
img.addEventListener("click", virarCarta);
areaJogo.appendChild(img);
});
setTimeout(function(){
    document.querySelectorAll(".carta").forEach(function(carta){
      carta.src = "img/costas.jpg"  ;
    });
}, 10000);
}



function virarCarta(){
    if(bloqueado)return;
    if(this.src.includes("costas.jpg")){
        this.src = this.dataset.valor;
    }
if(!primeiraCarta){
    primeiraCarta = this;
}else if(!segundaCarta && this !== primeiraCarta){
    segundaCarta = this;
    verificaPar();
}

}

let tentativas = 0;
let maxTentativas = 3;
function verificaPar(){
bloqueado = true;
if (primeiraCarta.dataset.valor === segundaCarta.dataset.valor){
   //acertou
    primeiraCarta = null;
segundaCarta = null;
bloqueado = false;
verificarFimDeJogo();

}else {
    let chancesRestantes = maxTentativas - tentativas;
    tentativas++;
if(tentativas <= maxTentativas){
          primeiraCarta.src = "img/costas.jpg" ;
segundaCarta.src = "img/costas.jpg" ;
    mostrarAvisoDeQuantidade(chancesRestantes);
    primeiraCarta = null;
segundaCarta = null;
bloqueado = false;
}
else{
setTimeout(function(){
   mostrarAviso();
   setTimeout(iniciarJogo, 5000)
}, 1000);

}
}
}

function verificarFimDeJogo(){
    let todasViradas = [...document.querySelectorAll(".carta")]
    .every(carta =>!carta.src.includes("costas.jpg"));
    if(todasViradas){
        mostrarMensagem();
    }
    setTimeout(iniciarJogo,5000)
}
function mostrarMensagem(){
    let mensagem = document.getElementById("mensagem");
  
    mensagem.style.display = "flex"; 

    setTimeout(() => {
        mensagem.style.display = "none";
    }, 5000);
}
function mostrarAviso(){
    let aviso= document.getElementById("aviso");
   
    aviso.style.display = "flex"; 

    setTimeout(() => {
        aviso.style.display = "none"; 
    }, 5000);
}
function mostrarAvisoDeQuantidade(chancesRestantes){
    let avisoQuantidade = document.getElementById("quantidade");
    avisoQuantidade.querySelector("p").textContent = `Você errou, mas ainda tem ${chancesRestantes} chance(s)!`;
    avisoQuantidade.style.display = "flex"; 
    setTimeout(() => {
        avisoQuantidade.style.display = "none"; 
    }, 3000);
}


document.getElementById("reiniciar-jogo").addEventListener("click", iniciarJogo);


iniciarJogo();
